"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const counter_1 = require("./store/counter");
function App() {
    const count = (0, counter_1.useCounterStore)((state) => state.count);
    return (<div>
      <h1>Count: {count}</h1>
      <button onClick={() => counter_1.useCounterStore.getState().increment()}>+</button>
      <button onClick={() => counter_1.useCounterStore.getState().decrement()}>-</button>
    </div>);
}
exports.default = App;
