import { createEffect, createSignal } from "./reactive";

const [count, setCount] = createSignal<number>(0);

console.log(count()); // 0

createEffect(() => {
  console.log(count());
});

setCount(1); // 1
