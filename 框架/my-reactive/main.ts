import { createSignal } from "./reactive";

const [count, setCount] = createSignal<number>(0);

console.log(count()); // 0
