// Type definitions for generator functions

interface GeneratorFunctions {
  generator(): Generator<number, number, number>;
}

declare const generator: () => Generator<number, number, number>;

// For async generators
declare function asyncGenerator(): AsyncGenerator<any, any, any>;
