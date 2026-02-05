# TypeScript + Jest Example Project

A complete example project demonstrating TypeScript setup with Jest testing framework.

## 📦 What's Included

- ✅ TypeScript configuration with strict mode
- ✅ Jest testing framework with ts-jest
- ✅ Example utilities with comprehensive tests
- ✅ Code coverage reporting
- ✅ Path aliases support
- ✅ Watch mode for development
- ✅ Professional project structure

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs:
- TypeScript
- Jest and testing utilities
- ts-jest (TypeScript preprocessor)
- Type definitions

### 2. Run Tests

```bash
npm test
```

### 3. Build Project

```bash
npm run build
```

## 📁 Project Structure

```
examples/
├── src/
│   ├── index.ts                    # Main entry point
│   └── utils/
│       ├── arrayHelpers.ts         # Array utility functions
│       └── stringHelpers.ts        # String utility functions
├── tests/
│   ├── unit/
│   │   ├── arrayHelpers.test.ts    # Array tests
│   │   └── stringHelpers.test.ts   # String tests
│   └── setup.ts                     # Global test setup
├── dist/                            # Compiled output (generated)
├── coverage/                        # Coverage reports (generated)
├── jest.config.js                   # Jest configuration
├── tsconfig.json                    # TypeScript config
├── tsconfig.test.json               # TypeScript config for tests
└── package.json                     # Project metadata
```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Watch Mode (Development)

```bash
npm run test:watch
```

Tests automatically rerun when files change.

### Coverage Report

```bash
npm run test:coverage
```

Opens coverage report showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

View HTML report: `coverage/index.html`

### Run Specific Tests

```bash
# Run specific file
npm test -- arrayHelpers.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="map"

# Verbose output
npm test -- --verbose
```

## 🛠️ Development

### Build TypeScript

```bash
# One-time build
npm run build

# Watch mode (rebuild on changes)
npm run build:watch
```

### Run Compiled Code

```bash
npm start
```

### Run TypeScript Directly

```bash
npm run dev
```

Uses `ts-node` to run TypeScript without compilation.

## 📚 Example Utilities

### ArrayHelpers

```typescript
import { ArrayHelpers } from './utils/arrayHelpers';

// Map
const doubled = ArrayHelpers.map([1, 2, 3], x => x * 2);
// [2, 4, 6]

// Filter
const evens = ArrayHelpers.filter([1, 2, 3, 4], x => x % 2 === 0);
// [2, 4]

// Reduce
const sum = ArrayHelpers.reduce([1, 2, 3], (acc, x) => acc + x, 0);
// 6

// Flatten
const flat = ArrayHelpers.flatten([1, [2, 3], [4, [5]]]);
// [1, 2, 3, 4, 5]

// Unique
const unique = ArrayHelpers.unique([1, 2, 2, 3, 3]);
// [1, 2, 3]

// Chunk
const chunks = ArrayHelpers.chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]
```

### StringHelpers

```typescript
import { StringHelpers } from './utils/stringHelpers';

// Capitalize
StringHelpers.capitalize('hello');
// 'Hello'

// Camel case
StringHelpers.toCamelCase('hello-world');
// 'helloWorld'

// Kebab case
StringHelpers.toKebabCase('helloWorld');
// 'hello-world'

// Snake case
StringHelpers.toSnakeCase('helloWorld');
// 'hello_world'

// Truncate
StringHelpers.truncate('Long text', 10);
// 'Long te...'

// Palindrome check
StringHelpers.isPalindrome('racecar');
// true

// Word count
StringHelpers.wordCount('hello world');
// 2

// Reverse
StringHelpers.reverse('hello');
// 'olleh'
```

## 📝 Writing Tests

### Basic Test Example

```typescript
import { ArrayHelpers } from '../../src/utils/arrayHelpers';

describe('ArrayHelpers', () => {
  describe('map', () => {
    it('should double numbers', () => {
      const result = ArrayHelpers.map([1, 2, 3], x => x * 2);
      expect(result).toEqual([2, 4, 6]);
    });
  });
});
```

### Testing Async Functions

```typescript
describe('async function', () => {
  it('should resolve with value', async () => {
    const result = await asyncFunction();
    expect(result).toBe('expected');
  });

  it('should reject with error', async () => {
    await expect(asyncFunction()).rejects.toThrow('error');
  });
});
```

### Using Mocks

```typescript
describe('with mocks', () => {
  it('should call function', () => {
    const mockFn = jest.fn();
    mockFn('test');
    
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

## 🎯 Jest Matchers

```typescript
// Equality
expect(value).toBe(expected);
expect(value).toEqual(expected);

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(number).toBeGreaterThan(3);
expect(number).toBeLessThan(5);
expect(float).toBeCloseTo(0.3);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays/Objects
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(object).toHaveProperty('key');

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(Error);

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

## ⚙️ Configuration

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Jest (`jest.config.js`)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## 🔧 Troubleshooting

### Cannot find module

Check `moduleNameMapper` in `jest.config.js` matches `paths` in `tsconfig.json`.

### Tests not running

Verify test file patterns in `jest.config.js`:

```javascript
testMatch: [
  '**/__tests__/**/*.ts',
  '**/?(*.)+(spec|test).ts'
]
```

### TypeScript errors in tests

Ensure `@types/jest` is installed and `types` in `tsconfig.test.json` includes `jest`.

## 📊 Coverage Thresholds

Current thresholds (80% for all metrics):
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

Adjust in `jest.config.js` under `coverageThreshold`.

## 🚀 Next Steps

1. Add more utility functions
2. Write comprehensive tests
3. Set up CI/CD pipeline
4. Add ESLint for code quality
5. Add Prettier for formatting
6. Integrate with Git hooks (husky)

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)

## 📄 License

MIT

---

**Happy Testing! 🎉**
