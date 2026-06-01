# JS Class Practice — Progress Tracker

Legend: ✅ Done  ❌ Pending  🔍 Read/Observe (no code to write)

---

## 01-class-vs-constructor.js ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| Q1 | Write `class PersonClass` mirroring `Person` constructor | ✅ Done |
| Q1 | Run assertions: `typeof`, prototype shape, `.constructor` refs | ✅ Done |
| Q1 | Prove `PersonClass()` without `new` throws | ✅ Done |
| Q2 | Observe `for-in` difference (enumerable vs non-enumerable) | ✅ Done |
| Q2 | Fix `Animal.prototype.speak` with `Object.defineProperty` | ✅ Done |
| Q3 | Explain constructor property trap (prototype replacement bug) | ✅ Done |
| Q3 | Fix A — restore `.constructor` manually | ✅ Done |
| Q3 | Fix B — rewrite `Vehicle` as a class | ✅ Done |

---

## 02-inheritance-chain.js ❌ 6 tasks pending (rewritten — deep prototype focus)

| # | Task | Status |
|---|------|--------|
| Q1 | Predict `f.__proto__`, `Foo.prototype`, `Foo.__proto__`, `f.prototype` before coding | ❌ Pending |
| Q1 | Write code proving `f.__proto__ === Foo.prototype` and all other answers | ❌ Pending |
| Q2 | Wire inheritance 3 ways: `setPrototypeOf` / `__proto__=` / `Object.assign` | ❌ Pending |
| Q2 | Verify all 6 points (greet, teach, instanceof x2, proto link, constructor) for each | ❌ Pending |
| Q2 | Fill in comparison: which creates real chain vs copy? | ❌ Pending |
| Q3 | Prove `Object.assign` misses later parent additions; `setPrototypeOf` picks them up | ❌ Pending |
| Q3 | Prove shallow-copy danger with nested config object | ❌ Pending |
| Q4 | Prove `__proto__` is a getter/setter on `Object.prototype`, not own property | ❌ Pending |
| Q4 | Create `Object.create(null)` — show `__proto__` is undefined, chain is gone | ❌ Pending |
| Q4 | Use `__proto__` in object literal to build 3-level chain | ❌ Pending |
| Q5 | Call `setPrototypeOf` post-construction — does the instance change behavior? | ❌ Pending |
| Q5 | Build flyingFish (swims + flies) using only constructors + setPrototypeOf | ❌ Pending |
| Q6 | Fill the full comparison table (7 aspects × 3 methods) | ❌ Pending |

---

## 03-static-methods.js ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| Q1 | Predict output of all `console.log` lines (static vs instance) | ✅ Done |
| Q1 | Verify where `add` lives (`MathUtils.hasOwnProperty` vs prototype) | ✅ Done |
| Q2 | Run `Child.create(5)` — observe inherited static works | ✅ Done |
| Q2 | Part B — replicate with constructor functions + `Object.setPrototypeOf(ChildFn, BaseFn)` | ✅ Done |
| Q2 | Part C — explain two separate chains (constructor-side vs instance-side) | ✅ Done |
| Q3 | `class Temperature` with `#celsius`, static factories, getters, `toString()` | ✅ Done |

---

## 04-getters-setters.js ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| Q1 | `RangeError` in `BankAccount` setter when `amount < 0` | ✅ Done |
| Q1 | Verify getter/setter lives on prototype, not instance | ✅ Done |
| Q2 | `class Circle` with lazy memoized `area` + `circumference` getters | ✅ Done |
| Q2 | `Object.getOwnPropertyNames` shows cached property after first access | ✅ Done |
| Q3 | `set color(value)` in `Circle2` calling `super`'s setter | ✅ Done |
| Q3 | Restored `this.color = color` in Shape so setter validation runs on construction | ✅ Done |

---

## 05-private-fields.js ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| Q1 | Compare `_convention` vs WeakMap vs `#field` (access, JSON, inheritance) | ✅ Done |
| Q1 | Observe `#ssn` SyntaxError in subclass without going through parent method | ✅ Done |
| Q2 | `class Counter` with `#count`, `#step`, private `#validate`, static `#instances` | ✅ Done |
| Q2 | Fixed: `#validate` throws real `RangeError`, not generic `Error` | ✅ Done |
| Q3 | `other.#id` accessible inside same class (brand check pattern) | ✅ Done |
| Q3 | `Entity.isEntity({id:1})` returns `false` — brand check fails on plain object | ✅ Done |

---

## 06-prototype-chain-deep.js ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| Q1 | Fill both chains (instance side + constructor side) mentally | ✅ Done |
| Q1 | Verify `Object.getPrototypeOf(Dog) === Animal` (static chain) | ✅ Runs |
| Q2 | Predict all `hasOwnProperty` outputs before running | ✅ Runs |
| Q2 | Verify `for-in` shows only own enumerable, not class methods | ✅ Runs |
| Q3 | Build Person/Teacher with `Object.create` (no `class` or `new`) | ✅ Runs |
| Q3 | Verify `instanceof` fails, `isPrototypeOf` works instead | ✅ Runs |

---

## 07-mixins.js ❌ 3 tasks pending

| # | Task | Status |
|---|------|--------|
| Q1 | **Apply `Object.assign(FlyingFish.prototype, Swimmable, Flyable)`** | ❌ Pending |
| Q1 | Check if mixin methods are enumerable (compare to class methods) | ❌ Pending |
| Q2 | Study `Timestamped` + `Activatable` functional mixin pattern | ✅ Runs |
| Q2 | **Implement `Serializable` mixin: `toJSON()`, `serialize()`, `static fromJSON()`** | ❌ Pending |
| Q3 | Run collision demo — observe `[B]` overwrites `[A]` silently | ✅ Runs |
| Q3 | **Write `safeMixin(target, ...mixins)` — throws on name collision** | ❌ Pending |
| Q3 | **Write `chainedMixin(target, ...mixins)` — chains same-name methods** | ❌ Pending |

---

## 08-advanced-patterns.js ✅ 1/3 complete

| # | Task | Status |
|---|------|--------|
| Q1 | Study `new.target` abstract class guard | ✅ Runs |
| Q1 | **Implement `CircleShape.area()` → `Math.PI * r^2`** | ❌ Pending |
| Q2 | **Implement `class Range` with `Symbol.iterator` + `Symbol.toPrimitive`** | ❌ Pending |
| Q3 | `Vector.toString()`, `valueOf()`, inspect hook | ✅ Done |
| Q3 | `Symbol.hasInstance` brand check on plain objects | ✅ Done |

---

## Summary

| File | Total Tasks | Done | Pending |
|------|-------------|------|---------|
| 01-class-vs-constructor | 8 | **8** | 0 |
| 02-inheritance-chain | 8 | 5 | **3** |
| 03-static-methods | 6 | **6** | 0 |
| 04-getters-setters | 6 | **6** | 0 |
| 05-private-fields | 6 | **6** | 0 |
| 06-prototype-chain-deep | 6 | **6** | 0 |
| 07-mixins | 7 | 2 | **5** |
| 08-advanced-patterns | 5 | 3 | **2** |
| **TOTAL** | **50** | **32** | **18** |

---

## Suggested order to tackle pending tasks

1. `02` Q1 → class rewrite (easy, you already understand the constructor version)
2. `02` Q2 → Employee + Manager (`super.describe()` chain)
3. `04` Q1 → BankAccount RangeError (one line)
4. `08` Q1 → CircleShape.area() (one line)
5. `07` Q1 → Object.assign mixin (one line)
6. `03` Q3 → Temperature factory class
7. `05` Q2 → Counter with private method
8. `04` Q2 → lazy getter Circle
9. `04` Q3 → Circle2 setter override
10. `03` Q2 → constructor function static chain
11. `07` Q2 → Serializable mixin
12. `07` Q3 → safeMixin + chainedMixin
13. `08` Q2 → Range with Symbol.iterator
