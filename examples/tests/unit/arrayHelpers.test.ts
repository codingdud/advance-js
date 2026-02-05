import { ArrayHelpers } from '../../src/utils/arrayHelpers';

describe('ArrayHelpers', () => {
  describe('map', () => {
    it('should map array elements', () => {
      const input = [1, 2, 3, 4];
      const result = ArrayHelpers.map(input, (x) => x * 2);
      expect(result).toEqual([2, 4, 6, 8]);
    });

    it('should pass index to callback', () => {
      const input = ['a', 'b', 'c'];
      const result = ArrayHelpers.map(input, (item, index) => `${item}-${index}`);
      expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    });

    it('should handle empty array', () => {
      const result = ArrayHelpers.map([], (x) => x);
      expect(result).toEqual([]);
    });

    it('should transform types correctly', () => {
      const numbers = [1, 2, 3];
      const strings = ArrayHelpers.map(numbers, (n) => n.toString());
      expect(strings).toEqual(['1', '2', '3']);
      expect(typeof strings[0]).toBe('string');
    });
  });

  describe('filter', () => {
    it('should filter array elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = ArrayHelpers.filter(input, (x) => x % 2 === 0);
      expect(result).toEqual([2, 4]);
    });

    it('should return empty array when no elements match', () => {
      const input = [1, 3, 5];
      const result = ArrayHelpers.filter(input, (x) => x % 2 === 0);
      expect(result).toEqual([]);
    });

    it('should return all elements when all match', () => {
      const input = [2, 4, 6];
      const result = ArrayHelpers.filter(input, (x) => x % 2 === 0);
      expect(result).toEqual([2, 4, 6]);
    });

    it('should pass index and array to predicate', () => {
      const input = [1, 2, 3];
      const indices: number[] = [];
      ArrayHelpers.filter(input, (_, index) => {
        indices.push(index);
        return true;
      });
      expect(indices).toEqual([0, 1, 2]);
    });
  });

  describe('reduce', () => {
    it('should reduce array to sum', () => {
      const input = [1, 2, 3, 4];
      const result = ArrayHelpers.reduce(input, (acc, curr) => acc + curr, 0);
      expect(result).toBe(10);
    });

    it('should reduce array to product', () => {
      const input = [2, 3, 4];
      const result = ArrayHelpers.reduce(input, (acc, curr) => acc * curr, 1);
      expect(result).toBe(24);
    });

    it('should work with different accumulator type', () => {
      const input = [1, 2, 3];
      const result = ArrayHelpers.reduce(
        input,
        (acc, curr) => {
          acc[curr] = curr * 2;
          return acc;
        },
        {} as Record<number, number>
      );
      expect(result).toEqual({ 1: 2, 2: 4, 3: 6 });
    });

    it('should handle empty array with initial value', () => {
      const result = ArrayHelpers.reduce([], (acc, curr) => acc + curr, 42);
      expect(result).toBe(42);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      const input = [1, [2, 3], [4, [5, 6]]];
      const result = ArrayHelpers.flatten(input);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle already flat array', () => {
      const input = [1, 2, 3];
      const result = ArrayHelpers.flatten(input);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      const result = ArrayHelpers.flatten([]);
      expect(result).toEqual([]);
    });

    it('should handle deeply nested arrays', () => {
      const input = [1, [2, [3, [4, [5]]]]];
      const result = ArrayHelpers.flatten(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('unique', () => {
    it('should remove duplicate numbers', () => {
      const input = [1, 2, 2, 3, 3, 3, 4];
      const result = ArrayHelpers.unique(input);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should remove duplicate strings', () => {
      const input = ['a', 'b', 'a', 'c', 'b'];
      const result = ArrayHelpers.unique(input);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should handle array with no duplicates', () => {
      const input = [1, 2, 3, 4];
      const result = ArrayHelpers.unique(input);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty array', () => {
      const result = ArrayHelpers.unique([]);
      expect(result).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should chunk array into specified size', () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = ArrayHelpers.chunk(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it('should handle non-divisible array length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = ArrayHelpers.chunk(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle chunk size larger than array', () => {
      const input = [1, 2, 3];
      const result = ArrayHelpers.chunk(input, 5);
      expect(result).toEqual([[1, 2, 3]]);
    });

    it('should throw error for invalid chunk size', () => {
      const input = [1, 2, 3];
      expect(() => ArrayHelpers.chunk(input, 0)).toThrow('Chunk size must be greater than 0');
      expect(() => ArrayHelpers.chunk(input, -1)).toThrow('Chunk size must be greater than 0');
    });

    it('should handle empty array', () => {
      const result = ArrayHelpers.chunk([], 2);
      expect(result).toEqual([]);
    });
  });
});
