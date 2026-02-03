
let result = false;

async function run() {
  result = false;
  await Promise.resolve();
  result = true;
}

let flag = false;

async function a() {
  await Promise.resolve();
  flag = true;
  return false;
}

async function b() {
  const res = await a();
  flag = res;
}

b();

Promise.resolve().then(() => {
  console.log(flag);
});