# Vue 响应式系统演示

本项目演示了Vue响应式系统的简化TypeScript实现，展示了响应式状态如何在值变化时自动更新DOM。

## 响应式系统原理

Vue的响应式系统基于几个关键概念：

### 1. 依赖跟踪

当在执行副作用（如渲染）期间访问响应式属性时，系统会记录该副作用依赖于该属性。

```typescript
// 来自 reactivity.ts
function track(target: object, key: any): void {
  if (activeEffect) {
    // 为该对象创建或获取依赖映射
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // 为该属性创建或获取依赖集合
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }

    // 将当前副作用添加到依赖集合
    dep.add(activeEffect);
  }
}
```

### 2. 通过Proxy实现变化检测

响应式对象被包装在JavaScript Proxy中，拦截属性访问和修改：

```typescript
// 来自 reactivity.ts
export function reactive<T extends object>(target: T): T {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 跟踪依赖
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // 如果值确实变化，触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}
```

### 3. 副作用系统

副作用是初始运行并在其依赖项变化时重新运行的函数：

```typescript
// 来自 reactivity.ts
export function effect(fn: EffectFn): EffectFn {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };

  // 立即运行
  effectFn();
  return effectFn;
}
```

### 4. DOM更新

渲染系统使用副作用在响应式状态变化时自动更新DOM：

```typescript
// 来自 renderer.ts
export function createApp(component: () => VNode, container: HTMLElement): void {
  effect(() => {
    container.innerHTML = '';
    const vnode = component();
    mount(vnode, container);
  });
}
```

## 运行演示

要运行此项目：

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中打开终端显示的URL。

## 演示功能

演示展示了几个响应式概念：

1. **响应式对象**：使用 `reactive()` 使对象属性具有响应性
2. **基本类型值**：使用 `ref()` 使基本类型值具有响应性
3. **计算值**：使用 `computed()` 创建依赖项变化时自动更新的派生值
4. **DOM绑定**：状态变化时的自动DOM更新

## 项目结构

- `src/reactivity.ts` - 核心响应式系统
- `src/renderer.ts` - 简单的虚拟DOM渲染器，连接到响应式系统
- `src/main.ts` - 带有示例的演示应用 