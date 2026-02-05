// Global test setup file
// This file runs before all tests

// Extend Jest matchers if needed
declare global {
  namespace jest {
    interface Matchers<R> {
      // Add custom matchers here
    }
  }
}

// Global setup
beforeAll(() => {
  // Setup code that runs once before all tests
  console.log('🧪 Starting test suite...');
});

// Global teardown
afterAll(() => {
  // Cleanup code that runs once after all tests
  console.log('✅ Test suite completed!');
});

// Setup before each test
beforeEach(() => {
  // Reset any mocks or state before each test
});

// Cleanup after each test
afterEach(() => {
  // Cleanup after each test
  jest.clearAllMocks();
});

// Suppress console errors in tests (optional)
// global.console.error = jest.fn();
// global.console.warn = jest.fn();

export {};
