/**
 * 模板编译器示例
 *
 * 本文件演示了如何使用HTML模板编译器创建响应式应用。
 */

import { reactive, ref, computed } from "./reactivity";
import { createAppFromTemplate } from "./compiler";

// 在DOM加载完成后初始化应用
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;

  // HTML模板
  const template = `
    <div class="app-container">
      <h1>Vue模板编译器演示</h1>
      
      <!-- 计数器示例 -->
      <div class="counter-section">
        <h2>计数器</h2>
        <div class="counter">{{ count }}</div>
        <div class="buttons">
          <button @click="decrement">-</button>
          <button @click="increment">+</button>
        </div>
      </div>
      
      <!-- 消息输入示例 -->
      <div class="message-section">
        <h2>消息绑定</h2>
        <input :value="message" @input="updateMessage" placeholder="输入消息" />
        <p>{{ message }}</p>
      </div>
      
      <!-- 计算属性示例 -->
      <div class="name-section">
        <h2>计算属性</h2>
        <input :value="name" @input="updateName" placeholder="输入你的名字" />
        <p>{{ greeting }}</p>
      </div>
      
      <!-- 条件渲染 -->
      <div class="conditional">
        <h2>条件示例</h2>
        <p v-if="showInfo">这是一些附加信息</p>
        <button @click="toggleInfo">{{ showInfo ? '隐藏' : '显示' }}信息</button>
      </div>
      
      <!-- 工作原理说明 -->
      <div class="explanation">
        <h2>工作原理</h2>
        <p>这个演示展示了Vue风格模板编译器的简化实现。</p>
        <ol>
          <li>模板字符串被解析为标记(tokens)</li>
          <li>标记被转换为抽象语法树(AST)</li>
          <li>AST被转换为渲染函数</li>
          <li>渲染函数生成虚拟DOM</li>
          <li>虚拟DOM被渲染到页面</li>
        </ol>
      </div>
    </div>
  `;

  // 创建响应式状态和方法
  function setup() {
    const count = ref(0);
    const message = ref("Hello Vue Template!");
    const name = ref("");
    const showInfo = ref(false);

    // 计算属性
    const greeting = computed(() => {
      return name.value ? `你好，${name.value}！` : "请在上方输入你的名字";
    });

    // 方法
    function increment() {
      count.value++;
    }

    function decrement() {
      count.value--;
    }

    function updateMessage(event: Event) {
      message.value = (event.target as HTMLInputElement).value;
    }

    function updateName(event: Event) {
      name.value = (event.target as HTMLInputElement).value;
    }

    function toggleInfo() {
      showInfo.value = !showInfo.value;
    }

    // 返回所有需要在模板中使用的状态和方法
    return {
      count,
      message,
      name,
      greeting,
      showInfo,
      increment,
      decrement,
      updateMessage,
      updateName,
      toggleInfo,
    };
  }

  // 创建并挂载应用
  createAppFromTemplate(template, setup, app);
});
