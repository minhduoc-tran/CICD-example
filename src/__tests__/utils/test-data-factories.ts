// Test data factories for creating mock data consistently across tests

/**
 * Factory for creating mock metadata objects
 */
export const createMockMetadata = (
  overrides?: Partial<{
    title: string;
    description: string;
  }>
) => ({
  title: "Test App",
  description: "Test description for the app",
  ...overrides,
});

/**
 * Factory for creating mock Next.js router objects
 */
export const createMockRouter = (
  overrides?: Partial<{
    push: jest.Mock;
    replace: jest.Mock;
    prefetch: jest.Mock;
    back: jest.Mock;
    forward: jest.Mock;
    refresh: jest.Mock;
    pathname: string;
    query: Record<string, string>;
  }>
) => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: "/",
  query: {},
  ...overrides,
});

/**
 * Factory for creating mock component props
 */
export const createMockProps = <T extends Record<string, any>>(
  defaultProps: T,
  overrides?: Partial<T>
): T => ({
  ...defaultProps,
  ...overrides,
});

/**
 * Factory for creating mock DOM elements
 */
export const createMockElement = (
  overrides?: Partial<{
    textContent: string;
    className: string;
    id: string;
  }>
) => ({
  textContent: "Mock element",
  className: "mock-class",
  id: "mock-id",
  ...overrides,
});

/**
 * Factory for creating mock event objects
 */
export const createMockEvent = <T extends Event>(
  type: string,
  overrides?: Partial<T>
) =>
  ({
    type,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: createMockElement(),
    currentTarget: createMockElement(),
    ...overrides,
  } as T);

/**
 * Factory for creating mock fetch responses
 */
export const createMockFetchResponse = (
  data: any,
  options?: Partial<{
    status: number;
    statusText: string;
    ok: boolean;
    headers: Record<string, string>;
  }>
) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  headers: new Headers(),
  json: jest.fn().mockResolvedValue(data),
  text: jest.fn().mockResolvedValue(JSON.stringify(data)),
  blob: jest.fn().mockResolvedValue(new Blob()),
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
  ...options,
});

/**
 * Utility for creating consistent test IDs
 */
export const createTestId = (component: string, element?: string) => {
  return element ? `${component}-${element}` : component;
};

/**
 * Utility for creating mock CSS classes
 */
export const createMockClasses = (...classes: string[]) => {
  return classes.join(" ");
};
