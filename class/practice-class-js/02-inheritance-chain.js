// ============================================================
// FILE: 02-inheritance-chain.js
// TOPIC: prototype vs __proto__, 3 ways to wire inheritance
// ============================================================
//
// CORE IDEA TO UNDERSTAND BEFORE STARTING:
//
//   prototype   → property that EXISTS on FUNCTIONS (constructors/classes)
//                 Teacher.prototype is the object that becomes the __proto__
//                 of every instance created with `new Teacher()`
//
//   __proto__   → the ACTUAL chain link on EVERY object (instances, prototypes,
//                 even functions themselves). It points to the object's parent.
//
//   So:
//     const t = new Teacher()
//     t.__proto__  === Teacher.prototype          // instance → prototype
//     Teacher.prototype.__proto__ === Person.prototype  // prototype → parent prototype
//     Teacher.__proto__ === Person               // constructor → parent constructor (class only)
//
// ============================================================


// ----------------------------------------------------------
// Q1: prototype vs __proto__ — DRAW BEFORE YOU CODE
// ----------------------------------------------------------
//
// Without writing any code yet, answer these in comments:
//
//   Given:  function Foo() {}
//           const f = new Foo()
//
//   a) What is  f.__proto__  ?
//   b) What is  Foo.prototype  ?
//   c) Are (a) and (b) the same object? Prove it with ===.
//   d) What is  Foo.__proto__  ?  (Foo is itself an object!)
//   e) What is  f.prototype  ?    (f is an instance, not a constructor)
//   f) What is  Foo.prototype.__proto__  ?
//   g) What is  Foo.prototype.constructor  ?
//
// NOW write the code. Verify every answer with console.log.
// Every line should just print true / the value you predicted.
//
// YOUR CODE:


// ----------------------------------------------------------
// Q2: THREE WAYS — setPrototypeOf vs __proto__ vs Object.assign
// ----------------------------------------------------------
//
// Create Person(name, age) and Teacher(name, age, sub).
// Person.prototype has: greet(), introduce()
// Teacher.prototype has: teach()
//
// Wire inheritance THREE separate times (use TeacherA, TeacherB, TeacherC
// so they don't interfere), each using a different method:
//
//   Method 1 (TeacherA): Object.setPrototypeOf(TeacherA.prototype, Person.prototype)
//   Method 2 (TeacherB): TeacherB.prototype.__proto__ = Person.prototype
//   Method 3 (TeacherC): Object.assign(TeacherC.prototype, Person.prototype)
//                         TeacherC.prototype.constructor = TeacherC
//
// For EACH method, after creating an instance, verify and log:
//   i)   instance.greet()       — does it work?
//   ii)  instance.teach()       — does it work?
//   iii) instance instanceof Person   — true or false?
//   iv)  instance instanceof TeacherX — true or false?
//   v)   Object.getPrototypeOf(TeacherX.prototype) === Person.prototype — true or false?
//   vi)  TeacherX.prototype.constructor === TeacherX — true or false?
//
// Then answer in comments:
//   - Which methods create a REAL prototype chain (method lookup goes up)?
//   - Which method just COPIES properties (no chain, no instanceof)?
//   - Are Method 1 and Method 2 functionally identical? Prove it.
//   - Why does Method 3 need `TeacherC.prototype.constructor = TeacherC`?
//     What breaks if you skip that line?
//
// YOUR CODE:


// ----------------------------------------------------------
// Q3: THE HIDDEN DANGER OF Object.assign INHERITANCE
// ----------------------------------------------------------
//
// Using Method 3 (Object.assign) from Q2:
//
//   a) Add a new method to Person.prototype AFTER the assign call.
//      Does TeacherC pick it up? Why or why not?
//      (Contrast: does TeacherA — which used setPrototypeOf — pick it up?)
//
//   b) Mutate a property on TeacherC.prototype that came from Object.assign.
//      Does Person.prototype see the change? Why or why not?
//      (Contrast with Method 2 where __proto__ is shared)
//
//   c) Object.assign does a SHALLOW copy. Create a Person.prototype.config
//      that is an object: { maxStudents: 30 }
//      Assign it to TeacherC. Then mutate TeacherC.prototype.config.maxStudents = 99.
//      Does Person.prototype.config.maxStudents change? Why?
//
// Write the code that proves each point. Each proof is 2-4 lines.
//
// YOUR CODE:


// ----------------------------------------------------------
// Q4: __proto__ IS A GETTER/SETTER ON Object.prototype — NOT A REAL PROPERTY
// ----------------------------------------------------------
//
// __proto__ is actually defined as a getter/setter on Object.prototype.
// This has surprising consequences.
//
//   a) Prove __proto__ is not an own property of any regular object:
//      Object.getOwnPropertyDescriptor({}, "__proto__")  → ???
//      Object.getOwnPropertyDescriptor(Object.prototype, "__proto__") → ???
//
//   b) Create an object with NO prototype at all:
//      const bare = Object.create(null)
//      Try to access bare.__proto__  — what do you get and why?
//      Try Object.getPrototypeOf(bare) — what do you get?
//
//   c) __proto__ in an object literal has special meaning:
//      const child = { __proto__: someParent, method() {} }
//      This sets the prototype AT CREATION TIME.
//      Write code using this syntax to create a 3-level chain:
//        grandparent → parent → child
//      Verify with Object.getPrototypeOf.
//
//   d) Create a plain object that has a KEY literally named "__proto__"
//      (not the prototype setter — an actual string key).
//      Hint: Object.defineProperty or Object.create(null).
//      Can you do it with a regular object literal?  { "__proto__": 42 } — try it.
//
// YOUR CODE:


// ----------------------------------------------------------
// Q5: setPrototypeOf AFTER CONSTRUCTION — PERFORMANCE TRAP
// ----------------------------------------------------------
//
//   a) Create an object `dog` from Dog constructor.
//      Then call Object.setPrototypeOf(dog, Cat.prototype) AFTER creation.
//      Does dog now respond to Cat methods? Does it still respond to Dog methods?
//      What does instanceof Dog and instanceof Cat return?
//
//   b) V8 and SpiderMonkey WARN against calling setPrototypeOf on
//      already-constructed objects at runtime (it breaks the engine's
//      hidden class optimizations). This is safe on .prototype objects
//      at setup time (before any instances are created).
//      Write a comment explaining the correct time to call setPrototypeOf.
//
//   c) Use Object.setPrototypeOf to build this runtime chain:
//        fish → swims
//        bird → flies
//        flyingFish should respond to BOTH swim() and fly()
//      Do it WITHOUT class or extends — only constructor functions +
//      setPrototypeOf + a manually chained prototype object.
//      Verify all 5 points from Q2 (greet, teach, instanceof x2, proto link).
//
// YOUR CODE:


// ----------------------------------------------------------
// Q6: FULL COMPARISON TABLE — fill this in after completing Q1–Q5
// ----------------------------------------------------------
//
// Complete this table in comments based on what you observed:
//
// | Aspect                              | setPrototypeOf | __proto__ assign | Object.assign |
// |-------------------------------------|----------------|------------------|---------------|
// | Creates real prototype chain?       |                |                  |               |
// | instanceof works?                   |                |                  |               |
// | Picks up LATER additions to parent? |                |                  |               |
// | Shallow copy risk?                  |                |                  |               |
// | constructor needs manual reset?     |                |                  |               |
// | Safe to call post-construction?     |                |                  |               |
// | Preferred use case                  |                |                  |               |
//
// YOUR ANSWERS (fill in the table above):
