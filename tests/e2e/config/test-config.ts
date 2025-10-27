import { PlaywrightTestConfig } from "@playwright/test";

/**
 * Extended test configuration for E2E tests
 */
export const E2E_CONFIG = {
  // Base URL for tests
  baseURL: process.env.BASE_URL || "http://localhost:3000",

  // Timeouts
  timeouts: {
    test: 30000,
    expect: 5000,
    navigation: 10000,
  },

  // Retry configuration
  retries: {
    ci: 2,
    local: 0,
  },

  // Worker configuration
  workers: {
    ci: 1,
    local: undefined, // Use default (number of CPU cores)
  },

  // Screenshot configuration
  screenshots: {
    mode: "only-on-failure" as const,
    fullPage: true,
  },

  // Video configuration
  video: {
    mode: "retain-on-failure" as const,
    size: { width: 1280, height: 720 },
  },

  // Trace configuration
  trace: {
    mode: "retain-on-failure" as const,
  },

  // Browser configuration
  browsers: {
    chromium: {
      name: "chromium",
      use: {
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
      },
    },
    firefox: {
      name: "firefox",
      use: {
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
      },
    },
    webkit: {
      name: "webkit",
      use: {
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
      },
    },
  },

  // Mobile devices
  mobileDevices: {
    "Mobile Chrome": {
      name: "Mobile Chrome",
      use: {
        ...require("@playwright/test").devices["Pixel 5"],
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    "Mobile Safari": {
      name: "Mobile Safari",
      use: {
        ...require("@playwright/test").devices["iPhone 12"],
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
  },

  // Test directories
  testDirs: {
    e2e: "./tests/e2e",
    fixtures: "./tests/e2e/fixtures",
    pages: "./tests/e2e/pages",
    utils: "./tests/e2e/utils",
  },

  // Output directories
  outputDirs: {
    results: "./test-results",
    reports: "./playwright-report",
    screenshots: "./test-results/screenshots",
  },
};

/**
 * Get configuration based on environment
 */
export function getTestConfig(): Partial<PlaywrightTestConfig> {
  const isCI = !!process.env.CI;

  return {
    timeout: E2E_CONFIG.timeouts.test,
    expect: {
      timeout: E2E_CONFIG.timeouts.expect,
    },
    retries: isCI ? E2E_CONFIG.retries.ci : E2E_CONFIG.retries.local,
    workers: isCI ? E2E_CONFIG.workers.ci : E2E_CONFIG.workers.local,
    use: {
      baseURL: E2E_CONFIG.baseURL,
      navigationTimeout: E2E_CONFIG.timeouts.navigation,
      screenshot: E2E_CONFIG.screenshots.mode,
      video: E2E_CONFIG.video.mode,
      trace: E2E_CONFIG.trace.mode,
    },
    outputDir: E2E_CONFIG.outputDirs.results,
  };
}
