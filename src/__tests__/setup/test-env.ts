// Test environment configuration and global setup

/**
 * Setup test environment variables
 */
export const setupTestEnv = () => {
  // Set test environment variables
  process.env.NODE_ENV = "test";
  process.env.NEXT_PUBLIC_APP_ENV = "test";

  // Mock environment variables that might be used in the app
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
  process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
};

/**
 * Reset test environment after each test
 */
export const resetTestEnv = () => {
  // Clear all mocks
  jest.clearAllMocks();

  // Reset localStorage
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  // Reset fetch mock
  if (global.fetch) {
    (global.fetch as jest.Mock).mockClear();
  }
};

/**
 * Global test configuration
 */
export const testConfig = {
  timeout: 10000,
  retries: 0,
  verbose: true,
} as const;

// Setup test environment on import
setupTestEnv();
