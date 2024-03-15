import { CounterStore, useCounterStore } from "./store/counter";

function App() {
  const count = useCounterStore((state: CounterStore) => state.count);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => useCounterStore.getState().increment()}>+</button>
      <button onClick={() => useCounterStore.getState().decrement()}>-</button>
    </div>
  );
}

export default App;
