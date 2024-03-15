"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLifeCycle = void 0;
const react_1 = require("react");
exports.TestLifeCycle = (0, react_1.memo)((props) => {
    const [counter, setCounter] = (0, react_1.useState)(props.counter);
    (0, react_1.useEffect)(() => {
        console.log("TestLifeCycle组件刷新啦!");
        return () => {
            console.log("组件被销毁啦！");
        };
    }, [props]);
    (0, react_1.useEffect)(() => {
        console.log("在useEffect看counter:", counter);
    }, [counter]);
    return (<>
        <h1>counter equals {counter} </h1>
        <button onClick={() => setCounter((v) => v + 1)}> + </button>
        <button onClick={() => setCounter((v) => v - 1)}> - </button>
        <button onClick={() => {
            setCounter((v) => v + 1);
            setCounter((v) => v + 1);
            setCounter((v) => v + 1);
            setCounter((v) => v + 1);
            setCounter((v) => v + 1);
            setCounter((v) => v + 1);
        }}>
          {" "}
          batch add{" "}
        </button>
      </>);
}, 
// 返回 true 代表不需要重新渲染, 返回false代表需要重新渲染
(prevProps, nextProps) => {
    console.log("prevProps", prevProps, "nextProps", nextProps);
    return prevProps.counter === nextProps.counter;
});
