// ============================================================
// FILE: 08-advanced-patterns.js
// TOPIC: Abstract Classes, Polymorphism, Symbol, toString,
//        new.target, Method Overriding
// ============================================================

// ----------------------------------------------------------
// Q1: SIMULATING ABSTRACT CLASSES WITH new.target
// ----------------------------------------------------------
// JavaScript has no `abstract` keyword. But `new.target` inside
// a constructor tells you WHICH class was `new`-ed.
// If new.target === AbstractBase, the user tried to instantiate
// the abstract class directly — throw!
//
// YOUR TASK:
//   1. Understand how new.target works in the code below.
//   2. Implement the abstract method requirement:
//      if a subclass doesn't override `area()`, the base call
//      should throw a "must implement area()" error.
//   3. Add a concrete method `describe()` in the base that calls
//      this.area() — demonstrating template method pattern.
// ----------------------------------------------------------

class Shape {
    constructor(color) {
        if (new.target === Shape) {
            throw new Error("Shape is abstract — cannot instantiate directly");
        }
        this.color = color;
    }

    // Abstract method simulation
    area() {
        throw new Error(`${this.constructor.name} must implement area()`);
    }

    // Template method — uses abstract area()
    describe() {
        return `A ${this.color} ${this.constructor.name} with area ${this.area().toFixed(2)}`;
    }
}

class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    area() { return this.width * this.height; }
}

class CircleShape extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    // YOUR TASK: implement area()
}

// Test abstract guard:
try {
    const s = new Shape("red");
} catch (e) {
    console.log(e.message);  // "Shape is abstract — cannot instantiate directly"
}

const rect = new Rectangle("blue", 4, 5);
console.log(rect.describe());   // "A blue Rectangle with area 20.00"

// const circ = new CircleShape("green", 7);
// console.log(circ.describe()); // "A green CircleShape with area 153.94"

// Polymorphism — same interface, different behavior:
const shapes = [
    new Rectangle("red", 3, 4),
    // new CircleShape("blue", 5),
];
shapes.forEach(s => console.log(s.describe()));


// ----------------------------------------------------------
// Q2: SYMBOL.ITERATOR AND SYMBOL.TOPRIMITIVE ON CLASSES
// ----------------------------------------------------------
// Classes can define well-known Symbol behaviors to integrate
// with built-in JS operations (for...of, template literals, math).
//
// YOUR TASK:
//   Implement a Range class where:
//   - new Range(start, end, step = 1) creates an inclusive range
//   - It is iterable: for...of should yield each value
//   - [Symbol.toPrimitive](hint) converts it to:
//       "number" → end - start (span)
//       "string" → "Range(1..10)"
//       "default" → same as "number"
//   - .length getter returns number of steps
// ----------------------------------------------------------

// class Range {
//     constructor(start, end, step = 1) { ... }
//
//     get length() { ... }
//
//     [Symbol.iterator]() {
//         // must return an iterator: { next() { return {value, done} } }
//     }
//
//     [Symbol.toPrimitive](hint) { ... }
// }

// Expected:
// const r = new Range(1, 5);
// console.log([...r]);          // [1, 2, 3, 4, 5]
// for (const n of r) process.stdout.write(n + " ");  // 1 2 3 4 5

// const r2 = new Range(0, 10, 2);
// console.log([...r2]);         // [0, 2, 4, 6, 8, 10]
// console.log(r2.length);       // 6

// console.log(`${r}`);          // "Range(1..5)"
// console.log(r + 10);          // 14  (5 - 1 = 4, + 10 = 14)
// console.log(r > 3);           // true  (span 4 > 3)


// ----------------------------------------------------------
// Q3: CUSTOM toString, valueOf, and Symbol.hasInstance
// ----------------------------------------------------------
// This question ties together class customization hooks.
//
// Part A: Make `console.log(new Vector(1,2))` print "Vector(1, 2)"
//         instead of "Vector { x: 1, y: 2 }" — hint: override toString
//         AND Symbol.for("nodejs.util.inspect.custom")
//
// Part B: Make arithmetic operators work via valueOf:
//         new Vector(1,2) + new Vector(3,4) → ??? (explain the result)
//
// Part C: Override Symbol.hasInstance so that any object with
//         numeric x and y properties is considered a Vector:
//         { x: 1, y: 2 } instanceof Vector → true
// ----------------------------------------------------------

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    toString() {
        return `Vector(${this.x}, ${this.y})`;
    }

    valueOf() {
        // Returning magnitude lets you use vectors in numeric context
        return this.magnitude();
    }

    // Node.js inspect hook — controls how console.log renders this
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.toString();
    }

    static [Symbol.hasInstance](instance) {
        // YOUR TASK Part C: return true if instance has numeric x and y
        return instance instanceof Vector ||
            (typeof instance?.x === "number" && typeof instance?.y === "number");
    }
}

const v1 = new Vector(3, 4);
const v2 = new Vector(1, 2);

console.log(v1.toString());          // "Vector(3, 4)"
console.log(`position: ${v1}`);      // "position: Vector(3, 4)"
console.log(v1 + 0);                 // 5  — magnitude via valueOf
console.log(v1 > v2);                // true (5 > 2.236...)
console.log(v1.add(v2).toString());  // "Vector(4, 6)"

// Part C:
console.log(v1 instanceof Vector);          // true (normal)
console.log({ x: 1, y: 2 } instanceof Vector); // true — custom hasInstance!
console.log({ x: 1, z: 2 } instanceof Vector); // false — no y
