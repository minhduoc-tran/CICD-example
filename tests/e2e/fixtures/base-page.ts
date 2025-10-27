import { Page, Locator } from "@playwright/test";

/**
 * Base page object model that provides common functionality
 * for all page objects in the E2E test suite
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  /**
   * Wait for the page to be loaded
   */
  async waitForLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Take a screenshot for visual regression testing
   */
  async takeScreenshot(name: string) {
    return await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout,
    });
  }

  /**
   * Get viewport size
   */
  getViewportSize() {
    return this.page.viewportSize();
  }

  /**
   * Set viewport size for responsive testing
   */
  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }
}
