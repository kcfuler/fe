import { memo, FC, useState, useEffect } from "react";

interface IProp {
  counter: number;
}

export const TestLifeCycle: FC<IProp> = memo(
  (props) => {
    const [counter, setCounter] = useState(props.counter);

    useEffect(() => {
      console.log("TestLifeCycle组件刷新啦!");

      return () => {
        console.log("组件被销毁啦！");
      };
    }, [props]);

    return (
      <>
        <h1>counter equals {counter} </h1>
        <button onClick={() => setCounter((v) => v + 1)}> + </button>
        <button onClick={() => setCounter((v) => v - 1)}> - </button>
      </>
    );
  },
  // 返回 true 代表不需要重新渲染, 返回false代表需要重新渲染
  (prevProps, nextProps) => {
    console.log("prevProps", prevProps, "nextProps", nextProps);
    return prevProps.counter === nextProps.counter;
  }
);
