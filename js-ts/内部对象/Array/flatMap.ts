namespace flagMap {
  let source = [1, 2, 3, 4, 5];
  let aim = source.flatMap((x) => [[[x * 2]]]);
  console.log(aim);
}
