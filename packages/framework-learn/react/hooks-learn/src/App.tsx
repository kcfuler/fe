import { useState, useEffect } from "react";
import useLatest from "./hooks/useLatest";

function App() {
  const [count, setCount] = useState(0);
  const ref = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(ref.current + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>自定义Hooks: useLatest</div>
      <div>count: {count}</div>
    </>
  );
}

export default App;
