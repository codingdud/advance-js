// ============================================================
// FILE: 06-prototype-chain-deep.js
// TOPIC: Prototype Chain Mechanics, hasOwnProperty, Object.create
// ============================================================

// ----------------------------------------------------------
// Q1: DRAW THE FULL PROTOTYPE CHAIN — BOTH SIDES
// ----------------------------------------------------------
// Every JS class has TWO prototype chains:
//   1. Instance side:  instance → Class.prototype → ParentClass.prototype → Object.prototype → null
//   2. Constructor side: Class → ParentClass → Function.prototype → Object.prototype → null
//
// For the hierarchy below, fill in every link in both chains.
// Verify each with Object.getPrototypeOf().
// ----------------------------------------------------------

class Animal {
    constructor(name) { this.name = name; }
    speak() { return `${this.name} makes a noise`; }
}

class Dog extends Animal {
    speak() { return `${this.name} barks`; }
}

const dog = new Dog("Rex");

// Instance chain — fill in the blanks:
// dog                                               → [instance]
// [A] = Object.getPrototypeOf(dog)                 → [Dog.prototype]  
// [B] = Object.getPrototypeOf(Dog.prototype)       → [Animal.prototypr]
// [C] = Object.getPrototypeOf(Animal.prototype)    → [Object.protpye]
// [D] = Object.getPrototypeOf(Object.prototype)    → null

// Constructor chain — fill in the blanks:
// Dog                                               → [class]
// [E] = Object.getPrototypeOf(Dog)                 → [Animal]
// [F] = Object.getPrototypeOf(Animal)              → [Fuction.protype]
// [G] = Object.getPrototypeOf(Function.prototype)  → Object.prototype
//                                                  → null

// Run and verify:
console.log(Object.getPrototypeOf(dog) === Dog.prototype);           // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true

console.log(Object.getPrototypeOf(Dog) === Animal);                  // true!
console.log(Object.getPrototypeOf(Animal) === Function.prototype);   // true

// ----------------------------------------------------------
// Q2: OWN PROPERTY vs INHERITED — hasOwnProperty DEEP DIVE
// ----------------------------------------------------------
// Before running, predict the output of each line.
// The answers reveal exactly what is stored on the instance
// vs what is inherited from the prototype chain.
// ----------------------------------------------------------

class Vehicle {
    static wheels = 4;        // static — on the constructor

    constructor(make, model) {
        this.make = make;     // own property
        this.model = model;   // own property
    }

    describe() {              // on Vehicle.prototype
        return `${this.make} ${this.model}`;
    }
}

class ElectricVehicle extends Vehicle {
    #batteryKwh;

    constructor(make, model, batteryKwh) {
        super(make, model);
        this.#batteryKwh = batteryKwh;
        this.type = "electric";  // own property
    }

    range() {
        return this.#batteryKwh * 4;
    }
}

const ev = new ElectricVehicle("Tesla", "Model 3", 75);

// What are the OWN properties of ev?
console.log(Object.getOwnPropertyNames(ev));
console.log(Object.getOwnPropertyNames(ElectricVehicle))
// Hint: #batteryKwh is stored as a special own property but won't show here

// Predict each:
console.log(ev.hasOwnProperty("make"));        // true
console.log(ev.hasOwnProperty("type"));        // true
console.log(ev.hasOwnProperty("describe"));    // false
console.log(ev.hasOwnProperty("range"));       // false
console.log(ev.hasOwnProperty("wheels"));      // false

// Where does `describe` actually live?
console.log(Vehicle.prototype.hasOwnProperty("describe")); // true

// for...in iterates OWN + INHERITED enumerable properties
// (class methods are non-enumerable, so they won't appear)
const ownKeys = [];
const inheritedKeys = [];
for (let key in ev) {
    if (ev.hasOwnProperty(key)) ownKeys.push(key);
    else inheritedKeys.push(key);
}
console.log("own:", ownKeys);          // ["make", "model", "type"]
console.log("inherited:", inheritedKeys); // [] — class methods are non-enumerable


// ----------------------------------------------------------
// Q3: Object.create vs new — BUILD AN OBJECT WITHOUT A CLASS
// ----------------------------------------------------------
// Object.create(proto) creates an object whose [[Prototype]] IS proto.
// This is the raw mechanism that `new` uses internally.
//
// YOUR TASK:
// Without using `class` or `new`, recreate the Person/Teacher
// hierarchy from the top of this course using ONLY Object.create.
//
// Then verify with instanceof — spoiler: it won't work!
// Explain why instanceof fails and what you can use instead.
// ----------------------------------------------------------

const PersonProto = {
    greet() {
        return `Hi, I am ${this.name}, age ${this.age}`;
    },
};

// Factory function using Object.create:
function createPerson(name, age) {
    const obj = Object.create(PersonProto);
    obj.name = name;
    obj.age = age;
    return obj;
}

const TeacherProto = Object.create(PersonProto);
TeacherProto.teach = function () {
    return `${this.name} teaches ${this.sub}`;
};

function createTeacher(name, age, sub) {
    const obj = Object.create(TeacherProto);
    obj.name = name;
    obj.age = age;
    obj.sub = sub;
    return obj;
}

const t = createTeacher("Manish", 30, "Maths");
console.log(t.greet());    // "Hi, I am Manish, age 30"
console.log(t.teach());    // "Manish teaches Maths"

// Why does instanceof fail here?
// console.log(t instanceof TeacherProto);  // TypeError — right side not a function!
// instanceof requires a CONSTRUCTOR on the right side.

// Use isPrototypeOf instead:
console.log(TeacherProto.isPrototypeOf(t));  // true
console.log(PersonProto.isPrototypeOf(t));   // true — deep chain check

// Check the chain:
console.log(Object.getPrototypeOf(t) === TeacherProto);          // true
console.log(Object.getPrototypeOf(TeacherProto) === PersonProto); // true
