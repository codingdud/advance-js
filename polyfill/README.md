# JavaScript Polyfills with TypeScript Tests 🚀

This project contains custom JavaScript polyfill implementations with comprehensive TypeScript test suites using Jest.

## 📋 Overview

- **Polyfills**: Written in clean JavaScript
- **Tests**: Written in TypeScript with full type safety
- **Testing Framework**: Jest with ts-jest
- **Coverage**: Full test coverage with detailed reports

## 🗂️ Project Structure

```
polyfill/
├── array.js                      # Array method polyfills (map, forEach, reduce, filter, fill)
├── cacheLru.js                   # LRU cache with memoization
├── Throttling.js                 # Throttling implementations
├── callbindapply.js              # Function.prototype polyfills (call, apply, bind)
│
├── __tests__/                    # TypeScript test files
│   ├── array.test.ts             # Tests for array polyfills
│   ├── cacheLru.test.ts          # Tests for LRU cache
│   ├── Throttling.test.ts        # Tests for throttling functions
│   └── callbindapply.test.ts     # Tests for call/bind/apply
│
├── types/                        # TypeScript type definitions
│   └── polyfills.d.ts            # Type declarations for polyfills
│
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest configuration
├── package.json                  # Dependencies and scripts
├── .gitignore                    # Git ignore rules
├── setup.sh                      # Linux/Mac setup script
├── setup.bat                     # Windows setup script
└── TYPESCRIPT_JEST_SETUP.md      # Detailed setup guide
```

## ⚡ Quick Start

### 1. Install Dependencies

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Or manually:**
```bash
npm install
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with verbose output
npm run test:verbose
```

## 📚 Polyfills Included

### 1. Array Polyfills (`array.js`)
- `Array.prototype.mymap` - Custom map implementation
- `Array.prototype.myForEach` - Custom forEach implementation
- `Array.prototype.myReduce` - Custom reduce implementation
- `Array.prototype.filter` - Custom filter implementation
- `Array.prototype.fill` - Custom fill implementation

### 2. Function Polyfills (`callbindapply.js`)
- `Function.prototype.mycall` - Custom call implementation
- `Function.prototype.myapply` - Custom apply implementation
- `Function.prototype.mybind` - Custom bind implementation

### 3. LRU Cache (`cacheLru.js`)
- `memoization()` - Function memoization with LRU eviction
- Cache size limit: 5 items
- Automatic least-recently-used eviction

### 4. Throttling (`Throttling.js`)
- `Throttling1()` - Basic throttling (ignores intermediate calls)
- `ThrottlingTrailling()` - Throttling with trailing execution

## 🧪 Test Coverage

Current test statistics:
- **Array Polyfills**: 20+ test cases
- **Function Polyfills**: 15+ test cases
- **LRU Cache**: 25+ test cases
- **Throttling**: 20+ test cases

Run coverage report:
```bash
npm run test:coverage
```

View coverage report: Open `coverage/index.html` in your browser

## 🔧 Configuration Files

### `tsconfig.json`
TypeScript compiler configuration with:
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Jest types included

### `jest.config.js`
Jest configuration with:
- Preset: ts-jest
- Test environment: Node
- Coverage collection enabled
- Test timeout: 10 seconds

### `package.json`
NPM scripts and dependencies:
- `test` - Run all tests
- `test:watch` - Watch mode
- `test:coverage` - Coverage report
- `test:verbose` - Verbose output

## 📝 Example Test

```typescript
// __tests__/array.test.ts
require('../array.js');

describe('Array Polyfills', () => {
  it('should double all numbers using mymap', () => {
    const numbers: number[] = [1, 2, 3, 4];
    const result = numbers.mymap((x: number) => x * 2);
    expect(result).toEqual([2, 4, 6, 8]);
  });
});
```

## 🎯 Why TypeScript Tests for JavaScript Code?

✅ **Type Safety** - Catch errors at compile time  
✅ **IntelliSense** - Better IDE autocomplete and documentation  
✅ **Maintainability** - Easier to refactor and update  
✅ **Professional** - Industry-standard approach  
✅ **Clear Contracts** - Type definitions document expected behavior  

## 🛠️ Development Workflow

1. **Write polyfill** in JavaScript (e.g., `array.js`)
2. **Add type definitions** in `types/polyfills.d.ts`
3. **Write tests** in TypeScript (e.g., `__tests__/array.test.ts`)
4. **Run tests** with `npm test`
5. **Check coverage** with `npm run test:coverage`

## 📊 Sample Test Output

```
 PASS  __tests__/array.test.ts
  Array Polyfills
    mymap
      ✓ should double all numbers (3 ms)
      ✓ should work with index parameter (1 ms)
      ✓ should handle empty array (1 ms)
    myForEach
      ✓ should iterate over all elements (2 ms)
      ✓ should provide element and index (1 ms)
    myReduce
      ✓ should sum numbers (1 ms)
      ✓ should multiply numbers (1 ms)
      ✓ should build object from array (2 ms)

Test Suites: 4 passed, 4 total
Tests:       80 passed, 80 total
Snapshots:   0 total
Time:        3.456 s
```

## 🔍 Troubleshooting

### Issue: Cannot find module '../array.js'
**Solution**: Check that your test file uses the correct relative path

### Issue: Tests timing out
**Solution**: For throttling tests, make sure to use `jest.useFakeTimers()`

### Issue: Type errors in IDE
**Solution**: 
1. Make sure `types/polyfills.d.ts` is included in `tsconfig.json`
2. Restart your IDE/TypeScript server
3. Run `npm install` to ensure `@types/jest` is installed

### Issue: Coverage report not generating
**Solution**: Check that `collectCoverage: true` in `jest.config.js`

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
- [Setup Guide](./TYPESCRIPT_JEST_SETUP.md) - Detailed step-by-step guide

## 👤 Author

**Animesh Kumar**

## 📄 License

ISC

---

**Happy Testing! 🎉**

For detailed setup instructions, see [TYPESCRIPT_JEST_SETUP.md](./TYPESCRIPT_JEST_SETUP.md)
