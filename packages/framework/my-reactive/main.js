"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reactive_1 = require("./reactive");
const [count, setCount] = (0, reactive_1.createSignal)(0);
const [count1, setCount1] = (0, reactive_1.createSignal)(1);
console.log(count()); // 0
function log() {
    console.log(count(), count1());
}
// untrack之后就只会执行第一次，不会响应变量的改变
(0, reactive_1.createEffect)(() => (0, reactive_1.unTrack)(log));
setCount(1); // 1
setCount1(2);
