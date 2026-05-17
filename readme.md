Generator functions are stateful functions that can pause and resume execution.
They solve a very specific problem: controlled, incremental computation.

Throttle ensures a function is executed at most once in a specified time interval, no matter how many times the event fires.

Debounce ensures a function executes only after a specified delay has passed since the last event.

mapLimit processes a list of items using an async function, ensuring that no more than a fixed number of promises run concurrently, while preserving result order.

Variable shadowing happens when a variable declared in an inner scope has the same name as a variable in an outer scope.

A higher-order function is a function that takes one or more functions as arguments, or returns a function.

Callback hell occurs when multiple asynchronous callbacks are nested inside each other, making code hard to read, maintain, and debug.

It’s also called the Pyramid of Doom.

this is not a variable.
It’s a runtime binding that points to an object based on how a function is called, not where it’s written.


In JavaScript, a prototype is a built-in mechanism that allows objects to inherit properties and methods from other objects.

`prototype`
→ the object where shared properties and methods are defined for instances created by a constructor.

`__proto__`
→ the internal lookup link an object uses to reach its prototype when a property is not found on itself.

Every Object have Prototype and it instance have `__proto__` which points to it prototype.
For Methods it have both proto and prototype
for eg
Array prototype has leght property when we create instance for array it will access through its proto

Prototype chaining is the process where JavaScript looks for a property on an object, then on its prototype, then on that prototype’s prototype, until the property is found or the chain ends.