import { Router, Request, Response } from "express";

export const checkRouter = Router();

interface CheckRequestBody {
  url: string;
}

checkRouter.post("/", async (req: Request, res: Response) => {
  const { url } = req.body as CheckRequestBody;

  if (!url) {
    return res.status(400).json({ error: "O campo 'url' é obrigatório." });
  }

  const mockResult = {
    siteUrl: url,
    pagesChecked: 3,
    results: [
      {
        page: `${url}/`,
        errors: [
          {
            word: "concerteza",
            suggestion: "com certeza",
            context: "...vamos entregar isso concerteza amanhã...",
          },
        ],
      },
      {
        page: `${url}/sobre`,
        errors: [],
      },
      {
        page: `${url}/contato`,
        errors: [
          {
            word: "enderesso",
            suggestion: "endereço",
            context: "...envie para o nosso enderesso comercial...",
          },
        ],
      },
    ],
  };

  res.json(mockResult);
});
