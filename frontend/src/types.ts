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