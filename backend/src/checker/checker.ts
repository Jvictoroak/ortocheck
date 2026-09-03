export interface SpellError {
  word: string;
  suggestion: string;
  context: string;
}

const LANGUAGETOOL_URL =
  process.env.LANGUAGETOOL_URL || "https://api.languagetool.org/v2/check";

export class CheckerUnavailableError extends Error {
  constructor(status?: number) {
    super(
      status
        ? `The spell checker returned an error (status ${status}). Please try again in a few moments.`
        : "Could not connect to the spell checker."
    );
    this.name = "CheckerUnavailableError";
  }
}

export async function checkSpelling(
  text: string,
  language: string = "pt-BR"
): Promise<SpellError[]> {
  if (!text || text.trim().length === 0) return [];

  const params = new URLSearchParams({
    text: text.slice(0, 19000),
    language,
  });

  let response: Response;

  try {
    response = await fetch(LANGUAGETOOL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch {
    throw new CheckerUnavailableError();
  }

  if (!response.ok) {
    throw new CheckerUnavailableError(response.status);
  }

  const data = await response.json();

  return data.matches
    .filter((match: any) => match.message !== "(suggestion limit reached)")
    .map((match: any) => {
      const errorText = match.context.text.substring(
        match.context.offset,
        match.context.offset + match.context.length
      );

      return {
        word: errorText,
        suggestion: match.replacements[0]?.value || "(no suggestion)",
        context: match.context.text,
      };
    });
}