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