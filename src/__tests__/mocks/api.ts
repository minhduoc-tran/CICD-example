// API mocks for testing HTTP requests and responses

/**
 * Mock fetch responses for different scenarios
 */
export const mockApiResponses = {
  success: (data: any) => ({
    ok: true,
    status: 200,
    statusText: "OK",
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(JSON.stringify(data)),
  }),

  error: (status: number = 500, message: string = "Internal Server Error") => ({
    ok: false,
    status,
    statusText: message,
    json: jest.fn().mockResolvedValue({ error: message }),
    text: jest.fn().mockResolvedValue(JSON.stringify({ error: message })),
  }),

  notFound: () => ({
    ok: false,
    status: 404,
    statusText: "Not Found",
    json: jest.fn().mockResolvedValue({ error: "Not Found" }),
    text: jest.fn().mockResolvedValue(JSON.stringify({ error: "Not Found" })),
  }),

  unauthorized: () => ({
    ok: false,
    status: 401,
    statusText: "Unauthorized",
    json: jest.fn().mockResolvedValue({ error: "Unauthorized" }),
    text: jest
      .fn()
      .mockResolvedValue(JSON.stringify({ error: "Unauthorized" })),
  }),
};

/**
 * Setup fetch mock with default behavior
 */
export const setupFetchMock = () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  return mockFetch;
};

/**
 * Mock API endpoints for testing
 */
export const mockEndpoints = {
  health: "/api/health",
  users: "/api/users",
  auth: "/api/auth",
} as const;
