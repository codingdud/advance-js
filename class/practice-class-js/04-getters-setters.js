// ============================================================
// FILE: 04-getters-setters.js
// TOPIC: Getters, Setters, and Computed / Lazy Properties
// ============================================================

// ----------------------------------------------------------
// Q1: GETTER/SETTER vs PLAIN PROPERTY — WHERE THEY LIVE
// ----------------------------------------------------------
// Run the code and answer the questions in comments.
// Then fix the BankAccount class so the balance setter
// throws a RangeError when a negative deposit is attempted.
// ----------------------------------------------------------

class BankAccount {
    #balance = 0;

    constructor(owner, initialDeposit) {
        this.owner = owner;
        this.deposit(initialDeposit);
    }

    get balance() {
        return this.#balance;
    }

    set balance(amount) {
        if (amount < 0) throw new RangeError(`Balance cannot be negative, got ${amount}`);
        this.#balance = amount;
    }

    deposit(amount) {
        this.balance = this.#balance + amount;
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Insufficient funds");
        this.balance = this.#balance - amount;
    }
}

const acc = new BankAccount("Alice", 1000);
console.log(acc.balance);   // 1000

acc.deposit(500);
console.log(acc.balance);   // 1500

acc.withdraw(200);
console.log(acc.balance);   // 1300

// Where does `balance` getter/setter live?
const descriptor = Object.getOwnPropertyDescriptors(BankAccount.prototype);
console.log(descriptor);
// → { get: [Function], set: [Function], enumerable: false, configurable: true }
// Note: it's on the PROTOTYPE, not on the instance — like a method.

// Does `balance` show up on the instance?
console.log(Object.getOwnPropertyNames(acc));  // ["owner"] — no `balance`!

// Can you accidentally shadow the getter by assigning directly?
// acc.balance = 500;  // calls the setter ✓
// acc["balance"] = 500; // also calls the setter ✓


// ----------------------------------------------------------
// Q2: LAZY / MEMOIZED GETTER
// ----------------------------------------------------------
// A getter that runs every time can be expensive if the computation
// is heavy. Implement a lazy getter: compute once, cache the result
// on the INSTANCE (not the prototype), so the getter is never called
// again for that instance.
//
// Pattern:
//   get expensiveValue() {
//       const result = <expensive computation>;
//       Object.defineProperty(this, "expensiveValue", { value: result, writable: false });
//       return result;
//   }
//
// YOUR TASK:
// Implement class Circle with:
//   - constructor(radius)
//   - lazy getter `area` — compute Math.PI * r^2, cache on instance
//   - lazy getter `circumference` — compute 2 * Math.PI * r, cache on instance
//
// After the first access, the instance property SHADOWS the prototype getter.
// Verify this with Object.getOwnPropertyNames(circle).
// ----------------------------------------------------------

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        const result = Math.PI * this.radius ** 2;
        // Cache on the instance — shadows this prototype getter forever after
        Object.defineProperty(this, "area", { value: result, writable: false, configurable: false });
        return result;
    }

    get circumference() {
        const result = 2 * Math.PI * this.radius;
        Object.defineProperty(this, "circumference", { value: result, writable: false, configurable: false });
        return result;
    }
}

const c = new Circle(5);
console.log(Object.getOwnPropertyNames(c));    // ["radius"]  — no area yet
console.log(c.area.toFixed(4));                // "78.5398"
console.log(c.circumference.toFixed(4));       // "31.4159"
console.log(Object.getOwnPropertyNames(c));    // ["radius", "area", "circumference"] — cached
console.log(c.area.toFixed(4));                // "78.5398" — served from instance, getter never called again


// ----------------------------------------------------------
// Q3: GETTER/SETTER IN INHERITANCE — OVERRIDING AND SUPER
// ----------------------------------------------------------
// The code below has a subtle bug in the setter.
// Run it, trace the stack overflow, and fix it.
// Then explain WHY the infinite loop happens.
// ----------------------------------------------------------

class Shape {
    constructor(color) {
        this.color = color;   // goes through the setter — applies toLowerCase + validation
    }

    get color() {
        return this.__color;
    }

    set color(value) {
        if (typeof value !== "string") throw new TypeError("Color must be a string");
        this.__color = value.toLowerCase();
    }
}

class Circle2 extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }

    // Override the getter to prefix with shape type
    get color() {
        return `circle-${super.color}`;
        //               ^ accessing parent getter via super
    }
    set color(value){
        super.color=value;
    }
    // YOUR TASK: There is no setter override here.
    // Try: const c2 = new Circle2("Red", 5);
    // What happens? Why?
    // Fix it by adding a set color(value) that calls the parent setter.
}

// Uncomment to test (may throw — find out why):
const c2 = new Circle2("Red", 5);
console.log(c2.color);   // should be "circle-red"
c2.color="blue"
console.log(c2.color)

// KEY RULE: In JS, if you define a getter on a class WITHOUT a paired setter,
// the setter from the parent class is NOT automatically inherited for that property.
// You must explicitly re-declare it.
