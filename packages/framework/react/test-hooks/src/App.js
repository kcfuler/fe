"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const TestLifeCycle_1 = require("./draft/TestLifeCycle");
const TestIcon_1 = require("./draft/TestIcon");
function App() {
    const [counter, setCounter] = (0, react_1.useState)(0);
    const [isShow, setIsShow] = (0, react_1.useState)(true);
    return (<>
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
      {isShow ? <TestLifeCycle_1.TestLifeCycle counter={counter}/> : null}

      <p>--------------------------------------------------</p>
      <TestIcon_1.TestIcon></TestIcon_1.TestIcon>
    </>);
}
exports.default = App;
