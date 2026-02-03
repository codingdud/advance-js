function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1 completed");
      resolve(10);
    }, 5000);
  });
}

function step2(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2 completed with:", value);
      resolve(value * 2);
    }, 5000);
  });
}

function step3(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3 completed with:", value);
      resolve(value + 5);
    }, 5000);
  });
}

step1()
  .then(step2)
  .then(step3)
  .then((finalResult) => {
    console.log("Final Result:", finalResult);
  });
