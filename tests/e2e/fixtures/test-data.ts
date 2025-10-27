/**
 * Test data and fixtures for E2E tests
 */

export const TEST_DATA = {
  // Expected page content
  homePage: {
    title: "Create Next App",
    heading: "Next.js CI/CD with Docker",
    description:
      "This is a simple example of a Next.js application with CI/CD using Docker.",
  },

  // URLs for testing
  urls: {
    home: "/",
    // Add more URLs as the app grows
  },

  // Viewport sizes for responsive testing
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
    largeDesktop: { width: 1920, height: 1080 },
  },

  // Timeouts
  timeouts: {
    short: 2000,
    medium: 5000,
    long: 10000,
  },

  // CSS selectors commonly used in tests
  selectors: {
    mainContainer: "div.flex.min-h-screen",
    heading: "h1",
    description: "p",
  },

  // Expected CSS classes for verification
  expectedClasses: {
    container: [
      "flex",
      "min-h-screen",
      "flex-col",
      "items-center",
      "justify-center",
      "bg-zinc-50",
      "font-sans",
      "dark:bg-black",
    ],
    heading: ["text-4xl", "font-bold", "text-zinc-800", "dark:text-zinc-200"],
    description: ["mt-4", "text-lg", "text-zinc-600", "dark:text-zinc-400"],
  },
};

/**
 * Test user data for future authentication tests
 */
export const TEST_USERS = {
  // Add test users when authentication is implemented
  // admin: {
  //   email: 'admin@test.com',
  //   password: 'testpassword123'
  // }
};

/**
 * API endpoints for testing
 */
export const API_ENDPOINTS = {
  // Add API endpoints when backend is implemented
  // health: '/api/health',
  // users: '/api/users'
};
