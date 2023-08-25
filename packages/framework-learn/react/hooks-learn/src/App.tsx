import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("count", count);
      setCount((count) => count + 1);
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
