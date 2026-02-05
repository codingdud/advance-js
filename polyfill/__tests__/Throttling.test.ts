/// <reference types="jest" />

/// <reference types="jest" />

// Import the polyfill
require('../Throttling.js');

declare const Throttling1: <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => (...args: Parameters<T>) => void;

declare const ThrottlingTrailling: <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => (...args: Parameters<T>) => void;

describe('Throttling Functions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Throttling1 (Basic Throttling)', () => {
    it('should call function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 1000);

      throttled('test');
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should ignore calls within throttle period', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 1000);

      throttled('first');
      throttled('second');
      throttled('third');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');
    });

    it('should allow call after throttle period expires', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 1000);

      throttled('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      
      throttled('second');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
      expect(mockFn).toHaveBeenNthCalledWith(2, 'second');
    });

    it('should handle multiple throttle cycles', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 1000);

      // Cycle 1
      throttled('call-1');
      throttled('call-2');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      // Cycle 2
      throttled('call-3');
      throttled('call-4');
      expect(mockFn).toHaveBeenCalledTimes(2);

      jest.advanceTimersByTime(1000);

      // Cycle 3
      throttled('call-5');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('should work with different delay times', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 500);

      throttled('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(500);
      throttled('second');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle numeric arguments', () => {
      const mockFn = jest.fn((a: number, b: number) => a + b);
      const throttled = Throttling1(mockFn, 1000);

      throttled(5, 10);
      expect(mockFn).toHaveBeenCalledWith(5, 10);
    });

    it('should ignore intermediate calls and not execute them later', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 1000);

      throttled('first');
      throttled('second'); // Ignored
      throttled('third');  // Ignored

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');

      // Wait for throttle to expire
      jest.advanceTimersByTime(1000);

      // 'second' and 'third' should NOT be called
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('ThrottlingTrailling (Throttling with Trailing Call)', () => {
    it('should call function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttled = ThrottlingTrailling(mockFn, 1000);

      throttled('test');
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should execute trailing call with latest arguments', () => {
      const mockFn = jest.fn();
      const throttled = ThrottlingTrailling(mockFn, 1000);

      throttled('first');  // Executes immediately
      throttled('second'); // Ignored, but saved
      throttled('third');  // Updates saved args

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');

      // Advance time to trigger trailing call
      jest.advanceTimersByTime(1000);

      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(2, 'third'); // Latest args
    });

    it('should not execute trailing call if no calls during throttle', () => {
      const mockFn = jest.fn();
      const throttled = ThrottlingTrailling(mockFn, 1000);

      throttled('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      
      // No additional calls expected
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid successive calls', () => {
      const mockFn = jest.fn();
      const throttled = ThrottlingTrailling(mockFn, 1000);

      // Simulate rapid clicking
      for (let i = 1; i <= 10; i++) {
        throttled(`call-${i}`);
      }

      // First call executes immediately
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call-1');

      // Advance time to trigger trailing call
      jest.advanceTimersByTime(1000);

      // Trailing call with last argument
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(2, 'call-10');
    });

    it('should handle multiple throttle cycles with trailing calls', () => {
      const mockFn = jest.fn();
      const throttled = ThrottlingTrailling(mockFn, 1000);

      // Cycle 1
      throttled('first');
      throttled('second');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(2, 'second');

      // Cycle 2
      throttled('third');
      throttled('fourth');
      expect(mockFn).toHaveBeenCalledTimes(3);

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(4);
      expect(mockFn).toHaveBeenNthCalledWith(4, 'fourth');
    });

    it('should work with multiple arguments', () => {
      const mockFn = jest.fn((a: number, b: number, c: number) => a + b + c);
      const throttled = ThrottlingTrailling(mockFn, 1000);

      throttled(1, 2, 3);
      throttled(4, 5, 6);

      expect(mockFn).toHaveBeenCalledWith(1, 2, 3);

      jest.advanceTimersByTime(1000);

      expect(mockFn).toHaveBeenCalledWith(4, 5, 6);
    });

    it('should preserve context (this)', () => {
      const obj = {
        value: 10,
        method: jest.fn(function(this: any, x: number) {
          return this.value + x;
        })
      };

      const throttled = ThrottlingTrailling(obj.method, 1000);

      throttled.call(obj, 5);
      throttled.call(obj, 15);

      jest.advanceTimersByTime(1000);

      expect(obj.method).toHaveBeenCalledTimes(2);
    });
  });

  describe('Comparison between Throttling1 and ThrottlingTrailling', () => {
    it('Throttling1 should ignore trailing calls', () => {
      const mockFn1 = jest.fn();
      const throttled1 = Throttling1(mockFn1, 1000);

      throttled1('first');
      throttled1('second');
      throttled1('third');

      jest.advanceTimersByTime(1000);

      // Only first call executed
      expect(mockFn1).toHaveBeenCalledTimes(1);
    });

    it('ThrottlingTrailling should execute trailing calls', () => {
      const mockFn2 = jest.fn();
      const throttled2 = ThrottlingTrailling(mockFn2, 1000);

      throttled2('first');
      throttled2('second');
      throttled2('third');

      jest.advanceTimersByTime(1000);

      // First and last call executed
      expect(mockFn2).toHaveBeenCalledTimes(2);
      expect(mockFn2).toHaveBeenNthCalledWith(1, 'first');
      expect(mockFn2).toHaveBeenNthCalledWith(2, 'third');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero delay', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 0);

      throttled('test');
      expect(mockFn).toHaveBeenCalled();
    });

    it('should handle very long delays', () => {
      const mockFn = jest.fn();
      const throttled = Throttling1(mockFn, 10000);

      throttled('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(9999);
      throttled('second');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1);
      throttled('third');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle function that throws error', () => {
      const errorFn = jest.fn((...args: any[]) => {
        throw new Error('Test error');
      });
      const throttled = Throttling1(errorFn, 1000);

      expect(() => throttled('test')).toThrow('Test error');
      expect(errorFn).toHaveBeenCalledTimes(1);
    });
  });
});
