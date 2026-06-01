// ============================================================
// FILE: 01-class-vs-constructor.js
// TOPIC: Class is Syntactic Sugar over Constructor Functions
// ============================================================

// ----------------------------------------------------------
// Q1: PROVE THEY ARE THE SAME UNDER THE HOOD
// ----------------------------------------------------------
// Below is a constructor function. Write the equivalent CLASS
// version. Then run the assertions to prove they produce an
// identical prototype structure.
//
// After writing the class, answer in comments:
//   a) What is typeof Person (constructor) vs typeof PersonClass?
//   b) Is Person.prototype.greet the same kind of thing in both?
//   c) Can you call PersonClass() without `new`? Why/why not?
// ----------------------------------------------------------

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.greet = function () {
    return `Hello, I am ${this.name}, age ${this.age}`;
};

// YOUR TASK: Write class PersonClass here that mirrors Person exactly
class PersonClass { 
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        return `Hello, I am ${this.name}, age ${this.age}`;
    }
 }


// --- Assertions ---
const p1 = new Person("Aniket", 27);
const p2 = new PersonClass("Animesh", 26);

console.log(p1.greet()); // "Hello, I am Aniket, age 27"
console.log(p2.greet()); // "Hello, I am Animesh, age 26"

// KEY: both are "function" — class is NOT a new type, it is a function
console.log(typeof Person);       // "function"
console.log(typeof PersonClass);  // "function"

// prototype shape is identical
console.log(Object.getOwnPropertyNames(Person.prototype));      // ["constructor", "greet"]
console.log(Object.getOwnPropertyNames(PersonClass.prototype)); // ["constructor", "greet"]

// constructor back-reference is intact in both
console.log(Person.prototype.constructor === Person);           // true
console.log(PersonClass.prototype.constructor === PersonClass); // true

// p1.greet and p2.greet are NOT the same reference (different prototype objects)
// but they behave identically
console.log(p1.greet === p2.greet); // false — different prototype objects

// DIFFERENCE: class enforces `new`, constructor function does not
try {
    PersonClass("Bob", 20); // TypeError: Class constructor cannot be invoked without 'new'
} catch (e) {
    console.log(e.message);
}
// Person("Bob", 20);  // would silently pollute globalThis.name / globalThis.age in non-strict mode


// ----------------------------------------------------------
// Q2: ENUMERABLE DIFFERENCE — A HIDDEN GOTCHA
// ----------------------------------------------------------
// Run this code and explain WHY the outputs differ.
// This reveals one real behavioral difference between
// constructor functions and classes.
//
// Then fix the constructor function version so it matches
// class behavior (hint: Object.defineProperty).
// ----------------------------------------------------------

function Animal(type) {
    this.type = type;
}
Animal.prototype.speak = function () {
    return `${this.type} speaks`;
};

class AnimalClass {
    constructor(type) {
        this.type = type;
    }
    speak() {
        return `${this.type} speaks`;
    }
}

// const a1 = new Animal("Dog");
// const a2 = new AnimalClass("Dog");

// // What does each log, and WHY are they different?
// for (let key in a1) console.log("Animal for-in:", key);
// for (let key in a2) console.log("AnimalClass for-in:", key);

// // Check enumerability directly
// console.log(Object.getOwnPropertyDescriptors(Animal.prototype).speak.enumerable)
// console.log(Object.getOwnPropertyDescriptors(AnimalClass.prototype).speak.enumerable)



// FIX: Redefine Animal.prototype.speak as non-enumerable using Object.defineProperty
Object.defineProperty(Animal.prototype, "speak", {
    value: function () { return `${this.type} speaks`; },
    enumerable: false,    // <-- matches class behavior
    writable: true,
    configurable: true,
});

// Now for-in on Animal instance will also skip `speak`
const a3 = new Animal("Cat");
for (let key in a3) console.log("After fix, Animal for-in:", key); // only "type" — no "speak"


// ----------------------------------------------------------
// Q3: THE CONSTRUCTOR PROPERTY TRAP
// ----------------------------------------------------------
// The code below breaks `instanceof` silently. Find the bug,
// explain why it happens, and fix it TWO ways:
//   Fix A: the old-school way (reset .constructor manually)
//   Fix B: rewrite using class syntax where this bug cannot occur
// ----------------------------------------------------------

function Vehicle(make) {
    this.make = make;
}

// A common mistake when setting up inheritance:
Vehicle.prototype = {
    describe() {
        return `Vehicle: ${this.make}`;
    },
};
Vehicle.prototype.constructor=Vehicle
// problem is that we erasing the constrction present here

const car = new Vehicle("Toyota");

console.log(car instanceof Vehicle);          // true
console.log(car.constructor === Vehicle);      // true
console.log(Vehicle.prototype.constructor);    // what is this?

// WHY the bug happens:
// Vehicle.prototype = { ... }  replaces the whole prototype object.
// The new object is a plain object literal whose .constructor is Object, not Vehicle.
// instanceof still works (it checks the prototype chain), but .constructor is wrong.

// Fix B — class version: constructor property is set automatically, can never be lost
class VehicleClass {
    constructor(make) {
        this.make = make;
    }
    describe() {
        return `Vehicle: ${this.make}`;
    }
}

const car2 = new VehicleClass("Honda");
console.log(car2 instanceof VehicleClass);         // true
console.log(car2.constructor === VehicleClass);    // true  — automatic, no manual fix needed
console.log(VehicleClass.prototype.constructor);   // [class VehicleClass]
