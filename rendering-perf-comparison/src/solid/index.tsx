import { render } from "solid-js/web";
import TodoApp from "./TodoApp";

// Solid.js 入口函数，接收一个挂载点元素
export default function initSolid(mountElement: HTMLElement) {
  // 清空挂载点
  mountElement.innerHTML = "";

  // 渲染 Solid.js 应用
  const dispose = render(() => <TodoApp />, mountElement);

  return () => {
    // 清理函数
    dispose();
  };
}
