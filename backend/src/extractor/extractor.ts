import { Page } from "playwright";

export async function extractCleanText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const selectorsToRemove = ["script", "style", "noscript"];
    selectorsToRemove.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });

    return document.body.innerText.replace(/\s+/g, " ").trim();
  });
}