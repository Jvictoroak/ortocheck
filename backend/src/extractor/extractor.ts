import { Page } from "playwright";

export async function extractCleanText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;

    const selectorsToRemove = ["script", "style", "noscript", "nav", "footer"];
    selectorsToRemove.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove());
    });

    return clone.innerText.replace(/\s+/g, " ").trim();
  });
}