// ============================================================
// FILE: 03-static-methods.js
// TOPIC: Static Methods, Static Properties, Factory Pattern
// ============================================================

// ----------------------------------------------------------
// Q1: STATIC METHODS LIVE ON THE CONSTRUCTOR, NOT THE PROTOTYPE
// ----------------------------------------------------------
// Predict the output of every console.log below before running.
// For each line that throws, explain WHY — what does the error tell
// you about where static methods live on the prototype chain?
// ----------------------------------------------------------

class MathUtils {
    static add(a, b) { return a + b; }
    static PI = 3.14159;

    square(n) { return n * n; }
}

// --- Predict before running ---
console.log(MathUtils.add(2, 3));          // satic mehod work
console.log(MathUtils.PI);                  // static property

const mu = new MathUtils();
//console.log(mu.add(2, 3));              // Errpr
console.log(mu.square(4));                // noraml 
//console.log(mu.PI);                     // undefiend

// Where does `add` actually live?
console.log(typeof MathUtils.prototype.constructor.add);           // undefiend || lives in constructor
console.log(MathUtils.hasOwnProperty("add"));          // true
console.log(MathUtils.prototype.hasOwnProperty("add")); // false

// Static methods ARE on the constructor object itself:
console.log(Object.getOwnPropertyNames(MathUtils));
console.log(Object.getOwnPropertyNames(MathUtils.prototype));


// ----------------------------------------------------------
// Q2: STATIC INHERITANCE — STATICS ARE ALSO INHERITED
// ----------------------------------------------------------
// This is one thing that class syntax gives you that raw
// constructor functions do NOT automatically do.
//
// Part A: Run the code and note that Child.create() works.
// Part B: Replicate the same behavior using constructor functions
//         WITHOUT using class syntax. You'll need to manually
//         link the constructor-side prototype chain too.
// Part C: Explain what Object.getPrototypeOf(Child) returns
//         and why that differs from Object.getPrototypeOf(Child.prototype).
// ----------------------------------------------------------

class Base {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        return new this(value);  // note: `this` here is the class itself
    }
    static describe() {
        return `I am ${this.name}`;  // this.name = class name string
    }
}

class Child extends Base {
    double() {
        return this.value * 2;
    }
}

const b = Base.create(10);
const ch = Child.create(5);  // static method inherited!

console.log(b.value);          // 10
console.log(ch.value);         // 5
console.log(ch.double());      // 10
console.log(Child.describe()); // "I am Child" — `this` is Child, not Base

// The static side chain:
console.log(Object.getPrototypeOf(Child) === Base);             // true
console.log(Object.getPrototypeOf(Child.prototype) === Base.prototype); // true

// Part B — constructor function replication of static inheritance

function BaseFn(value) {
    this.value = value;
}
BaseFn.create = function (value) {
    return new this(value);   // `this` = whatever function called .create()
};
BaseFn.describe = function () {
    return `I am ${this.name}`;
};

function ChildFn(value) {
    BaseFn.call(this, value);  // inherit instance properties
}

// Link INSTANCE chain (ChildFn instances inherit BaseFn.prototype methods)
Object.setPrototypeOf(ChildFn.prototype, BaseFn.prototype);

// Link STATIC chain (ChildFn itself inherits BaseFn's static methods)
// This is what `class Child extends Base` does automatically.
Object.setPrototypeOf(ChildFn, BaseFn);

ChildFn.prototype.double = function () { return this.value * 2; };

const bFn  = BaseFn.create(10);
const chFn = ChildFn.create(5);   // static inherited via constructor chain

console.log(bFn.value);           // 10
console.log(chFn.value);          // 5
console.log(chFn.double());       // 10
console.log(ChildFn.describe());  // "I am ChildFn"

// Part C explanation:
// Object.getPrototypeOf(Child)          → Base       (constructor-side chain, for statics)
// Object.getPrototypeOf(Child.prototype)→ Base.prototype (instance-side chain, for methods)
// They are completely separate chains.
console.log(Object.getPrototypeOf(ChildFn) === BaseFn);                    // true
console.log(Object.getPrototypeOf(ChildFn.prototype) === BaseFn.prototype); // true


// ----------------------------------------------------------
// Q3: FACTORY METHOD PATTERN WITH STATIC
// ----------------------------------------------------------
// Implement a Temperature class with:
//   - Private field #celsius
//   - Static factory: Temperature.fromFahrenheit(f)
//   - Static factory: Temperature.fromKelvin(k)
//   - Instance getter: fahrenheit, kelvin, celsius
//   - Instance method: toString() → "23.00°C / 73.40°F / 296.15K"
//
// No direct `new Temperature(value)` call should be needed by consumers —
// all creation goes through the static factories.
//
// Formulas:
//   F = C * 9/5 + 32
//   K = C + 273.15
// ----------------------------------------------------------

class Temperature {
    #celsius;
    
    constructor(celsius) {
        this.#celsius = celsius;
    }

    static fromFahrenheit(f) { return new Temperature((f-32)*5/9) }
    static fromKelvin(k)     { return new Temperature(k-273.15) }

    get celsius()     { return this.#celsius }
    get fahrenheit()  { return this.#celsius*9/5+32 }
    get kelvin()      { return this.#celsius+273.15 }

    toString() { return `${this.celsius.toFixed(2)}°C / ${this.fahrenheit.toFixed(2)}°F / ${this.kelvin.toFixed(2)}K`; }
}

// Expected:
const t1 = Temperature.fromFahrenheit(98.6);
console.log(t1.celsius.toFixed(2));    // "37.00"
console.log(t1.toString());            // "37.00°C / 98.60°F / 310.15K"

const t2 = Temperature.fromKelvin(0);
console.log(t2.celsius.toFixed(2));    // "-273.15"
