import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Helper function to setup user event with default configuration
 */
export const setupUserEvent = () => {
  return userEvent.setup();
};

/**
 * Helper function to wait for an element to appear
 */
export const waitForElement = async (
  selector: string,
  options?: { timeout?: number }
) => {
  return waitFor(
    () => {
      const element = screen.getByTestId(selector);
      expect(element).toBeInTheDocument();
      return element;
    },
    { timeout: options?.timeout || 5000 }
  );
};

/**
 * Helper function to wait for an element to disappear
 */
export const waitForElementToDisappear = async (
  selector: string,
  options?: { timeout?: number }
) => {
  return waitFor(
    () => {
      expect(screen.queryByTestId(selector)).not.toBeInTheDocument();
    },
    { timeout: options?.timeout || 5000 }
  );
};

/**
 * Helper function to simulate user interactions
 */
export const simulateUserInteraction = {
  click: async (element: HTMLElement) => {
    const user = setupUserEvent();
    await user.click(element);
  },

  type: async (element: HTMLElement, text: string) => {
    const user = setupUserEvent();
    await user.type(element, text);
  },

  clear: async (element: HTMLElement) => {
    const user = setupUserEvent();
    await user.clear(element);
  },

  selectOption: async (element: HTMLElement, option: string) => {
    const user = setupUserEvent();
    await user.selectOptions(element, option);
  },
};
/**
 * Helper function to mock console methods during tests
 */
export const mockConsole = () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  return originalConsole;
};

/**
 * Helper function to create a mock implementation that can be spied on
 */
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  return jest.fn(implementation);
};

/**
 * Helper function to assert element accessibility
 */
export const assertAccessibility = {
  hasRole: (element: HTMLElement, role: string) => {
    expect(element).toHaveAttribute("role", role);
  },

  hasAriaLabel: (element: HTMLElement, label: string) => {
    expect(element).toHaveAttribute("aria-label", label);
  },

  isAccessible: (element: HTMLElement) => {
    expect(element).toBeVisible();
    expect(element).not.toHaveAttribute("aria-hidden", "true");
  },
};

/**
 * Helper function to test responsive behavior
 */
export const testResponsive = {
  mobile: () => {
    Object.defineProperty(window, "innerWidth", { value: 375 });
    Object.defineProperty(window, "innerHeight", { value: 667 });
  },

  tablet: () => {
    Object.defineProperty(window, "innerWidth", { value: 768 });
    Object.defineProperty(window, "innerHeight", { value: 1024 });
  },

  desktop: () => {
    Object.defineProperty(window, "innerWidth", { value: 1920 });
    Object.defineProperty(window, "innerHeight", { value: 1080 });
  },
};
