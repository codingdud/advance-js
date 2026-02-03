//Hoisting is JavaScript’s behavior of moving declarations to the top of their scope during the compilation phase, before code execution.
/*
🔹 JavaScript Execution Phases (Very Important)
Before running your code, JavaScript does two phases:
1️⃣ Creation (Memory Allocation) Phase
Variables are allocated memory
Functions are stored in memory

Scope is determined
2️⃣ Execution Phase
Code runs line by line
Variables get assigned values
Hoisting happens in Phase 1.
*/

// storing a function in variable
//console.log(add(2,3))

/*
let and const are hoisted

BUT they are placed in Temporal Dead Zone (TDZ)

Cannot be accessed before initialization
*/

/*
function hoisting
- normal funtion are hoisted and there is no problem
- exprestion and arrow function are not hoisted | typeError
- 
*/
/*
class hoisting
 - TDZ  referenceErro
*/
/**
 * hoisting priority
 * foo() //work
 * var foo=10;
 * funtion foo(){...}
 * Function declarations are hoisted first
 * var is ignored if same name exists
 */
/*
| Keyword              | Hoisted | Initialized | TDZ     |
| -------------------- | ------- | ----------- | ------- |
| `var`                | Yes     | `undefined` | ❌      |
| `let`                | Yes     | No          | ✅      |
| `const`              | Yes     | No          | ✅      |
| Function Declaration | Yes     | Yes         | ❌      |
| Function Expression  | Partial | No          | Depends  |
| Class                | Yes     | No          | ✅      |

*/
let add=(a,b)=>a+b;
console.log(add(2,3))
console.log(a);
var a=10;


