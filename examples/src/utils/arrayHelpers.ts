// Example utility functions for demonstration

/**
 * Array helper utilities
 */
export class ArrayHelpers {
  /**
   * Custom map implementation
   */
  static map<T, U>(array: T[], callback: (item: T, index: number, arr: T[]) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i], i, array));
    }
    return result;
  }

  /**
   * Custom filter implementation
   */
  static filter<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        result.push(array[i]);
      }
    }
    return result;
  }

  /**
   * Custom reduce implementation
   */
  static reduce<T, U>(
    array: T[],
    callback: (accumulator: U, current: T, index: number, arr: T[]) => U,
    initialValue: U
  ): U {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
  }

  /**
   * Flatten nested array
   */
  static flatten<T>(array: (T | T[])[]): T[] {
    const result: T[] = [];
    for (const item of array) {
      if (Array.isArray(item)) {
        result.push(...this.flatten(item));
      } else {
        result.push(item);
      }
    }
    return result;
  }

  /**
   * Remove duplicates from array
   */
  static unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  /**
   * Chunk array into smaller arrays
   */
  static chunk<T>(array: T[], size: number): T[][] {
    if (size <= 0) {
      throw new Error('Chunk size must be greater than 0');
    }
    
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
