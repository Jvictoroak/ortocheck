import { Router, Request, Response } from "express";
import { crawlSite } from "../crawler/crawler";
import { checkSpelling } from "../checker/checker";

export const checkRouter = Router();

interface CheckRequestBody {
  url: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

checkRouter.post("/", async (req: Request, res: Response) => {
  const { url } = req.body as CheckRequestBody;

  if (!url) {
    return res.status(400).json({ error: "O campo 'url' é obrigatório." });
  }

  try {
    const pages = await crawlSite(url, 10);

    const results = [];
    for (const page of pages) {
      const errors = await checkSpelling(page.text);
      results.push({ page: page.url, textLength: page.text.length, errors });
      await delay(3500); 
    }

    res.json({ siteUrl: url, pagesChecked: pages.length, results });
  } catch (err) {
    console.error("Erro ao processar a verificação:", err);
    res.status(500).json({ error: "Falha ao processar o site informado." });
  }
});