//👉 Inner function + outer function’s variables = Closure
/*
✔ inner() can access a
✔ Scope is decided by where code is written, not where it’s called

What’s happening internally?
outer() executes
inner() is returned
outer() is removed from call stack
BUT count is not destroyed
inner() keeps a reference to count
➡️ This preserved scope is called a closure
*/
//var is function-scoped
//All closures share same i
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
//Each iteration gets a new block scope
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
//Closures can cause memory leaks if not handled properly.
/*
| Concept | Meaning                        |
| ------- | ------------------------------ |
| Scope   | Where variables are accessible |
| Closure | Function + preserved scope     |
.

🔟 Key Rules to Remember

✔ Every function in JS forms a closure
✔ Closures capture variables, not values
✔ Used for privacy, state, and callbacks
✔ Powerful but can cause memory leaks
*/
let a = 10;

function outer() {
  let b = 20;

  return function inner() {
    let c = 30;
    console.log(a, b, c);
  };
}

const fn = outer();
fn();

/**
c → inner scope ✅
b → outer scope ✅
a → global scope ✅

┌─────────────────────────────────────┐
│           Global Scope              │
│─────────────────────────────────────│
│ a = 10                              │
│ outer = function()                  │
│ fn = inner()                        │
│ [[Outer]] → null                    │
└───────────────▲─────────────────────┘
                │
                │
┌─────────────────────────────────────┐
│        outer() Lexical Scope        │
│─────────────────────────────────────│
│ b = 20                              │
│ inner = function()                  │
│ [[Outer]] → Global Scope            │
└───────────────▲─────────────────────┘
                │
                │
┌─────────────────────────────────────┐
│        inner() Lexical Scope        │
│─────────────────────────────────────│
│ c = 30                              │
│ [[Outer]] → outer() Scope           │
└─────────────────────────────────────┘

 */
