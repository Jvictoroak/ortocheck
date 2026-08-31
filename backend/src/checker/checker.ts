export interface SpellError {
  word: string;
  suggestion: string;
  context: string;
}

const LANGUAGETOOL_URL =
  process.env.LANGUAGETOOL_URL || "https://api.languagetool.org/v2/check";

export async function checkSpelling(text: string): Promise<SpellError[]> {
  if (!text || text.trim().length === 0) return [];

  const params = new URLSearchParams({
    text: text.slice(0, 19000),
    language: "pt-BR",
  });

  const response = await fetch(LANGUAGETOOL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`LanguageTool respondeu com status ${response.status}`);
  }

  const data = await response.json();

    console.log("Resposta bruta do LanguageTool:", JSON.stringify(data, null, 2));


  return data.matches.map((match: any) => {
    const errorText = match.context.text.substring(
      match.context.offset,
      match.context.offset + match.context.length
    );

    return {
      word: errorText,
      suggestion: match.replacements[0]?.value || "(sem sugestão)",
      context: match.context.text,
    };
  });
}