import { chromium, Browser, Page } from "playwright";
import { extractCleanText } from "../extractor/extractor";

export interface CrawlResult {
  url: string;
  text: string;
}

export type ProgressCallback = (current: number, total: number, currentUrl: string) => void;

export async function crawlSite(
  startUrl: string,
  maxPages = 20,
  onProgress?: ProgressCallback
): Promise<CrawlResult[]> {
  const visited = new Set<string>();
  const toVisit: string[] = [startUrl];
  const results: CrawlResult[] = [];
  const baseDomain = new URL(startUrl).hostname;

  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  while (toVisit.length > 0 && results.length < maxPages) {
    const currentUrl = toVisit.shift()!;
    const normalizedUrl = normalizeUrl(currentUrl);

    if (visited.has(normalizedUrl)) continue;
    visited.add(normalizedUrl);

    try {
      await page.goto(currentUrl, { waitUntil: "networkidle", timeout: 15000 });
    } catch (err) {
      console.warn(`Falha ao acessar ${currentUrl}:`, (err as Error).message);
      continue;
    }

    const text = await extractCleanText(page);
    results.push({ url: currentUrl, text });

    onProgress?.(results.length, maxPages, currentUrl);

    const links = await page.$$eval("a[href]", (anchors) =>
      anchors.map((a) => (a as HTMLAnchorElement).href)
    );

    for (const link of links) {
      try {
        const linkUrl = new URL(link);
        if (linkUrl.hostname === baseDomain) {
          const normalizedLink = normalizeUrl(link);
          if (!visited.has(normalizedLink) && !toVisit.includes(link)) {
            toVisit.push(link);
          }
        }
      } catch {
      }
    }
  }

  await browser.close();
  return results;
}

function normalizeUrl(url: string): string {
  const u = new URL(url);
  u.hash = "";
  return u.toString().replace(/\/$/, "");
}