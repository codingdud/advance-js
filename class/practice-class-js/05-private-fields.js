// ============================================================
// FILE: 05-private-fields.js
// TOPIC: Private Fields (#), Private Methods, Encapsulation
// ============================================================

// ----------------------------------------------------------
// Q1: PRIVATE FIELDS vs CLOSURE vs _CONVENTION
// ----------------------------------------------------------
// Three approaches to "private" data. Run each, then answer:
//   a) Which one truly prevents external access?
//   b) Which one leaks through JSON.stringify?
//   c) Which one causes problems with inheritance (test in Q below)?
//   d) Which approach uses the most memory per instance, and why?
// ----------------------------------------------------------

// Approach 1: convention (_name) — not actually private
class PersonA {
    constructor(name, ssn) {
        this.name = name;
        this._ssn = ssn;       // just a convention, fully accessible
    }
    getSSN() { return this._ssn; }
}

// Approach 2: closure (WeakMap) — truly private, old pattern
const _privateB = new WeakMap();
class PersonB {
    constructor(name, ssn) {
        this.name = name;
        _privateB.set(this, { ssn });
    }
    getSSN() { return _privateB.get(this).ssn; }
}

// Approach 3: class private fields — truly private, modern
class PersonC {
    #ssn;
    constructor(name, ssn) {
        this.name = name;
        this.#ssn = ssn;
    }
    getSSN() { return this.#ssn; }
}

const a = new PersonA("Alice", "123-45-6789");
const b = new PersonB("Alice", "123-45-6789");
const c = new PersonC("Alice", "123-45-6789");

console.log(a._ssn);          // "123-45-6789" — exposed
// console.log(b._ssn);       // undefined
// console.log(c.#ssn);       // SyntaxError at parse time — hard block

console.log(JSON.stringify(a));  // {"name":"Alice","_ssn":"123-45-6789"} — leaks!
console.log(JSON.stringify(b));  // {"name":"Alice"} — safe
console.log(JSON.stringify(c));  // {"name":"Alice"} — safe

// Inheritance problem with #private:
class EmployeeC extends PersonC {
    greetWithSSN() {
        // Can EmployeeC access this.#ssn? Try it and explain the error.
        // return `${this.name}: ${this.#ssn}`;  // SyntaxError
        return `${this.name}: ${this.getSSN()}`; // Must go through parent method
    }
}
const ec = new EmployeeC("Bob", "999-00-1234");
console.log(ec.greetWithSSN());  // "Bob: 999-00-1234"


// ----------------------------------------------------------
// Q2: PRIVATE METHODS AND STATIC PRIVATE
// ----------------------------------------------------------
// Implement a Counter class with:
//   - Private field #count (starts at 0)
//   - Private field #step (default 1, set via constructor)
//   - Private method #validate(n): throws RangeError if n < 0
//   - Public method increment(n = 1): calls #validate, then adds n * #step
//   - Public method decrement(n = 1): calls #validate, then subtracts n * #step
//   - Public getter value
//   - Static private field #instances = 0 (incremented in constructor)
//   - Static method Counter.instanceCount() returns #instances
//
// The key learning: private methods are NOT on the prototype.
// They are stored per-instance (similar to how # fields work).
// ----------------------------------------------------------

class Counter {
    #count = 0;
    #step;
    static #instances = 0;

    constructor(step = 1) { 
        this.#step = step;
        Counter.#instances++;
     }

    #validate(n) { if (n < 0) throw new RangeError(`step count must be >= 0, got ${n}`); }

    increment(n = 1) {
        this.#validate(n);
        this.#count += n * this.#step;
    }
    decrement(n = 1) {
        this.#validate(n);
        this.#count -= n * this.#step;
    }

    get value() { return this.#count }

    static instanceCount() { return Counter.#instances }
}

// Expected:
const c1 = new Counter();
const c2 = new Counter(5);

c1.increment();       // +1*1 = 1
c1.increment(3);      // +3*1 = 4
c2.increment(2);      // +2*5 = 10
c2.decrement(1);      // -1*5 = 5

console.log(c1.value);  // 4
console.log(c2.value);  // 5
console.log(Counter.instanceCount());  // 2

try { c1.increment(-1); } catch(e) { console.log(e.message); }  // RangeError


// ----------------------------------------------------------
// Q3: PRIVATE FIELDS ARE PER-CLASS, NOT PER-INSTANCE PAIR
// ----------------------------------------------------------
// This question explores a subtle behavior: a private field
// defined in class X can be read from ANY instance of X,
// even inside a static method or when passed as an argument.
//
// Implement an Equals mixin that compares two instances by
// their private id field. The private field is accessible
// because the comparison method is defined INSIDE the same class.
// ----------------------------------------------------------

class Entity {
    #id;

    constructor(id) {
        this.#id = id;
    }

    equals(other) {
        // `other` is also an Entity instance.
        // Can we access other.#id here? YES — because we are inside Entity.
        // This is the "brand check" pattern.
        return this.#id === other.#id;
    }

    static isSameEntity(a, b) {
        // static method, but still inside Entity — can access #id
        return a.#id === b.#id;
    }

    // Brand check: is `obj` genuinely an Entity (has the #id field)?
    static isEntity(obj) {
        try {
            obj.#id;  // throws if obj doesn't have this private field
            return true;
        } catch {
            return false;
        }
    }
}

const e1 = new Entity(1);
const e2 = new Entity(1);
const e3 = new Entity(2);

console.log(e1.equals(e2));                  // true
console.log(e1.equals(e3));                  // false
console.log(Entity.isSameEntity(e1, e2));    // true
console.log(Entity.isEntity(e1));            // true
console.log(Entity.isEntity({ id: 1 }));     // false — brand check fails
