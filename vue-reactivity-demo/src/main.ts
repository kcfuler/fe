/**
 * 示例应用
 *
 * 本文件演示了响应式系统如何与DOM更新连接。
 */

import { reactive, ref, computed } from "./reactivity";
import { createApp, h } from "./renderer";

// 主应用初始化
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;

  // 创建响应式状态
  const state = reactive({
    count: 0,
    message: "Hello Vue Reactivity!",
  });

  // 创建响应式引用（用于基本类型值）
  const name = ref("");

  // 创建计算属性
  const greeting = computed(() => {
    return name.value ? `Hello, ${name.value}!` : "Enter your name above";
  });

  // 定义组件渲染方式
  const AppComponent = () => {
    return h("div", {}, [
      // 显示和更新消息
      h("div", { class: "message" }, [
        h("h2", {}, [state.message]),
        h("input", {
          value: state.message,
          onInput: (e: Event) => {
            state.message = (e.target as HTMLInputElement).value;
          },
        }),
      ]),

      // 计数器示例
      h("div", { class: "counter" }, [
        h("h2", {}, ["Counter: " + state.count]),
        h("div", {}, [
          h(
            "button",
            {
              onClick: () => state.count--,
            },
            ["-"]
          ),
          h(
            "button",
            {
              onClick: () => state.count++,
            },
            ["+"]
          ),
        ]),
      ]),

      // 名称输入与计算属性示例
      h("div", { class: "name-input" }, [
        h("h2", {}, ["Name Input"]),
        h("input", {
          value: name.value,
          placeholder: "Enter your name",
          onInput: (e: Event) => {
            name.value = (e.target as HTMLInputElement).value;
          },
        }),
        h("p", {}, [greeting.value]),
      ]),

      // 说明部分
      h("div", { class: "explanation" }, [
        h("h2", {}, ["工作原理"]),
        h("p", {}, [
          "这个演示展示了Vue响应式系统的简单实现。" +
            "当你通过用户交互更新状态时，DOM会自动更新。",
        ]),
        h("ol", {}, [
          h("li", {}, [
            "reactive() 函数使用Proxy创建对象的代理，以跟踪属性访问和变化。",
          ]),
          h("li", {}, [
            "ref() 函数通过将基本类型值包装在对象中使其具有响应性。",
          ]),
          h("li", {}, [
            "effect() 函数注册一个函数，在响应式数据变化时重新运行。",
          ]),
          h("li", {}, [
            "computed() 函数创建一个值，该值在其依赖项变化时自动更新。",
          ]),
          h("li", {}, ["我们的渲染器使用effect()将响应式系统连接到DOM更新。"]),
        ]),
      ]),
    ]);
  };

  // 将应用挂载到DOM
  createApp(AppComponent, app);
});
