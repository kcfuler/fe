import { createEffect, createSignal, unTrack } from "./reactive";

const [count, setCount] = createSignal<number>(0);
const [count1, setCount1] = createSignal<number>(1);

console.log(count()); // 0

function log() {
  console.log(count(), count1());
}

// untrack之后就只会执行第一次，不会响应变量的改变
createEffect(() => unTrack(log));

setCount(1); // 1
setCount1(2);
