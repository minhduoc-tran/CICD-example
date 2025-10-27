import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MockProviders } from "../mocks/providers";

// Custom render function with providers
// This allows us to wrap components with necessary providers during testing
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Provider-specific options
  providerProps?: {
    authProps?: { isAuthenticated?: boolean };
    themeProps?: Record<string, any>;
    routerProps?: Record<string, any>;
  };
  // Skip providers wrapper (for testing components in isolation)
  skipProviders?: boolean;
}

// Custom render function that wraps components with providers
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const {
    providerProps = {},
    skipProviders = false,
    ...renderOptions
  } = options || {};

  // Wrapper component that provides context/providers
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    if (skipProviders) {
      return <>{children}</>;
    }

    return <MockProviders {...providerProps}>{children}</MockProviders>;
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Override render method with our custom render
export { customRender as render };
