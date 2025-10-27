import { Page, Browser, BrowserContext } from "@playwright/test";

/**
 * Common utility functions for E2E tests
 */
export class TestHelpers {
  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page, timeout: number = 5000) {
    await page.waitForLoadState("networkidle", { timeout });
  }

  /**
   * Clear browser storage
   */
  static async clearStorage(context: BrowserContext) {
    await context.clearCookies();
    await context.clearPermissions();
  }

  /**
   * Set up browser context with common settings
   */
  static async setupContext(browser: Browser) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    return context;
  }

  /**
   * Take full page screenshot
   */
  static async takeFullPageScreenshot(page: Page, name: string) {
    return await page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Wait for element and get text content
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    await page.waitForSelector(selector);
    const element = page.locator(selector);
    return (await element.textContent()) || "";
  }

  /**
   * Check if page has no console errors
   */
  static async checkConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Simulate different network conditions
   */
  static async simulateSlowNetwork(page: Page) {
    await page.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });
  }

  /**
   * Test responsive breakpoints
   */
  static readonly BREAKPOINTS = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
    largeDesktop: { width: 1920, height: 1080 },
  };

  /**
   * Set viewport to specific breakpoint
   */
  static async setBreakpoint(
    page: Page,
    breakpoint: keyof typeof TestHelpers.BREAKPOINTS
  ) {
    const size = TestHelpers.BREAKPOINTS[breakpoint];
    await page.setViewportSize(size);
  }

  /**
   * Wait for fonts to load
   */
  static async waitForFonts(page: Page) {
    await page.waitForFunction(() => document.fonts.ready);
  }

  /**
   * Check accessibility violations (basic check)
   */
  static async checkBasicAccessibility(page: Page) {
    // Check for basic accessibility requirements
    const hasMainHeading = (await page.locator("h1").count()) > 0;
    const hasLangAttribute = (await page.locator("html[lang]").count()) > 0;
    const hasValidHeadingHierarchy = await this.checkHeadingHierarchy(page);
    const hasAltTextForImages = await this.checkImageAltText(page);

    return {
      hasMainHeading,
      hasLangAttribute,
      hasValidHeadingHierarchy,
      hasAltTextForImages,
    };
  }

  /**
   * Check heading hierarchy (h1 -> h2 -> h3, etc.)
   */
  static async checkHeadingHierarchy(page: Page): Promise<boolean> {
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();

    if (headings.length === 0) return false;

    // Should start with h1
    const firstHeading = await headings[0].evaluate((el) =>
      el.tagName.toLowerCase()
    );
    return firstHeading === "h1";
  }

  /**
   * Check that all images have alt text
   */
  static async checkImageAltText(page: Page): Promise<boolean> {
    const images = await page.locator("img").all();

    for (const img of images) {
      const altText = await img.getAttribute("alt");
      if (altText === null) return false;
    }

    return true;
  }

  /**
   * Measure page load performance
   */
  static async measurePageLoadTime(page: Page, url: string): Promise<number> {
    const startTime = Date.now();
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    return Date.now() - startTime;
  }

  /**
   * Check for layout shift during page load
   */
  static async checkLayoutStability(page: Page): Promise<boolean> {
    let layoutShiftDetected = false;

    await page.addInitScript(() => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === "layout-shift" &&
            !(entry as any).hadRecentInput
          ) {
            (window as any).layoutShiftDetected = true;
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });
    });

    await page.waitForTimeout(2000); // Wait for potential layout shifts

    layoutShiftDetected = await page.evaluate(
      () => (window as any).layoutShiftDetected || false
    );

    return !layoutShiftDetected;
  }
}
