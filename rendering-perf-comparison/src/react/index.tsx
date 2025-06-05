import React from "react";
import { createRoot } from "react-dom/client";
import TodoApp from "./TodoApp";

// React 入口函数，接收一个挂载点元素
export default function initReact(mountElement: HTMLElement) {
  // 清空挂载点
  mountElement.innerHTML = "";

  // 创建 React root
  const root = createRoot(mountElement);

  // 渲染 React 应用
  root.render(
    <React.StrictMode>
      <TodoApp />
    </React.StrictMode>
  );

  return () => {
    // 清理函数
    root.unmount();
  };
}
