import { Router, Request, Response } from "express";
import { crawlSite } from "../crawler/crawler";
import { checkSpelling } from "../checker/checker";

export const checkRouter = Router();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

checkRouter.get("/", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  const language = (req.query.language as string) || "en-US";
  const maxPages = parseInt(req.query.maxPages as string) || 2;

  if (!url) {
    return res.status(400).json({ error: "O parâmetro 'url' é obrigatório." });
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
    console.error("Erro ao processar:", err);
    sendEvent("error", { message: "Falha ao processar o site informado." });
  } finally {
    res.end();
  }
});