
# 🟢 Method 1 — Using `readline` (Recommended)

This is the cleanest and most interview-friendly method.

---

## ✅ Basic Setup

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

---

# 🔤 String Input

```js
rl.question("Enter name: ", (name) => {
  console.log("String:", name);
  rl.close();
});
```

---

# 🔢 Number Input

CLI always gives string → convert.

```js
rl.question("Enter number: ", (n) => {
  const num = Number(n);
  console.log("Number + 5 =", num + 5);
  rl.close();
});
```

Also valid:

```js
parseInt(n)
parseFloat(n)
```

---

# ☑️ Boolean Input

```js
rl.question("Enter true/false: ", (v) => {
  const bool = v.toLowerCase() === "true";
  console.log("Boolean:", bool);
  rl.close();
});
```

Flexible version:

```js
const bool = ["yes","true","1"].includes(v.toLowerCase());
```

---

# 🔠 Char Input

JS has **no char type** — use first character of string.

```js
rl.question("Enter char: ", (c) => {
  console.log("Char:", c[0]);
  rl.close();
});
```

---

# 🧠 Multiple Inputs Sequentially

```js
rl.question("Name: ", name => {
  rl.question("Age: ", age => {
    console.log(name, Number(age));
    rl.close();
  });
});
```

---

# ⚡ Modern Async/Await Version (Best Practice)

Cleaner for multiple inputs.

```js
const readline = require('readline/promises');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const name = await rl.question("Name: ");
  const age = Number(await rl.question("Age: "));
  const active = (await rl.question("Active? ")).toLowerCase() === "true";

  console.log({ name, age, active });
  rl.close();
}

main();
```

---

# 🟡 Method 2 — Using `process.stdin` (Low-Level)

More manual — good to know for interviews.

---

## Example

```js
process.stdin.on("data", data => {
  const input = data.toString().trim();
  console.log("You typed:", input);
  process.exit();
});
```

---

## Convert Types

```js
const num = Number(input);
const bool = input === "true";
const char = input[0];
```

---

# ⚠️ Common CLI Input Mistakes

## ❌ Forgetting conversion

```js
"5" + 5 = "55"
```

Always convert numbers.

---

## ❌ Not trimming newline

```js
data.toString().trim()
```

---


