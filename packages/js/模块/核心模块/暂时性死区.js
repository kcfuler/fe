function bar() {
  let x = 1;
  if (true) {
    console.log(x); // 抛出 ReferenceError: x is not defined
    let x = 2;
  }
}

bar();
