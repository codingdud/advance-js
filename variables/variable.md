Below is a **deep, structured explanation** of **`undefined` vs `null`** and **all the messy JavaScript edge cases** around them — including `==` vs `===`, truthy/falsy, coercion, `typeof`, and interview traps.

---

# 1️⃣ `undefined` vs `null` (Core Difference)

| Feature       | `undefined`                        | `null`                       |
| ------------- | ---------------------------------- | ---------------------------- |
| Meaning       | Variable declared but not assigned | Intentional absence of value |
| Set by        | JavaScript engine                  | Developer                    |
| Type          | `undefined`                        | `object` ❌ (JS bug)          |
| Default value | Yes                                | No                           |
| Mutability    | Primitive                          | Primitive                    |
| JSON          | ❌ omitted                          | ✅ serialized                 |

### Examples

```js
let a;
let b = null;
```

---

# 2️⃣ Why `typeof null === "object"` ❓

This is a **historical bug** in JavaScript from 1995.

```js
typeof null; // "object"
```

It cannot be fixed without breaking the web.

---

# 3️⃣ Equality: `==` vs `===`

## Strict Equality (`===`) ✅

* No type coercion
* Compare value + type

```js
undefined === null; // false
```

## Loose Equality (`==`) ❌

* Performs type coercion

```js
undefined == null; // true (special rule)
```

⚠️ **This is the ONLY case where they are equal**

---

# 4️⃣ Truthy & Falsy Values (Interview Favorite)

### Falsy values (ONLY these 8):

```js
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is **truthy**.

```js
Boolean(null);      // false
Boolean(undefined); // false
```

---

# 5️⃣ Weird `==` Edge Cases (Very Important)

```js
[] == false;   // true
[] == "";      // true
"" == false;   // true
null == 0;     // false
undefined == 0;// false
```

### Why?

`==` converts values to numbers/strings.

---

# 6️⃣ `undefined` vs `not defined`

```js
let x;
console.log(x); // undefined

console.log(y); // ReferenceError (not defined)
```

| Term        | Meaning                |
| ----------- | ---------------------- |
| `undefined` | Exists but no value    |
| not defined | Variable doesn’t exist |

---

# 7️⃣ `NaN` (Not a Number)

```js
typeof NaN;      // "number"
NaN === NaN;     // false ❌
```

### Correct check:

```js
Number.isNaN(NaN); // true
```

---

# 8️⃣ `null` in Arithmetic

```js
null + 1;       // 1
undefined + 1;  // NaN
```

Why?

* `null` → `0`
* `undefined` → `NaN`

---

# 9️⃣ Default Parameters

```js
function test(x = 10) {}

test(undefined); // x = 10
test(null);      // x = null ❌
```

---

# 🔟 Optional Chaining & Nullish Coalescing

## Optional Chaining `?.`

```js
user?.profile?.name;
```

Stops only for:

* `null`
* `undefined`

---

## Nullish Coalescing `??`

```js
let name = input ?? "default";
```

Only triggers for:

* `null`
* `undefined`

⚠️ Difference from `||`:

```js
0 || 10;   // 10 ❌
0 ?? 10;   // 0 ✅
```

---

# 1️⃣1️⃣ `Object.is()` (Advanced Equality)

```js
Object.is(NaN, NaN);     // true
Object.is(+0, -0);      // false
```

Better than `===` in edge cases.

---

# 1️⃣2️⃣ Arrays & Objects Edge Cases

```js
[] === [];        // false
{} === {};        // false
```

Why?

* Compared by **reference**, not value

---

# 1️⃣3️⃣ JSON Behavior

```js
JSON.stringify({ a: undefined }); // "{}"
JSON.stringify({ a: null });      // '{"a":null}'
```

---

# 1️⃣4️⃣ Best Practices (Real World)

✅ Use `===` always
✅ Use `null` for intentional emptiness
✅ Use `undefined` for missing values
✅ Use `??` instead of `||`
❌ Avoid `==`

---

# 🔥 Interview Lightning Round

```js
null == undefined;   // true
null === undefined; // false
typeof undefined;   // "undefined"
typeof null;        // "object"
```

---

# 🎯 One-Line Interview Answer

> **`undefined` means a variable exists but has no value, `null` means intentional absence, and JavaScript’s loose equality (`==`) causes confusing coercion edge cases—so always prefer strict equality (`===`).**

---
