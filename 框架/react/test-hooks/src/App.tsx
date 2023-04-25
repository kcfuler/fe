import { useState } from "react";
import "./App.css";
import { TestLifeCycle } from "./draft/TestLifeCycle";
import { TestIcon } from "./draft/TestIcon";

function App() {
  const [counter, setCounter] = useState(0);
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <h1>there is App</h1>
      <h2>this is app counter : {counter}</h2>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        {" "}
        在 App 里面 ++
      </button>
      <button onClick={() => setIsShow((v) => !v)}>
        toggle the TestLifeCycle show
      </button>

      <p>--------------------------------------------------</p>
      {isShow ? <TestLifeCycle counter={counter} /> : null}

      <p>--------------------------------------------------</p>
      <TestIcon></TestIcon>
    </>
  );
}

export default App;
