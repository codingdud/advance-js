import { StringHelpers } from '../../src/utils/stringHelpers';

describe('StringHelpers', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(StringHelpers.capitalize('hello')).toBe('Hello');
    });

    it('should handle already capitalized string', () => {
      expect(StringHelpers.capitalize('Hello')).toBe('Hello');
    });

    it('should handle all uppercase string', () => {
      expect(StringHelpers.capitalize('HELLO')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(StringHelpers.capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(StringHelpers.capitalize('a')).toBe('A');
    });
  });

  describe('toCamelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(StringHelpers.toCamelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert snake_case to camelCase', () => {
      expect(StringHelpers.toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should convert space separated to camelCase', () => {
      expect(StringHelpers.toCamelCase('hello world')).toBe('helloWorld');
    });

    it('should handle multiple words', () => {
      expect(StringHelpers.toCamelCase('hello-beautiful-world')).toBe('helloBeautifulWorld');
    });

    it('should handle already camelCase', () => {
      expect(StringHelpers.toCamelCase('helloWorld')).toBe('helloworld');
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(StringHelpers.toKebabCase('helloWorld')).toBe('hello-world');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(StringHelpers.toKebabCase('HelloWorld')).toBe('hello-world');
    });

    it('should convert space separated to kebab-case', () => {
      expect(StringHelpers.toKebabCase('hello world')).toBe('hello-world');
    });

    it('should handle already kebab-case', () => {
      expect(StringHelpers.toKebabCase('hello-world')).toBe('hello-world');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(StringHelpers.toSnakeCase('helloWorld')).toBe('hello_world');
    });

    it('should convert kebab-case to snake_case', () => {
      expect(StringHelpers.toSnakeCase('hello-world')).toBe('hello_world');
    });

    it('should convert space separated to snake_case', () => {
      expect(StringHelpers.toSnakeCase('hello world')).toBe('hello_world');
    });

    it('should handle already snake_case', () => {
      expect(StringHelpers.toSnakeCase('hello_world')).toBe('hello_world');
    });
  });

  describe('truncate', () => {
    it('should truncate long string', () => {
      const input = 'This is a very long string';
      const result = StringHelpers.truncate(input, 10);
      expect(result).toBe('This is...');
      expect(result.length).toBe(10);
    });

    it('should not truncate short string', () => {
      const input = 'Short';
      const result = StringHelpers.truncate(input, 10);
      expect(result).toBe('Short');
    });

    it('should use custom suffix', () => {
      const input = 'This is a very long string';
      const result = StringHelpers.truncate(input, 10, '---');
      expect(result).toBe('This i---');
    });

    it('should handle exact length', () => {
      const input = 'Exactly10!';
      const result = StringHelpers.truncate(input, 10);
      expect(result).toBe('Exactly10!');
    });
  });

  describe('isPalindrome', () => {
    it('should identify simple palindrome', () => {
      expect(StringHelpers.isPalindrome('racecar')).toBe(true);
    });

    it('should identify palindrome with spaces', () => {
      expect(StringHelpers.isPalindrome('race car')).toBe(true);
    });

    it('should identify palindrome with mixed case', () => {
      expect(StringHelpers.isPalindrome('RaceCar')).toBe(true);
    });

    it('should identify palindrome with punctuation', () => {
      expect(StringHelpers.isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });

    it('should identify non-palindrome', () => {
      expect(StringHelpers.isPalindrome('hello')).toBe(false);
    });

    it('should handle single character', () => {
      expect(StringHelpers.isPalindrome('a')).toBe(true);
    });

    it('should handle empty string', () => {
      expect(StringHelpers.isPalindrome('')).toBe(true);
    });
  });

  describe('wordCount', () => {
    it('should count words in simple sentence', () => {
      expect(StringHelpers.wordCount('hello world')).toBe(2);
    });

    it('should handle multiple spaces', () => {
      expect(StringHelpers.wordCount('hello    world')).toBe(2);
    });

    it('should handle leading/trailing spaces', () => {
      expect(StringHelpers.wordCount('  hello world  ')).toBe(2);
    });

    it('should count single word', () => {
      expect(StringHelpers.wordCount('hello')).toBe(1);
    });

    it('should handle empty string', () => {
      expect(StringHelpers.wordCount('')).toBe(0);
    });

    it('should handle string with only spaces', () => {
      expect(StringHelpers.wordCount('    ')).toBe(0);
    });
  });

  describe('reverse', () => {
    it('should reverse string', () => {
      expect(StringHelpers.reverse('hello')).toBe('olleh');
    });

    it('should handle palindrome', () => {
      expect(StringHelpers.reverse('racecar')).toBe('racecar');
    });

    it('should handle single character', () => {
      expect(StringHelpers.reverse('a')).toBe('a');
    });

    it('should handle empty string', () => {
      expect(StringHelpers.reverse('')).toBe('');
    });

    it('should preserve spaces', () => {
      expect(StringHelpers.reverse('hello world')).toBe('dlrow olleh');
    });
  });
});
