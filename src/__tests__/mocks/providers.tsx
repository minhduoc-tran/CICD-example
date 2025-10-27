import React from "react";

/**
 * Mock providers for testing components that require context
 * This file can be extended as the app grows and adds more providers
 */

/**
 * Mock Theme Provider (for future use)
 */
export const MockThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div data-testid="mock-theme-provider">{children}</div>;
};

/**
 * Mock Router Provider (for future use with complex routing)
 */
export const MockRouterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div data-testid="mock-router-provider">{children}</div>;
};

/**
 * Mock Auth Provider (for future use when authentication is added)
 */
export const MockAuthProvider = ({
  children,
  isAuthenticated = false,
}: {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}) => {
  return (
    <div data-testid="mock-auth-provider" data-authenticated={isAuthenticated}>
      {children}
    </div>
  );
};

/**
 * Combined Mock Providers wrapper
 */
export const MockProviders = ({
  children,
  authProps = {},
  themeProps = {},
  routerProps = {},
}: {
  children: React.ReactNode;
  authProps?: { isAuthenticated?: boolean };
  themeProps?: Record<string, any>;
  routerProps?: Record<string, any>;
}) => {
  return (
    <MockThemeProvider {...themeProps}>
      <MockRouterProvider {...routerProps}>
        <MockAuthProvider {...authProps}>{children}</MockAuthProvider>
      </MockRouterProvider>
    </MockThemeProvider>
  );
};
