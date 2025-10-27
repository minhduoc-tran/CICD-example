import { chromium, FullConfig } from "@playwright/test";
import { TestHelpers } from "./utils/test-helpers";

/**
 * Global setup for E2E tests
 * This runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting E2E test global setup...");

  // Create a browser instance for setup
  const browser = await chromium.launch();
  const context = await TestHelpers.setupContext(browser);
  const page = await context.newPage();

  try {
    // Verify the application is running
    const baseURL = config.projects[0].use?.baseURL || "http://localhost:3000";
    console.log(`📡 Checking if application is running at ${baseURL}...`);

    await page.goto(baseURL, { waitUntil: "networkidle" });

    // Verify the page loads correctly
    const title = await page.title();
    console.log(`✅ Application is running. Page title: "${title}"`);

    // Pre-load fonts and assets for consistent visual testing
    await TestHelpers.waitForFonts(page);
    console.log("✅ Fonts loaded successfully");

    // Create necessary directories
    const fs = require("fs");
    const path = require("path");

    const dirs = [
      "test-results",
      "test-results/screenshots",
      "playwright-report",
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    }

    console.log("✅ Global setup completed successfully");
  } catch (error) {
    console.error("❌ Global setup failed:", error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
