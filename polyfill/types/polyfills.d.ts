// Type definitions for custom polyfills
// This file extends global interfaces for Array and Function prototypes

// Extend global interfaces
declare global {
  interface Array<T> {
    /**
     * Custom implementation of map function
     * @param callbackfn Function that accepts element and index
     * @returns New array with transformed elements
     */
    mymap<U>(callbackfn: (value: T, index: number) => U): U[];

    /**
     * Custom implementation of forEach function
     * @param callbackfn Function that accepts element and index
     */
    myForEach(callbackfn: (value: T, index: number) => void): void;

    /**
     * Custom implementation of reduce function
     * @param callbackfn Function that accepts accumulator, value, and index
     * @param initialValue Initial value for the accumulator
     * @returns The accumulated result
     */
    myReduce<U>(
      callbackfn: (accumulator: U, value: T, index: number) => U,
      initialValue: U
    ): U;
  }

  interface Function {
    /**
     * Custom implementation of call method
     * @param context The context to bind
     * @param args Arguments to pass to the function
     */
    mycall(context: any, ...args: any[]): any;

    /**
     * Custom implementation of apply method
     * @param context The context to bind
     * @param args Array of arguments to pass to the function
     */
    myapply(context: any, args: any[]): any;

    /**
     * Custom implementation of bind method
     * @param args Arguments to partially apply
     * @returns New bound function
     */
    mybind(...args: any[]): Function;
  }
}

// Type definitions for memoization
declare function memoization<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T>;

// Type definitions for throttling functions
declare function Throttling1<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;

declare function ThrottlingTrailling<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;

// Export for module usage
export {};
