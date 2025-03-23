# Vue Reactivity Demo

This project demonstrates a simplified implementation of Vue's reactivity system in TypeScript, showing how reactive state can automatically update the DOM when values change.

## How Reactivity Works

Vue's reactivity system is built on several key concepts:

### 1. Dependency Tracking

When a reactive property is accessed during the execution of an effect (like rendering), the system records that the effect depends on that property.

```typescript
// From reactivity.ts
function track(target: object, key: any): void {
  if (activeEffect) {
    // Create or get dependency map for this object
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // Create or get dependency set for this property
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }

    // Add the current effect to the dependency set
    dep.add(activeEffect);
  }
}
```

### 2. Change Detection via Proxy

Reactive objects are wrapped in JavaScript Proxies that intercept property access and modification:

```typescript
// From reactivity.ts
export function reactive<T extends object>(target: T): T {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // Track dependencies
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // Trigger updates if value changed
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}
```

### 3. Effect System

Effects are functions that run initially and then re-run whenever their dependencies change:

```typescript
// From reactivity.ts
export function effect(fn: EffectFn): EffectFn {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };

  // Run immediately
  effectFn();
  return effectFn;
}
```

### 4. DOM Updates

The rendering system uses effects to automatically update the DOM when reactive state changes:

```typescript
// From renderer.ts
export function createApp(component: () => VNode, container: HTMLElement): void {
  effect(() => {
    container.innerHTML = '';
    const vnode = component();
    mount(vnode, container);
  });
}
```

## Running the Demo

To run this project:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown in the terminal.

## Demo Features

The demo shows several reactivity concepts:

1. **Reactive Objects**: Using `reactive()` to make object properties reactive
2. **Primitive Values**: Using `ref()` to make primitive values reactive
3. **Computed Values**: Using `computed()` to create derived values that update when dependencies change
4. **DOM Binding**: Automatic DOM updates when state changes

## Project Structure

- `src/reactivity.ts` - The core reactivity system
- `src/renderer.ts` - Simple virtual DOM renderer that connects to the reactivity system
- `src/main.ts` - Demo application with examples 