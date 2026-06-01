// ============================================================
// FILE: 07-mixins.js
// TOPIC: Mixins — Composing Behavior Without Deep Inheritance
// ============================================================

// JavaScript has single inheritance. Mixins let you compose
// behavior from multiple sources without the diamond problem.

// ----------------------------------------------------------
// Q1: BASIC MIXIN PATTERN — Object.assign to prototype
// ----------------------------------------------------------
// The problem: Dog needs to Swim AND Fly (hypothetically).
// You can't extend two classes. Use mixins.
//
// YOUR TASK:
//   1. Complete the Swimmable and Flyable mixin objects below.
//   2. Apply them to FlyingFish using Object.assign.
//   3. Answer: do mixin methods land on FlyingFish.prototype or
//      on the instance? Are they enumerable?
// ----------------------------------------------------------

const Swimmable = {
    swim() {
        return `${this.name} is swimming`;
    },
    diveDepth(meters) {
        return `${this.name} dives ${meters}m deep`;
    },
};

const Flyable = {
    fly() {
        return `${this.name} is flying`;
    },
    soar(altitude) {
        return `${this.name} soars at ${altitude}m`;
    },
};

class Animal {
    constructor(name) {
        this.name = name;
    }
}

class FlyingFish extends Animal {}

// YOUR TASK: Copy mixin methods onto FlyingFish.prototype
Object.assign(FlyingFish.prototype, Swimmable, Flyable);
    
// Expected:
const ff = new FlyingFish("Nemo");
console.log(ff.swim());          // "Nemo is swimming"
console.log(ff.fly());           // "Nemo is flying"
console.log(ff instanceof Animal); // true

// Are the mixin methods enumerable?
// console.log(
//     Object.getOwnPropertyDescriptor(FlyingFish.prototype, "swim").enumerable
// );
// Compare to a class method — what's the difference?


// ----------------------------------------------------------
// Q2: FUNCTIONAL MIXIN (HIGHER-ORDER) — THE BETTER PATTERN
// ----------------------------------------------------------
// Object.assign mixins have a flaw: they are shared objects.
// If two classes use the same mixin and one mutates the mixin
// object, both are affected.
//
// Functional mixins return a NEW class with the behavior baked in.
// They also support `super` properly.
//
// Study this pattern, then implement the Serializable mixin below.
// ----------------------------------------------------------

// Pattern: a function that takes a Base class and returns an extended class
const Timestamped = (Base) => class extends Base {
    constructor(...args) {
        super(...args);
        this.createdAt = new Date().toISOString();
    }
    age() {
        return `Created at ${this.createdAt}`;
    }
};

const Activatable = (Base) => class extends Base {
    #active = false;
    activate()   { this.#active = true; }
    deactivate() { this.#active = false; }
    get isActive() { return this.#active; }
};

class User {
    constructor(name) { this.name = name; }
    toString() { return `User(${this.name})`; }
}

// Compose: User + Timestamped + Activatable
const TimestampedActivatableUser = Activatable(Timestamped(User));

const u = new TimestampedActivatableUser("Alice");
u.activate();

console.log(u.toString());   // "User(Alice)"
console.log(u.isActive);     // true
console.log(u.age());        // "Created at 2024-..."
console.log(u instanceof User); // true

// YOUR TASK: implement a Serializable mixin:
//   - toJSON(): returns a plain object of all OWN enumerable properties
//   - static fromJSON(data, ...constructorArgs): creates a new instance
//     and assigns all keys from data onto it
//   - serialize(): returns JSON.stringify of toJSON()

// const Serializable = (Base) => class extends Base {
//     toJSON() { ... }
//     static fromJSON(data) { ... }
//     serialize() { ... }
// };

// Expected:
// class Product extends Serializable(class { constructor(id){this.id=id;} }) {
//     constructor(id, name, price) {
//         super(id);
//         this.name = name;
//         this.price = price;
//     }
// }
// const p = new Product(1, "Laptop", 999);
// console.log(p.serialize());
// → '{"id":1,"name":"Laptop","price":999}'


// ----------------------------------------------------------
// Q3: MIXIN COLLISION — METHOD NAME CONFLICTS
// ----------------------------------------------------------
// When two mixins define the same method name, the last one wins
// (with Object.assign). This is silent and dangerous.
//
// YOUR TASK:
//   1. Run the code and observe which `log` method wins.
//   2. Write a safeMixin function that throws if a collision is detected.
//   3. Write a chainedMixin function that instead chains both log()
//      implementations so both run in order.
// ----------------------------------------------------------

const LoggerA = {
    log(msg) { console.log(`[A] ${msg}`); },
    id: "A",
};

const LoggerB = {
    log(msg) { console.log(`[B] ${msg}`); },  // collides with LoggerA.log
    id: "B",
};

class Service {}

// Silent collision:
Object.assign(Service.prototype, LoggerA, LoggerB);

const svc = new Service();
svc.log("hello");   // only [B] logs — [A] is silently overwritten

// YOUR TASK 1: safeMixin(target, ...mixins) — throws on collision
// function safeMixin(target, ...mixins) { ... }

// YOUR TASK 2: chainedMixin(target, ...mixins) — chains same-name methods
// function chainedMixin(target, ...mixins) { ... }
// After chainedMixin, svc.log("hello") should print BOTH [A] and [B]
