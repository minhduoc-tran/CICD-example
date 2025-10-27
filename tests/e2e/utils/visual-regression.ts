import { Page, expect } from "@playwright/test";
import { TestHelpers } from "./test-helpers";

/**
 * Visual regression testing utilities
 */
export class VisualRegression {
  /**
   * Compare page screenshot with baseline
   */
  static async comparePageScreenshot(
    page: Page,
    name: string,
    options?: {
      fullPage?: boolean;
      clip?: { x: number; y: number; width: number; height: number };
      threshold?: number;
    }
  ) {
    // Wait for fonts and animations to settle
    await TestHelpers.waitForFonts(page);
    await page.waitForTimeout(500); // Allow animations to complete

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: options?.fullPage ?? true,
      clip: options?.clip,
      threshold: options?.threshold ?? 0.2,
    });
  }

  /**
   * Compare element screenshot with baseline
   */
  static async compareElementScreenshot(
    page: Page,
    selector: string,
    name: string,
    options?: {
      threshold?: number;
    }
  ) {
    const element = page.locator(selector);
    await element.waitFor({ state: "visible" });

    await expect(element).toHaveScreenshot(`${name}-element.png`, {
      threshold: options?.threshold ?? 0.2,
    });
  }

  /**
   * Test responsive design across multiple breakpoints
   */
  static async testResponsiveScreenshots(
    page: Page,
    pageName: string,
    breakpoints: Array<{ name: string; width: number; height: number }>
  ) {
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height,
      });

      // Wait for layout to adjust
      await page.waitForTimeout(300);

      await this.comparePageScreenshot(page, `${pageName}-${breakpoint.name}`, {
        fullPage: true,
      });
    }
  }

  /**
   * Test dark mode visual regression
   */
  static async testDarkModeScreenshot(page: Page, name: string) {
    // Enable dark mode by adding class to html element
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });

    // Wait for dark mode styles to apply
    await page.waitForTimeout(300);

    await this.comparePageScreenshot(page, `${name}-dark-mode`);

    // Remove dark mode class
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });
  }

  /**
   * Test hover states and interactions
   */
  static async testInteractionScreenshots(
    page: Page,
    selector: string,
    name: string,
    interactions: Array<"hover" | "focus" | "active">
  ) {
    const element = page.locator(selector);

    for (const interaction of interactions) {
      switch (interaction) {
        case "hover":
          await element.hover();
          break;
        case "focus":
          await element.focus();
          break;
        case "active":
          await element.click({ noWaitAfter: true });
          break;
      }

      await page.waitForTimeout(200);
      await this.compareElementScreenshot(
        page,
        selector,
        `${name}-${interaction}`
      );
    }
  }

  /**
   * Test cross-browser visual consistency
   */
  static async testCrossBrowserConsistency(
    page: Page,
    name: string,
    browserName: string
  ) {
    await TestHelpers.waitForFonts(page);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${name}-${browserName}.png`, {
      fullPage: true,
      threshold: 0.3, // Slightly higher threshold for cross-browser differences
    });
  }

  /**
   * Test print styles
   */
  static async testPrintStyles(page: Page, name: string) {
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(300);

    await this.comparePageScreenshot(page, `${name}-print`);

    // Reset to screen media
    await page.emulateMedia({ media: "screen" });
  }

  /**
   * Test reduced motion preferences
   */
  static async testReducedMotion(page: Page, name: string) {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(300);

    await this.comparePageScreenshot(page, `${name}-reduced-motion`);

    // Reset motion preferences
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }

  /**
   * Test high contrast mode
   */
  static async testHighContrast(page: Page, name: string) {
    // Simulate high contrast by adding a CSS class
    await page.addStyleTag({
      content: `
        @media (prefers-contrast: high) {
          * {
            filter: contrast(150%) !important;
          }
        }
      `,
    });

    await page.waitForTimeout(300);
    await this.comparePageScreenshot(page, `${name}-high-contrast`);
  }
}
