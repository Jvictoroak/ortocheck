import { Router, Request, Response } from "express";
import { crawlSite } from "../crawler/crawler";

export const checkRouter = Router();

interface CheckRequestBody {
  url: string;
}

checkRouter.post("/", async (req: Request, res: Response) => {
  const { url } = req.body as CheckRequestBody;

  if (!url) {
    return res.status(400).json({ error: "O campo 'url' é obrigatório." });
  }

  try {
    const pages = await crawlSite(url, 10);

    const result = {
      siteUrl: url,
      pagesChecked: pages.length,
      results: pages.map((p) => ({
        page: p.url,
        textLength: p.text.length,
        errors: [], 
      })),
    };

    res.json(result);
  } catch (err) {
    console.error("Erro ao processar o crawling:", err);
    res.status(500).json({ error: "Falha ao processar o site informado." });
  }
});