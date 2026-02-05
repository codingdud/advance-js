/// <reference types="jest" />

/// <reference types="jest" />

// Import the polyfill
require('../cacheLru.js');

// Access the global memoization function
declare const memoization: <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => ReturnType<T>;

// Access the global map used for caching
declare const map: Map<string, any>;

describe('LRU Cache Memoization', () => {
  let callCount: number;

  function slowAdd(a: number, b: number): number {
    callCount++;
    return a + b;
  }

  function slowMultiply(a: number, b: number): number {
    callCount++;
    return a * b;
  }

  beforeEach(() => {
    callCount = 0;
    map.clear();
  });

  describe('Basic Caching', () => {
    it('should cache and return same result for identical calls', () => {
      const result1 = memoization(slowAdd, 2, 3);
      const result2 = memoization(slowAdd, 2, 3);
      const result3 = memoization(slowAdd, 2, 3);

      expect(result1).toBe(5);
      expect(result2).toBe(5);
      expect(result3).toBe(5);
      expect(callCount).toBe(1); // Should only compute once
    });

    it('should compute for different arguments', () => {
      const result1 = memoization(slowAdd, 2, 3);
      const result2 = memoization(slowAdd, 4, 5);
      const result3 = memoization(slowAdd, 6, 7);

      expect(result1).toBe(5);
      expect(result2).toBe(9);
      expect(result3).toBe(13);
      expect(callCount).toBe(3);
    });

    it('should differentiate between different functions', () => {
      const addResult = memoization(slowAdd, 2, 3);
      const multiplyResult = memoization(slowMultiply, 2, 3);

      expect(addResult).toBe(5);
      expect(multiplyResult).toBe(6);
      expect(callCount).toBe(2);
    });

    it('should handle zero and negative numbers', () => {
      const result1 = memoization(slowAdd, 0, 0);
      const result2 = memoization(slowAdd, -5, 5);
      const result3 = memoization(slowAdd, -10, -20);

      expect(result1).toBe(0);
      expect(result2).toBe(0);
      expect(result3).toBe(-30);
      expect(callCount).toBe(3);
    });
  });

  describe('LRU Eviction', () => {
    it('should maintain cache size limit of 5', () => {
      // Fill cache with 5 items
      memoization(slowAdd, 1, 1);
      memoization(slowAdd, 2, 2);
      memoization(slowAdd, 3, 3);
      memoization(slowAdd, 4, 4);
      memoization(slowAdd, 5, 5);

      expect(map.size).toBeLessThanOrEqual(5);
      expect(callCount).toBe(5);
    });

    it('should evict least recently used item when cache is full', () => {
      // Fill cache
      memoization(slowAdd, 1, 1); // Will be evicted
      memoization(slowAdd, 2, 2);
      memoization(slowAdd, 3, 3);
      memoization(slowAdd, 4, 4);
      memoization(slowAdd, 5, 5);

      expect(callCount).toBe(5);

      // Add new item, should evict first
      memoization(slowAdd, 6, 6);
      expect(callCount).toBe(6);

      // Access first item again - should recompute
      memoization(slowAdd, 1, 1);
      expect(callCount).toBe(7); // Recomputed because it was evicted
    });

    it('should update LRU order on cache hit', () => {
      // Fill cache
      memoization(slowAdd, 1, 1);
      memoization(slowAdd, 2, 2);
      memoization(slowAdd, 3, 3);
      memoization(slowAdd, 4, 4);
      memoization(slowAdd, 5, 5);

      // Access first item (moves to end)
      memoization(slowAdd, 1, 1);
      expect(callCount).toBe(5); // Still 5, from cache

      // Add two new items
      memoization(slowAdd, 6, 6);
      memoization(slowAdd, 7, 7);

      // First item should still be cached (was moved to end)
      memoization(slowAdd, 1, 1);
      expect(callCount).toBe(7); // Still 7, from cache
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle string arguments', () => {
      function concat(a: string, b: string): string {
        callCount++;
        return a + b;
      }

      const result1 = memoization(concat, 'hello', 'world');
      const result2 = memoization(concat, 'hello', 'world');

      expect(result1).toBe('helloworld');
      expect(result2).toBe('helloworld');
      expect(callCount).toBe(1);
    });

    it('should handle array arguments (via JSON.stringify)', () => {
      function sumArray(arr: number[]): number {
        callCount++;
        return arr.reduce((a, b) => a + b, 0);
      }

      const result1 = memoization(sumArray, [1, 2, 3]);
      const result2 = memoization(sumArray, [1, 2, 3]);

      expect(result1).toBe(6);
      expect(result2).toBe(6);
      expect(callCount).toBe(1);
    });

    it('should handle single argument functions', () => {
      function square(n: number): number {
        callCount++;
        return n * n;
      }

      const result1 = memoization(square, 5);
      const result2 = memoization(square, 5);
      const result3 = memoization(square, 10);

      expect(result1).toBe(25);
      expect(result2).toBe(25);
      expect(result3).toBe(100);
      expect(callCount).toBe(2);
    });

    it('should handle functions with no arguments', () => {
      function getRandom(): number {
        callCount++;
        return Math.random();
      }

      const result1 = memoization(getRandom);
      const result2 = memoization(getRandom);

      expect(result1).toBe(result2); // Should be cached
      expect(callCount).toBe(1);
    });
  });

  describe('Performance', () => {
    it('should improve performance on repeated calls', () => {
      function slowSquare(n: number): number {
        // Simulate slow computation
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return n * n;
      }

      const start1 = Date.now();
      const result1 = memoization(slowSquare, 10);
      const time1 = Date.now() - start1;

      const start2 = Date.now();
      const result2 = memoization(slowSquare, 10);
      const time2 = Date.now() - start2;

      expect(result1).toBe(100);
      expect(result2).toBe(100);
      // Cached call should be faster (though timing tests can be flaky)
      expect(time2).toBeLessThanOrEqual(time1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle boolean arguments', () => {
      function boolToString(val: boolean): string {
        callCount++;
        return val ? 'true' : 'false';
      }

      const result1 = memoization(boolToString, true);
      const result2 = memoization(boolToString, true);
      const result3 = memoization(boolToString, false);

      expect(result1).toBe('true');
      expect(result2).toBe('true');
      expect(result3).toBe('false');
      expect(callCount).toBe(2);
    });

    it('should handle null and undefined', () => {
      function checkNull(val: any): string {
        callCount++;
        return val === null ? 'null' : 'not null';
      }

      const result1 = memoization(checkNull, null);
      const result2 = memoization(checkNull, null);

      expect(result1).toBe('null');
      expect(result2).toBe('null');
      expect(callCount).toBe(1);
    });
  });
});
