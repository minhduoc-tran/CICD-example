const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Test environment - jsdom for React component testing
  testEnvironment: "jsdom",

  // Test patterns and ignore patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/app/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/app/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/tests/e2e/",
    "<rootDir>/coverage/",
    "<rootDir>/dist/",
    "<rootDir>/build/",
    "<rootDir>/src/__tests__/utils/",
    "<rootDir>/src/__tests__/mocks/",
    "<rootDir>/src/__tests__/setup/",
  ],

  // Coverage configuration - enforces 80% threshold as per requirement 1.4
  collectCoverage:
    process.env.NODE_ENV === "test" || process.argv.includes("--coverage"),
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "app/**/*.{js,jsx,ts,tsx}",
    // Exclude type definitions
    "!src/**/*.d.ts",
    "!app/**/*.d.ts",
    // Exclude story files
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!app/**/*.stories.{js,jsx,ts,tsx}",
    // Exclude config files
    "!src/**/*.config.{js,jsx,ts,tsx}",
    "!app/**/*.config.{js,jsx,ts,tsx}",
    // Exclude barrel exports
    "!src/**/index.{js,jsx,ts,tsx}",
    "!app/**/index.{js,jsx,ts,tsx}",
    // Exclude Next.js specific files
    "!app/**/layout.{js,jsx,ts,tsx}",
    "!app/**/loading.{js,jsx,ts,tsx}",
    "!app/**/error.{js,jsx,ts,tsx}",
    "!app/**/not-found.{js,jsx,ts,tsx}",
    "!app/**/global-error.{js,jsx,ts,tsx}",
    "!app/**/template.{js,jsx,ts,tsx}",
    "!app/**/default.{js,jsx,ts,tsx}",
    // Exclude test files themselves
    "!src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "!app/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!app/**/__tests__/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: [
    "text",
    "text-summary",
    "lcov",
    "html",
    "json",
    "clover",
    "cobertura",
  ],
  // Enforce 80% coverage threshold as per requirement 1.4
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Module resolution - support Next.js and custom path mapping
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/$1",
    // Handle CSS modules
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle static assets
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },

  // Transform configuration - Next.js preset handles most transforms
  transformIgnorePatterns: [
    "/node_modules/(?!(.*\\.mjs$))",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  // Module file extensions for resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Test execution settings
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,

  // Error handling and warnings
  errorOnDeprecated: true,

  // Performance settings
  testTimeout: 10000,
  maxWorkers: "50%",

  // Watch mode plugins for better development experience
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  // Snapshot serializers for better snapshot testing
  snapshotSerializers: [],

  // Global setup and teardown
  globalSetup: undefined,
  globalTeardown: undefined,

  // Test result processor
  testResultsProcessor: undefined,

  // Notify mode for watch
  notify: false,
  notifyMode: "failure-change",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
