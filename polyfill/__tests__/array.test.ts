/// <reference types="jest" />
/// <reference types="jest" />
/// <reference path="../types/polyfills.d.ts" />

// Import the polyfill to extend Array prototype
require('../array.js');

describe('Array Polyfills', () => {
  describe('mymap', () => {
    it('should double all numbers', () => {
      const numbers: number[] = [1, 2, 3, 4];
      const result = numbers.mymap((x: number) => x * 2);
      expect(result).toEqual([2, 4, 6, 8]);
    });

    it('should work with index parameter', () => {
      const letters: string[] = ['a', 'b', 'c'];
      const result = letters.mymap((element: string, index: number) => `${element}-${index}`);
      expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    });

    it('should handle empty array', () => {
      const empty: number[] = [];
      const result = empty.mymap((x: number) => x * 2);
      expect(result).toEqual([]);
    });

    it('should transform strings to their lengths', () => {
      const words: string[] = ['hello', 'world', 'test'];
      const lengths = words.mymap((word: string) => word.length);
      expect(lengths).toEqual([5, 5, 4]);
    });

    it('should create objects from array', () => {
      const names: string[] = ['John', 'Jane'];
      const result = names.mymap((name: string, index: number) => ({ id: index, name }));
      expect(result).toEqual([
        { id: 0, name: 'John' },
        { id: 1, name: 'Jane' }
      ]);
    });
  });

  describe('myForEach', () => {
    it('should iterate over all elements', () => {
      const numbers: number[] = [1, 2, 3, 4];
      let sum = 0;
      numbers.myForEach((x: number) => {
        sum += x;
      });
      expect(sum).toBe(10);
    });

    it('should provide element and index', () => {
      const letters: string[] = ['a', 'b', 'c'];
      const output: string[] = [];
      letters.myForEach((element: string, index: number) => {
        output.push(`${element}-${index}`);
      });
      expect(output).toEqual(['a-0', 'b-1', 'c-2']);
    });

    it('should not execute on empty array', () => {
      const empty: number[] = [];
      let count = 0;
      empty.myForEach(() => {
        count++;
      });
      expect(count).toBe(0);
    });

    it('should modify external array', () => {
      const results: number[] = [];
      [10, 20, 30].myForEach((num: number, index: number) => {
        results.push(num * index);
      });
      expect(results).toEqual([0, 20, 60]);
    });
  });

  describe('myReduce', () => {
    it('should sum numbers', () => {
      const numbers: number[] = [1, 2, 3, 4];
      const sum = numbers.myReduce((acc: number, num: number) => acc + num, 0);
      expect(sum).toBe(10);
    });

    it('should multiply numbers', () => {
      const numbers: number[] = [2, 3, 4];
      const product = numbers.myReduce((acc: number, num: number) => acc * num, 1);
      expect(product).toBe(24);
    });

    it('should concatenate strings', () => {
      const words: string[] = ['Hello', ' ', 'World'];
      const sentence = words.myReduce((acc: string, word: string) => acc + word, '');
      expect(sentence).toBe('Hello World');
    });

    it('should build object from array', () => {
      const items: string[] = ['apple', 'banana', 'cherry'];
      const obj = items.myReduce((acc: Record<string, number>, item: string, index: number) => {
        acc[item] = index;
        return acc;
      }, {});
      expect(obj).toEqual({ apple: 0, banana: 1, cherry: 2 });
    });

    it('should return initial value for empty array', () => {
      const empty: number[] = [];
      const emptySum = empty.myReduce((acc: number, num: number) => acc + num, 10);
      expect(emptySum).toBe(10);
    });

    it('should find max value', () => {
      const numbers: number[] = [5, 2, 9, 1, 7];
      const max = numbers.myReduce(
        (acc: number, num: number) => (num > acc ? num : acc),
        -Infinity
      );
      expect(max).toBe(9);
    });

    it('should flatten nested arrays', () => {
      const nested: number[][] = [[1, 2], [3, 4], [5]];
      const flat = nested.myReduce((acc: number[], arr: number[]) => acc.concat(arr), []);
      expect(flat).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('filter', () => {
    it('should filter even numbers', () => {
      const numbers: number[] = [1, 2, 3, 4, 5, 6];
      const evens = numbers.filter((x: number) => x % 2 === 0);
      expect(evens).toEqual([2, 4, 6]);
    });

    it('should filter odd numbers', () => {
      const numbers: number[] = [1, 2, 3, 4, 5, 6];
      const odds = numbers.filter((x: number) => x % 2 !== 0);
      expect(odds).toEqual([1, 3, 5]);
    });

    it('should filter with index', () => {
      const letters: string[] = ['a', 'b', 'c', 'd', 'e'];
      const evenIndex = letters.filter((_: string, index: number) => index % 2 === 0);
      expect(evenIndex).toEqual(['a', 'c', 'e']);
    });

    it('should filter numbers greater than value', () => {
      const nums: number[] = [3, 7, 2, 9, 1, 6];
      const greaterThan5 = nums.filter((x: number) => x > 5);
      expect(greaterThan5).toEqual([7, 9, 6]);
    });

    it('should filter strings by length', () => {
      const words: string[] = ['hi', 'hello', 'bye', 'world'];
      const longWords = words.filter((word: string) => word.length > 3);
      expect(longWords).toEqual(['hello', 'world']);
    });

    it('should return empty array when no matches', () => {
      const allSmall: number[] = [1, 2, 3];
      const result = allSmall.filter((x: number) => x > 10);
      expect(result).toEqual([]);
    });

    it('should return all elements when all match', () => {
      const allMatch: number[] = [2, 4, 6, 8];
      const result = allMatch.filter((x: number) => x % 2 === 0);
      expect(result).toEqual([2, 4, 6, 8]);
    });

    it('should handle empty array', () => {
      const empty: number[] = [];
      const result = empty.filter((x: number) => x > 0);
      expect(result).toEqual([]);
    });
  });

  describe('fill', () => {
    it('should fill array with value', () => {
      const arr: number[] = [1, 2, 3, 4];
      arr.fill(0);
      expect(arr).toEqual([0, 0, 0, 0]);
    });

    it('should fill array with string', () => {
      const arr: string[] = ['a', 'b', 'c'];
      arr.fill('x');
      expect(arr).toEqual(['x', 'x', 'x']);
    });

    it('should fill empty array', () => {
      const arr: any[] = [];
      arr.fill(5);
      expect(arr).toEqual([]);
    });
  });
});
