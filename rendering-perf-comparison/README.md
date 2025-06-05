# React vs Solid.js 渲染性能对比

这个项目展示了 React 和 Solid.js 在渲染性能上的差异，通过一个具有大量数据的待办事项应用来进行比较。

## 主要对比点

1. **更新机制**:
   - React: 使用虚拟 DOM 进行差异比较（diffing）
   - Solid.js: 使用细粒度响应系统和依赖追踪

2. **性能指标**:
   - 渲染次数
   - 更新次数
   - 更新时间（最近、平均和总计）

## 运行项目

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

## 项目结构

- `/src/react` - React 实现
- `/src/solid` - Solid.js 实现
- `/src/types.ts` - 共享类型定义

## 测试方法

1. 访问首页，可以查看项目介绍
2. 点击 "React 示例" 或 "Solid.js 示例" 链接进入对应页面
3. 在页面上进行以下操作来测试性能:
   - 添加新的待办事项
   - 切换待办事项的完成状态
   - 删除待办事项
4. 观察每个框架在性能监控区域显示的指标

## 性能差异

- **React**: 每次状态更新会触发整个组件树的重新渲染，然后通过虚拟 DOM 比较找出需要更新的真实 DOM 部分
- **Solid.js**: 只有直接依赖于变化状态的部分会更新，无需虚拟 DOM 比较

## 技术栈

- Vite
- TypeScript
- React 19
- Solid.js
- TailwindCSS 