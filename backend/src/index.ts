import "dotenv/config";
import express from "express";
import cors from "cors";
import { checkRouter } from "./routes/check";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OrtoCheck backend running" });
});

app.use("/check", checkRouter);

app.listen(PORT, () => {
  console.log(`OrtoCheck backend rodando em http://localhost:${PORT}`);
});
