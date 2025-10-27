// Export all test utilities from a single entry point
export * from "./test-utils";
export * from "./test-data-factories";
export * from "./test-fixtures";
export * from "./test-helpers";

// Re-export commonly used testing library functions for convenience
export {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
  getByRole,
  getByText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByTestId,
  findByRole,
  findByText,
  findByTestId,
} from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";
