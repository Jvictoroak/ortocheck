export interface SpellError {
  word: string;
  suggestion: string;
  context: string;
}

export interface PageResult {
  page: string;
  textLength: number;
  errors: SpellError[];
}

export interface CheckResponse {
  siteUrl: string;
  pagesChecked: number;
  results: PageResult[];
}

export interface ProgressEvent {
  stage: "crawling" | "checking";
  current: number;
  total: number;
  currentUrl: string;
}

export type Screen = "home" | "loading" | "report";

export interface SupportedLanguage {
  code: string;
  label: string;
  countryCode: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: "pt-BR",
    label: "Português (Brasil)",
    countryCode: "BR",
  },
  {
    code: "pt-PT",
    label: "Português (Portugal)",
    countryCode: "PT",
  },
  {
    code: "en-US",
    label: "English (US)",
    countryCode: "US",
  },
  {
    code: "en-GB",
    label: "English (UK)",
    countryCode: "GB",
  },
  {
    code: "es",
    label: "Español",
    countryCode: "ES",
  },
  {
    code: "fr",
    label: "Français",
    countryCode: "FR",
  },
  {
    code: "de-DE",
    label: "Deutsch",
    countryCode: "DE",
  },
  {
    code: "it",
    label: "Italiano",
    countryCode: "IT",
  },
];