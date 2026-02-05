// Main entry point
import { ArrayHelpers } from './utils/arrayHelpers';
import { StringHelpers } from './utils/stringHelpers';

export { ArrayHelpers, StringHelpers };

// Example usage
if (require.main === module) {
  console.log('TypeScript + Jest Example Project');
  
  // Array helpers demo
  const numbers = [1, 2, 3, 4, 5];
  const doubled = ArrayHelpers.map(numbers, x => x * 2);
  console.log('Doubled:', doubled);
  
  // String helpers demo
  const text = 'hello world';
  const capitalized = StringHelpers.capitalize(text);
  console.log('Capitalized:', capitalized);
}
