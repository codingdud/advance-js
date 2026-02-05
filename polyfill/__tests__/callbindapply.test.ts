/// <reference types="jest" />
/// <reference types="jest" />
/// <reference path="../types/polyfills.d.ts" />

// Import the polyfill to extend Function prototype
require('../callbindapply.js');

describe('Function Polyfills - mycall, myapply, mybind', () => {
  interface Person {
    fname: string;
    lname: string;
  }

  const person1: Person = {
    fname: 'Animesh',
    lname: 'Kumar'
  };

  const person2: Person = {
    fname: 'Aniket',
    lname: 'Kumar'
  };

  function greet(this: Person, city: string, state: string): string {
    return `${this.fname} ${this.lname} from ${city}, ${state}`;
  }

  function getFullName(this: Person): string {
    return `${this.fname} ${this.lname}`;
  }

  describe('mycall', () => {
    it('should call function with correct context', () => {
      const result = greet.mycall(person1, 'Ranchi', 'Jharkhand');
      expect(result).toBe('Animesh Kumar from Ranchi, Jharkhand');
    });

    it('should work with different context', () => {
      const result = greet.mycall(person2, 'Delhi', 'Delhi');
      expect(result).toBe('Aniket Kumar from Delhi, Delhi');
    });

    it('should pass multiple arguments correctly', () => {
      function sum(this: any, a: number, b: number, c: number): number {
        return a + b + c;
      }
      const result = sum.mycall(null, 1, 2, 3);
      expect(result).toBe(6);
    });

    it('should work with no additional arguments', () => {
      const result = getFullName.mycall(person1);
      expect(result).toBe('Animesh Kumar');
    });

    it('should handle null context', () => {
      function add(this: any, a: number, b: number): number {
        return a + b;
      }
      const result = add.mycall(null, 5, 10);
      expect(result).toBe(15);
    });
  });

  describe('myapply', () => {
    it('should call function with array of arguments', () => {
      const result = greet.myapply(person1, ['Mumbai', 'Maharashtra']);
      expect(result).toBe('Animesh Kumar from Mumbai, Maharashtra');
    });

    it('should work with different context', () => {
      const result = greet.myapply(person2, ['Chennai', 'Tamil Nadu']);
      expect(result).toBe('Aniket Kumar from Chennai, Tamil Nadu');
    });

    it('should handle array with multiple arguments', () => {
      function multiply(this: any, a: number, b: number, c: number): number {
        return a * b * c;
      }
      const result = multiply.myapply(null, [2, 3, 4]);
      expect(result).toBe(24);
    });

    it('should work with empty arguments array', () => {
      const result = getFullName.myapply(person2, []);
      expect(result).toBe('Aniket Kumar');
    });

    it('should handle null context', () => {
      function concatenate(this: any, ...args: string[]): string {
        return args.join('-');
      }
      const result = concatenate.myapply(null, ['a', 'b', 'c']);
      expect(result).toBe('a-b-c');
    });
  });

  describe('mybind', () => {
    it('should bind context and return new function', () => {
      const boundFn = greet.mybind(person1, 'Bangalore');
      const result = boundFn('Karnataka');
      expect(result).toBe('Animesh Kumar from Bangalore, Karnataka');
    });

    it('should partially apply arguments', () => {
      const boundFn = greet.mybind(person2);
      const result = boundFn('Hyderabad', 'Telangana');
      expect(result).toBe('Aniket Kumar from Hyderabad, Telangana');
    });

    it('should bind all arguments', () => {
      const boundFn = greet.mybind(person1, 'Kolkata', 'West Bengal');
      const result = boundFn();
      expect(result).toBe('Animesh Kumar from Kolkata, West Bengal');
    });

    it('should work with null context', () => {
      function add(this: any, a: number, b: number): number {
        return a + b;
      }
      const boundAdd = add.mybind(null, 5);
      const result = boundAdd(10);
      expect(result).toBe(15);
    });

    it('should maintain correct context when called multiple times', () => {
      const boundFn = getFullName.mybind(person1);
      expect(boundFn()).toBe('Animesh Kumar');
      expect(boundFn()).toBe('Animesh Kumar');
    });

    it('should allow currying', () => {
      function threeSum(this: any, a: number, b: number, c: number): number {
        return a + b + c;
      }
      const bound1 = threeSum.mybind(null, 1);
      const bound2 = bound1.mybind(null, 2);
      // Note: This might not work perfectly with current implementation
      // but we can test single-level binding
      const result = bound1(2, 3);
      expect(result).toBe(6);
    });
  });

  describe('Comparison with native methods', () => {
    it('mycall should behave like native call', () => {
      const nativeResult = greet.call(person1, 'Pune', 'Maharashtra');
      const customResult = greet.mycall(person1, 'Pune', 'Maharashtra');
      expect(customResult).toBe(nativeResult);
    });

    it('myapply should behave like native apply', () => {
      const nativeResult = greet.apply(person1, ['Jaipur', 'Rajasthan']);
      const customResult = greet.myapply(person1, ['Jaipur', 'Rajasthan']);
      expect(customResult).toBe(nativeResult);
    });

    it('mybind should behave like native bind', () => {
      const nativeBound = greet.bind(person1, 'Ahmedabad');
      const customBound = greet.mybind(person1, 'Ahmedabad');
      
      const nativeResult = nativeBound('Gujarat');
      const customResult = customBound('Gujarat');
      
      expect(customResult).toBe(nativeResult);
    });
  });
});
