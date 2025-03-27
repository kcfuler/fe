import "./style.css";

// 根据当前路径渲染不同的应用
const path = window.location.pathname;

// 创建导航菜单
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">渲染性能对比: React vs Solid.js</h1>
    
    <div class="flex space-x-4 mb-8">
      <a href="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">首页</a>
      <a href="/react" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">React 示例</a>
      <a href="/solid" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Solid.js 示例</a>
    </div>
    
    <div id="content" class="bg-gray-100 p-6 rounded-lg shadow-md">
      <!-- 内容将根据路由动态加载 -->
    </div>
  </div>
`;

// 默认显示首页内容
const contentEl = document.getElementById("content");
if (contentEl) {
  if (path === "/react") {
    import("./react/index").then((module) => {
      module.default(contentEl);
    });
  } else if (path === "/solid") {
    import("./solid/index").then((module) => {
      module.default(contentEl);
    });
  } else {
    // 默认首页
    contentEl.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">关于此演示</h2>
      <p class="mb-4">这个演示展示了 React 和 Solid.js 在渲染性能上的差异。</p>
      <p class="mb-4">两个框架实现了完全相同的 UI 和功能，但内部渲染机制不同：</p>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">React: 使用虚拟 DOM 进行 diffing 和批量更新</li>
        <li class="mb-2">Solid.js: 使用细粒度响应系统和依赖追踪</li>
      </ul>
      <p>请点击上方链接比较两个框架的性能表现。</p>
    `;
  }
}
