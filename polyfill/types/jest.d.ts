/// <reference types="jest" />

// Ensure Jest globals are properly typed
declare global {
  // This ensures 'it' is recognized as Jest's test function, not a generator
  const it: jest.It;
  const test: jest.It;
  const describe: jest.Describe;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
}

export {};
