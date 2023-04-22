namespace testFlat {
  let source = [1, [2, [3, [4, [5]]]]];
  let aim = source.flat(10);
  console.log(aim);
}
