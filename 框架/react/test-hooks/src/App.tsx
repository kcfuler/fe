import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  setCount((v) => v + 1);

  return (
    <>
      <h1>this is the count {count}</h1>
      <button onClick={() => setCount((v) => v + 1)}> + </button>
      <button onClick={() => setCount((v) => v - 1)}> - </button>
    </>
  );
}

export default App;
