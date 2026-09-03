import { Router, Request, Response } from "express";
import { crawlSite, SiteUnreachableError } from "../crawler/crawler";
import { checkSpelling, CheckerUnavailableError } from "../checker/checker";

export const checkRouter = Router();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

checkRouter.get("/", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  const language = (req.query.language as string) || "en-US";
  const maxPages = parseInt(req.query.maxPages as string) || 20;

  if (!url) {
    return res.status(400).json({ error: "The 'url' parameter is mandatory." });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({
      error: "Invalid URL. Make sure to include 'https://' at the beginning.",
    });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendEvent = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const pages = await crawlSite(url, maxPages, (current, total, currentUrl) => {
      sendEvent("progress", { stage: "crawling", current, total, currentUrl });
    });

    if (pages.length === 0) {
      sendEvent("error", {
        message: "No pages with content were found on this site.",
      });
      return;
    }

    const results = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      sendEvent("progress", {
        stage: "checking",
        current: i + 1,
        total: pages.length,
        currentUrl: page.url,
      });

      const errors = await checkSpelling(page.text, language);
      results.push({ page: page.url, textLength: page.text.length, errors });

      await delay(3500);
    }

    sendEvent("done", { siteUrl: url, pagesChecked: pages.length, results });
  } catch (err) {
    console.error("Error processing:", err);

    if (err instanceof SiteUnreachableError) {
      sendEvent("error", { message: err.message });
    } else if (err instanceof CheckerUnavailableError) {
      sendEvent("error", { message: err.message });
    } else {
      sendEvent("error", { message: "An unexpected error occurred while processing the site." });
    }
  } finally {
    res.end();
  }
});