# 🚀 JavaScript Interview Guide - Core Concepts

> **Comprehensive guide covering fundamental JavaScript concepts with interview-focused definitions, examples, and explanations**

---

## 📑 Table of Contents
1. [Prototypes & Inheritance](#prototypes--inheritance)
2. [Scope & Closures](#scope--closures)
3. [This Keyword](#this-keyword)
4. [Hoisting](#hoisting)
5. [Higher-Order Functions](#higher-order-functions)
6. [Asynchronous JavaScript](#asynchronous-javascript)
7. [Performance Optimization](#performance-optimization)
8. [Common Interview Questions](#common-interview-questions)

---

## 🔷 Prototypes & Inheritance

### What is a Prototype?

**Interview Definition:**
> A prototype is JavaScript's built-in mechanism that enables objects to inherit properties and methods from other objects. It's the foundation of JavaScript's prototypal inheritance model, allowing code reuse and establishing relationships between objects.

### Key Concepts

#### 1. **`prototype` Property**
- **Definition:** An object property exclusive to constructor functions where shared properties and methods are defined for all instances created by that constructor.
- **Purpose:** Enables memory-efficient method sharing across instances.
- **Access:** Only available on constructor functions (not on regular objects or instances).

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding methods to prototype (shared across all instances)
Person.prototype.greet = function() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
}

const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.greet()); // "Hello, my name is Alice and I am 25 years old."
console.log(person1.greet === person2.greet); // true (same method reference)
```

#### 2. **`__proto__` (Internal Prototype Link)**
- **Definition:** An internal reference that every JavaScript object possesses, pointing to its prototype object.
- **Purpose:** Creates the lookup chain for property/method resolution.
- **Modern Alternative:** Use `Object.getPrototypeOf()` instead of `__proto__` in production.

```javascript
const arr = [1, 2, 3];

// __proto__ links instance to its constructor's prototype
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)
```

#### 3. **Prototype vs __proto__**

| Aspect | `prototype` | `__proto__` |
|--------|------------|-------------|
| **Available On** | Constructor functions only | All objects |
| **Purpose** | Blueprint for instances | Link to parent prototype |
| **Type** | Object property | Internal reference |
| **Use Case** | Define shared methods | Access prototype chain |
| **Example** | `Array.prototype` | `arr.__proto__` |

### Prototype Chain

**Interview Definition:**
> Prototype chaining is the mechanism by which JavaScript searches for properties/methods on an object. If not found on the object itself, the search continues up the prototype chain (via `__proto__` links) until the property is found or the chain ends at `null`.

**Lookup Process:**
```
Object → __proto__ → Constructor.prototype → __proto__ → Object.prototype → __proto__ → null
```

**Visual Example:**
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    return `${this.name} is eating`;
}

const dog = new Animal("Buddy");

// Property lookup chain:
// 1. dog.eat()          ❌ Not found on dog
// 2. dog.__proto__.eat() ✅ Found on Animal.prototype
console.log(dog.eat()); // "Buddy is eating"
```

### Inheritance Patterns

#### Classical Inheritance with Constructor Functions

```javascript
// Parent Constructor
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `Hello, my name is ${this.name}`;
}

// Child Constructor
function Teacher(name, age, subject) {
    // Call parent constructor with current context
    Person.call(this, name, age);
    this.subject = subject;
}

// Establish prototype chain (3 methods)

// Method 1: Object.setPrototypeOf() ⭐ Recommended
Object.setPrototypeOf(Teacher.prototype, Person.prototype);

// Method 2: Object.create() ⭐ Also Recommended
// Teacher.prototype = Object.create(Person.prototype);
// Teacher.prototype.constructor = Teacher; // Restore constructor

// Method 3: Direct __proto__ manipulation (Avoid in production)
// Teacher.prototype.__proto__ = Person.prototype;

// Add child-specific method
Teacher.prototype.teach = function() {
    return `${this.name} teaches ${this.subject}`;
}

const teacher = new Teacher("Sarah", 35, "Mathematics");
console.log(teacher.greet());  // "Hello, my name is Sarah" (inherited)
console.log(teacher.teach());  // "Sarah teaches Mathematics"
console.log(teacher instanceof Teacher); // true
console.log(teacher instanceof Person);  // true
```

#### Modern ES6 Class Syntax (Syntactic Sugar)

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age); // Call parent constructor
        this.subject = subject;
    }
    
    teach() {
        return `${this.name} teaches ${this.subject}`;
    }
}

const teacher = new Teacher("Sarah", 35, "Mathematics");
console.log(teacher.greet()); // Inherited method
console.log(teacher.teach()); // Own method
```

### Key Interview Points

✅ **Every object in JavaScript has a prototype** (except `Object.prototype`)  
✅ **Constructor functions have `prototype` property**  
✅ **Instances have `__proto__` link**  
✅ **Methods on prototype are shared** (memory efficient)  
✅ **Properties on instance are unique** (created per instance)  
✅ **Prototype chain ends at `Object.prototype.__proto__` which is `null`**  
✅ **Use `Object.create()` or `Object.setPrototypeOf()` for inheritance**

### Common Interview Questions

**Q: What's the difference between `prototype` and `__proto__`?**
- `prototype` is a property of constructor functions used as a blueprint
- `__proto__` is an internal link in every object pointing to its constructor's prototype

**Q: Why use prototypes instead of adding methods directly in constructor?**
- Memory efficiency: Methods on prototype are shared across all instances
- Direct assignment creates new function for each instance

**Q: How does `instanceof` work?**
- Checks if constructor's prototype exists anywhere in object's prototype chain
- `object instanceof Constructor` checks `Constructor.prototype` in chain

---

## 🔷 Scope & Closures

### Scope

**Interview Definition:**
> Scope determines the accessibility and visibility of variables in different parts of code. It defines the context in which variables are declared and can be referenced.

**Types of Scope:**
1. **Global Scope:** Variables accessible everywhere
2. **Function Scope:** Variables accessible only within function
3. **Block Scope:** Variables accessible only within block (let/const)

```javascript
// Global Scope
let globalVar = "I'm global";

function outer() {
    // Function Scope
    let functionVar = "I'm function-scoped";
    
    if (true) {
        // Block Scope
        let blockVar = "I'm block-scoped";
        var functionVar2 = "I'm function-scoped (var)";
        console.log(blockVar); // ✅ Accessible
    }
    
    console.log(functionVar2); // ✅ var is function-scoped
    // console.log(blockVar); // ❌ ReferenceError
}
```

### Closures

**Interview Definition:**
> A closure is a function combined with its lexical environment (the scope in which it was declared). It allows an inner function to access variables from its outer function even after the outer function has finished executing.

**Simple Formula:**
```
Inner Function + Outer Function's Variables = Closure
```

**How Closures Work:**
```javascript
function outer() {
    let count = 0; // This variable persists
    
    return function inner() {
        count++;
        console.log(count);
    }
}

const counter = outer(); // outer() executes and returns inner()
counter(); // 1 - count still accessible!
counter(); // 2 - count persists!
counter(); // 3 - closure maintains state
```

**What Happens Internally:**
1. `outer()` executes
2. `inner()` is returned
3. `outer()` is removed from call stack
4. **BUT** `count` is NOT destroyed
5. `inner()` maintains a reference to `count`
6. This preserved scope is called a **closure**

### Closure Characteristics

| Aspect | Description |
|--------|-------------|
| **Scope Preservation** | Outer variables remain accessible |
| **Privacy** | Creates private variables |
| **State Management** | Maintains state between function calls |
| **Memory** | Can cause memory leaks if not managed |

### Classic Closure Problem: Loop with setTimeout

```javascript
// ❌ Problem: var is function-scoped, all closures share same i
for (var i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 4, 4, 4 (all print final value)

// ✅ Solution 1: Use let (block-scoped)
for (let i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 1, 2, 3 (each iteration has own i)

// ✅ Solution 2: IIFE with var
for (var i = 1; i <= 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 1000);
    })(i);
}
// Output: 1, 2, 3 (IIFE creates new scope)
```

### Practical Closure Applications

#### 1. Data Privacy (Module Pattern)
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    
    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return "Insufficient funds";
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);              // 1500
// account.balance; // ❌ Cannot access private variable
```

#### 2. Function Factory
```javascript
function multiplyBy(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Lexical Scope Visualization

```javascript
let a = 10;

function outer() {
    let b = 20;
    
    return function inner() {
        let c = 30;
        console.log(a, b, c);
    };
}

const fn = outer();
fn(); // 10 20 30

/**
 * Scope Chain Lookup:
 * c → inner scope ✅
 * b → outer scope ✅ (via closure)
 * a → global scope ✅
 * 
 * ┌─────────────────────────────┐
 * │      Global Scope           │
 * │  a = 10                     │
 * │  outer = function()         │
 * └──────────▲──────────────────┘
 *            │
 *            │ [[Outer]]
 * ┌──────────────────────────────┐
 * │   outer() Lexical Scope      │
 * │   b = 20                     │
 * │   inner = function()         │
 * └──────────▲───────────────────┘
 *            │
 *            │ [[Outer]]
 * ┌──────────────────────────────┐
 * │   inner() Lexical Scope      │
 * │   c = 30                     │
 * └──────────────────────────────┘
 */
```

### Key Interview Points

✅ **Closures capture variables, not values**  
✅ **Every function in JavaScript forms a closure**  
✅ **Scope is determined at write-time, not run-time** (lexical scoping)  
✅ **Closures enable data privacy and encapsulation**  
✅ **Can cause memory leaks if not managed properly**  
✅ **Used extensively in callbacks, event handlers, and async code**

---

## 🔷 This Keyword

**Interview Definition:**
> `this` is not a variable but a runtime binding that references an object based on **how a function is invoked**, not where it's written. Its value is determined by the execution context.

### The 4 Rules of `this`

#### 1. **Default Binding (Global Context)**
```javascript
function showThis() {
    console.log(this);
}

showThis(); // Window (browser) or global (Node.js) in non-strict mode
            // undefined in strict mode
```

#### 2. **Implicit Binding (Method Call)**
```javascript
const person = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};

person.greet(); // "Alice" - this = person
```

#### 3. **Explicit Binding (call, apply, bind)**
```javascript
function greet() {
    console.log(`Hello, ${this.name}`);
}

const user = { name: "Bob" };

greet.call(user);  // "Hello, Bob"
greet.apply(user); // "Hello, Bob"

const boundGreet = greet.bind(user);
boundGreet(); // "Hello, Bob"
```

#### 4. **New Binding (Constructor)**
```javascript
function Person(name) {
    this.name = name;
}

const person = new Person("Charlie");
console.log(person.name); // "Charlie" - this = new object
```

### This with Classes

```javascript
class Car {
    constructor() {
        // Bind sayBye in constructor to lock 'this'
        this.sayBye = this.sayBye.bind(this);
    }
    
    sayHi() {
        console.log(`Hello from ${this.name}`);
    }
    
    sayBye() {
        console.log(`Bye from ${this.name}`);
    }
    
    get name() {
        return "Ferrari";
    }
}

class Bird {
    get name() {
        return "Tweety";
    }
}

const car = new Car();
const bird = new Bird();

// Unbound method - 'this' depends on caller
car.sayHi();           // "Hello from Ferrari"
bird.sayHi = car.sayHi;
bird.sayHi();          // "Hello from Tweety" (this = bird)

// Bound method - 'this' locked to original object
bird.sayBye = car.sayBye;
bird.sayBye();         // "Bye from Ferrari" (this = car)
```

### Arrow Functions and `this`

**Key Difference:**
> Arrow functions **don't have their own `this`**. They inherit `this` from the enclosing lexical scope.

```javascript
const obj = {
    name: "Object",
    regularFunction: function() {
        console.log(this.name); // this = obj
    },
    arrowFunction: () => {
        console.log(this.name); // this = outer scope (not obj)
    }
};

obj.regularFunction(); // "Object"
obj.arrowFunction();   // undefined (this !== obj)
```

### Key Interview Points

✅ **`this` is determined by HOW function is called**  
✅ **Arrow functions inherit `this` from outer scope**  
✅ **`bind()` creates permanently bound function**  
✅ **`call()` and `apply()` invoke immediately with custom `this`**  
✅ **In strict mode, default `this` is `undefined`**  
✅ **Class methods need binding when passed as callbacks**

---

## 🔷 Hoisting

**Interview Definition:**
> Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during the compilation phase (before code execution), while assignments remain in place.

### Execution Phases

**Phase 1: Creation (Memory Allocation)**
- Variables allocated memory
- Functions stored completely
- Scope determined

**Phase 2: Execution**
- Code runs line by line
- Variables get assigned values

### Hoisting Behavior Table

| Type | Hoisted | Initialized | TDZ | Example |
|------|---------|-------------|-----|---------|
| `var` | ✅ Yes | `undefined` | ❌ No | Can access before declaration |
| `let` | ✅ Yes | ❌ No | ✅ Yes | ReferenceError before declaration |
| `const` | ✅ Yes | ❌ No | ✅ Yes | ReferenceError before declaration |
| Function Declaration | ✅ Yes | ✅ Yes | ❌ No | Fully available |
| Function Expression | ⚠️ Partial | ❌ No | Depends | Treated as variable |
| Arrow Function | ⚠️ Partial | ❌ No | Depends | Treated as variable |
| Class | ✅ Yes | ❌ No | ✅ Yes | ReferenceError before declaration |

### Temporal Dead Zone (TDZ)

**Definition:** The period between entering scope and variable initialization where accessing the variable throws ReferenceError.

```javascript
// TDZ starts
console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
// TDZ continues
let x = 10;     // TDZ ends
console.log(x); // ✅ 10
```

### Hoisting Examples

#### var Hoisting
```javascript
console.log(a); // undefined (hoisted, initialized to undefined)
var a = 10;
console.log(a); // 10

// How JavaScript interprets it:
// var a;
// console.log(a); // undefined
// a = 10;
// console.log(a); // 10
```

#### let/const Hoisting
```javascript
// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // 20

// const behaves same as let
// console.log(c); // ❌ ReferenceError
const c = 30;
```

#### Function Hoisting
```javascript
// ✅ Function Declaration - Fully hoisted
sayHello(); // "Hello!" - Works!

function sayHello() {
    console.log("Hello!");
}

// ❌ Function Expression - Not hoisted
// sayBye(); // ❌ TypeError: sayBye is not a function

const sayBye = function() {
    console.log("Bye!");
};

// ❌ Arrow Function - Not hoisted
// greet(); // ❌ TypeError: greet is not a function

const greet = () => {
    console.log("Hi!");
};
```

#### Hoisting Priority
```javascript
foo(); // "I'm a function" - Function wins!

var foo = 10;

function foo() {
    console.log("I'm a function");
}

console.log(foo); // 10 - Variable assignment executed

/**
 * Priority Order:
 * 1. Function declarations hoisted first
 * 2. Variables hoisted but not initialized
 * 3. Execution: assignments happen
 */
```

### Key Interview Points

✅ **All declarations are hoisted, assignments are not**  
✅ **`var` hoisted with `undefined` initialization**  
✅ **`let`/`const` hoisted but in TDZ until initialization**  
✅ **Function declarations fully hoisted**  
✅ **Function expressions hoisted as variables**  
✅ **Classes hoisted but in TDZ**  
✅ **Function declarations take priority over variable declarations**

---

## 🔷 Higher-Order Functions

**Interview Definition:**
> A higher-order function is a function that either:
> 1. Takes one or more functions as arguments, OR
> 2. Returns a function as its result

### Benefits
- **Abstraction:** Hide complex implementation
- **Reusability:** Create generic, reusable functions
- **Composition:** Combine simple functions into complex ones
- **Functional Programming:** Enable FP patterns

### Common Built-in Higher-Order Functions

#### Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transforms each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - selects elements based on condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - reduces array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// forEach - executes function for each element
numbers.forEach(n => console.log(n)); // 1, 2, 3, 4, 5
```

### Custom Higher-Order Functions

#### Function that Takes Function
```javascript
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, (i) => console.log(`Iteration ${i}`));
// Iteration 0
// Iteration 1
// Iteration 2
```

#### Function that Returns Function
```javascript
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### Combination Example
```javascript
function executeOperation(operation) {
    return function(a) {
        return function(b) {
            return operation(a, b);
        };
    };
}

const add = executeOperation((a, b) => a + b);
const addFive = add(5);

console.log(addFive(10)); // 15
console.log(addFive(20)); // 25
```

### Practical Example
```javascript
// Nested function demonstrating scope and higher-order concepts
const num1 = 20;
const num2 = 3;
const name = "Chamakh";

function multiply() {
    return num1 * num2;
}

console.log(multiply()); // 60

function getScore() {
    const num1 = 2;  // Shadows outer num1
    const num2 = 3;  // Shadows outer num2
    
    function add() { // Nested function accessing outer variables
        return `${name} scored ${num1 + num2}`;
    }
    
    return add();
}

console.log(getScore()); // "Chamakh scored 5"
```

### Key Interview Points

✅ **HOF enables functional programming paradigm**  
✅ **Makes code more modular and reusable**  
✅ **Array methods (map, filter, reduce) are HOFs**  
✅ **Callbacks and event handlers use HOF pattern**  
✅ **Enables function composition and currying**  
✅ **Fundamental to React (hooks, components)**

---

## 🔷 Asynchronous JavaScript

### Callback Hell (Pyramid of Doom)

**Problem:**
> Callback hell occurs when multiple asynchronous operations are nested, creating deeply indented, hard-to-read, and difficult-to-maintain code.

```javascript
// ❌ Callback Hell Example
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                getMoreData(d, function(e) {
                    console.log(e);
                });
            });
        });
    });
});
```

**Solutions:**
1. **Promises:** Chain `.then()` calls
2. **Async/Await:** Write asynchronous code like synchronous
3. **Modularization:** Break into named functions

### Promise Methods

#### Promise.all()
```javascript
// Waits for ALL promises to resolve
// Rejects if ANY promise rejects

const promises = [
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

Promise.all(promises)
    .then(([user, posts, comments]) => {
        console.log('All data loaded');
    })
    .catch(error => {
        console.log('One promise failed:', error);
    });
```

#### Promise.allSettled()
```javascript
// Waits for ALL promises to complete (resolve OR reject)
// Never rejects, returns status of each promise

const promises = [
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach(result => {
            console.log(result.status); // 'fulfilled' or 'rejected'
        });
    });
```

#### Promise.race()
```javascript
// Returns result of FIRST promise to settle (resolve or reject)

const promises = [
    new Promise(resolve => setTimeout(() => resolve('slow'), 2000)),
    new Promise(resolve => setTimeout(() => resolve('fast'), 100))
];

Promise.race(promises)
    .then(result => console.log(result)); // 'fast'
```

#### Promise.any()
```javascript
// Returns FIRST promise to resolve
// Rejects only if ALL promises reject

const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success'),
    Promise.reject('Error 2')
];

Promise.any(promises)
    .then(result => console.log(result)); // 'Success'
```

### Key Interview Points

✅ **Callback hell makes code hard to maintain**  
✅ **Promises flatten nested callbacks**  
✅ **Async/await is syntactic sugar over Promises**  
✅ **`Promise.all()` fails fast on any rejection**  
✅ **`Promise.allSettled()` waits for all (never rejects)**  
✅ **`Promise.race()` returns first to settle**  
✅ **`Promise.any()` returns first to resolve**

---

## 🔷 Performance Optimization

### Throttling

**Interview Definition:**
> Throttling ensures a function executes **at most once** in a specified time interval, regardless of how many times the event fires. It's rate-limiting for function execution.

**Use Cases:**
- Window resizing
- Scroll events
- API rate limiting
- Game loop updates

```javascript
function throttle(func, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Usage
window.addEventListener('scroll', throttle(() => {
    console.log('Scroll event - throttled');
}, 1000)); // Executes at most once per second
```

### Debouncing

**Interview Definition:**
> Debouncing ensures a function executes only **after a specified delay** has passed since the last event. It waits for a "quiet period" before executing.

**Use Cases:**
- Search input (auto-suggest)
- Form validation
- Window resize (final size)
- Save draft functionality

```javascript
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Usage
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce((e) => {
    console.log('Searching for:', e.target.value);
}, 500)); // Waits 500ms after user stops typing
```

### Throttle vs Debounce

| Aspect | Throttle | Debounce |
|--------|----------|----------|
| **Execution** | Regular intervals | After quiet period |
| **Frequency** | Multiple times (limited rate) | Once at the end |
| **Use Case** | Scroll, mousemove | Search input, resize |
| **Behavior** | Executes during event stream | Executes after event stream |

### Key Interview Points

✅ **Throttle = rate limiting (execute periodically)**  
✅ **Debounce = wait for pause (execute once after delay)**  
✅ **Both prevent excessive function calls**  
✅ **Throttle: "Run at most every N ms"**  
✅ **Debounce: "Run N ms after last event"**  
✅ **Essential for performance optimization**

---

## 🔷 Advanced Concepts

### Generator Functions

**Interview Definition:**
> Generator functions are special functions that can pause and resume execution, maintaining their state between yields. They return an iterator object and are defined using `function*` syntax.

```javascript
function* numberGenerator() {
    console.log('Start');
    yield 1;
    console.log('After first yield');
    yield 2;
    console.log('After second yield');
    yield 3;
    console.log('End');
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Use Cases:**
- Lazy evaluation
- Infinite sequences
- Complex iteration logic
- Async flow control (before async/await)

### Variable Shadowing

**Interview Definition:**
> Variable shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope, effectively "hiding" the outer variable within the inner scope.

```javascript
let name = "Global";

function outer() {
    let name = "Outer";
    console.log(name); // "Outer" (shadows global)
    
    function inner() {
        let name = "Inner";
        console.log(name); // "Inner" (shadows outer)
    }
    
    inner();
    console.log(name); // "Outer"
}

outer();
console.log(name); // "Global"
```

---

## 🔷 Common Interview Questions

### 1. Explain the prototype chain in JavaScript
**Answer:** The prototype chain is a mechanism where objects inherit properties and methods from other objects. When accessing a property, JavaScript first looks on the object itself, then on its `__proto__` (which points to its constructor's prototype), and continues up the chain until reaching `Object.prototype`, which has `__proto__` as `null`.

### 2. What's the difference between call, apply, and bind?
**Answer:**
- **call:** Invokes function immediately with specified `this` and individual arguments
- **apply:** Invokes function immediately with specified `this` and array of arguments
- **bind:** Returns new function with permanently bound `this` (doesn't invoke)

### 3. How do closures help in creating private variables?
**Answer:** Closures allow inner functions to access outer function variables even after outer function completes. This creates a private scope where variables can't be accessed directly from outside, only through returned functions (module pattern).

### 4. When would you use throttle vs debounce?
**Answer:**
- **Throttle:** When you want regular updates during continuous events (scroll position tracking)
- **Debounce:** When you want to wait until user finishes action (search input, form validation)

### 5. What problems do Promises solve over callbacks?
**Answer:**
- Flatten nested callbacks (avoid callback hell)
- Better error handling with `.catch()`
- Chainable with `.then()`
- Combine multiple async operations with `Promise.all()`, etc.
- More readable and maintainable code

### 6. Explain hoisting with var, let, and const
**Answer:**
- **var:** Hoisted and initialized with `undefined`, accessible before declaration
- **let/const:** Hoisted but in Temporal Dead Zone, ReferenceError before declaration
- **Functions:** Declarations fully hoisted, expressions hoisted as variables

### 7. Why don't arrow functions have their own 'this'?
**Answer:** Arrow functions inherit `this` from their enclosing lexical scope. This makes them ideal for callbacks where you want to preserve the outer `this` context, avoiding the need for `.bind()` or storing `this` in a variable.

### 8. What's the difference between __proto__ and prototype?
**Answer:**
- **prototype:** Property on constructor functions, blueprint for instances
- **__proto__:** Internal link on all objects, points to constructor's prototype
- Example: `arr.__proto__ === Array.prototype`

---

## 📚 Additional Resources

### Best Practices
1. ✅ Use `const` by default, `let` when reassignment needed, avoid `var`
2. ✅ Prefer arrow functions for callbacks to preserve `this`
3. ✅ Use `async/await` over raw Promises for readability
4. ✅ Add methods to prototype, not constructor (memory efficiency)
5. ✅ Use throttle for continuous events, debounce for user input
6. ✅ Avoid deeply nested callbacks (callback hell)
7. ✅ Use `Object.create()` or `Object.setPrototypeOf()` for inheritance
8. ✅ Be cautious with closures to avoid memory leaks

### Common Pitfalls
1. ❌ Forgetting `this` binding in class methods passed as callbacks
2. ❌ Confusing `prototype` with `__proto__`
3. ❌ Accessing variables in TDZ
4. ❌ Creating functions inside loops without closures
5. ❌ Not understanding when `this` changes
6. ❌ Overusing throttle/debounce (adds complexity)

---

## 🎯 Interview Preparation Checklist

- [ ] Understand prototype chain and inheritance patterns
- [ ] Explain closures with practical examples
- [ ] Know all 4 rules of `this` binding
- [ ] Differentiate between hoisting behaviors
- [ ] Recognize and create higher-order functions
- [ ] Understand Promise methods and use cases
- [ ] Implement throttle and debounce from scratch
- [ ] Explain lexical scope and scope chain
- [ ] Know when to use var, let, and const
- [ ] Understand arrow functions vs regular functions

---

**Last Updated:** 2024
**Version:** 1.0

> 💡 **Pro Tip:** Practice explaining these concepts out loud as if teaching someone. The ability to articulate complex concepts simply is what distinguishes senior developers in interviews.
