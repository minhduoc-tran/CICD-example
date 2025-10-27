import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../fixtures/base-page";

/**
 * Page Object Model for the Home page
 */
export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly description: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", {
      name: /Next\.js CI\/CD with Docker/i,
    });
    this.description = page.getByText(
      /This is a simple example of a Next\.js application/i
    );
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto("/");
    await this.waitForLoad();
  }

  /**
   * Verify page elements are visible
   */
  async verifyPageElements() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
  }

  /**
   * Get heading text
   */
  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent()) || "";
  }

  /**
   * Get description text
   */
  async getDescriptionText(): Promise<string> {
    return (await this.description.textContent()) || "";
  }

  /**
   * Verify page title
   */
  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Create Next App/);
  }

  /**
   * Verify responsive design elements
   */
  async verifyResponsiveLayout() {
    // Check if main container has responsive classes - use more specific selector
    const container = this.page.locator("div.flex.min-h-screen");
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/min-h-screen/);
    await expect(container).toHaveClass(/flex/);
    await expect(container).toHaveClass(/items-center/);
    await expect(container).toHaveClass(/justify-center/);

    // Verify the layout is actually working (elements are stacked vertically)
    const heading = this.heading;
    const description = this.description;

    const headingBox = await heading.boundingBox();
    const descriptionBox = await description.boundingBox();

    // Description should be below the heading (flex-col behavior)
    if (headingBox && descriptionBox) {
      expect(descriptionBox.y).toBeGreaterThan(headingBox.y);
    }
  }

  /**
   * Verify dark mode support
   */
  async verifyDarkModeSupport() {
    // Check if dark mode classes are present - use more specific selector
    const container = this.page.locator("div.flex.min-h-screen");
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/dark:bg-black/);

    const heading = this.heading;
    await expect(heading).toHaveClass(/dark:text-zinc-200/);
  }
}
