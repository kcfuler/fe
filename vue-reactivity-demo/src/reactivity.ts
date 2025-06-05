/**
 * Vue风格的响应式系统（TypeScript实现）
 *
 * 这个模块实现了一个类似Vue的响应式系统，能够在响应式数据变化时
 * 自动更新DOM。
 */

// 响应式系统的类型定义
type Dep = Set<EffectFn>; // 依赖集合类型
type KeyToDepMap = Map<any, Dep>; // 键到依赖映射类型
type EffectFn = () => void; // 副作用函数类型

// 全局状态，用于跟踪当前激活的副作用
let activeEffect: EffectFn | null = null;
// WeakMap存储每个响应式对象的依赖关系
const targetMap = new WeakMap<object, KeyToDepMap>();

/**
 * 跟踪响应式对象和副作用之间的依赖关系
 * 当在副作用函数执行期间访问属性时，记录该依赖关系
 *
 * @param target - 被访问的响应式对象
 * @param key - 被访问的属性键
 */
function track(target: object, key: any): void {
  if (activeEffect) {
    // 获取或创建该目标对象的依赖映射
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // 获取或创建该属性的副作用集合
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }

    // 将当前副作用添加到依赖集合中
    dep.add(activeEffect);
  }
}

/**
 * 当属性变化时触发所有依赖该属性的副作用
 *
 * @param target - 被修改的响应式对象
 * @param key - 被修改的属性键
 */
function trigger(target: object, key: any): void {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    // 执行所有依赖于该属性的副作用
    dep.forEach((effect) => {
      effect();
    });
  }
}

/**
 * 创建一个响应式对象的代理
 * 在副作用中访问的属性会被跟踪
 * 属性变化时会触发副作用重新运行
 *
 * @param target - 要设为响应式的对象
 * @returns 目标对象的响应式代理
 */
export function reactive<T extends object>(target: T): T {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 跟踪当前副作用中访问的属性
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // 如果值确实发生变化，触发依赖的副作用
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
  };

  // 返回一个拦截属性访问和修改的代理
  return new Proxy(target, handler);
}

/**
 * 计算属性值的接口
 */
interface ComputedRef<T> {
  readonly value: T;
}

/**
 * 创建一个计算属性，当其依赖项变化时自动更新
 *
 * @param getter - 计算值的函数
 * @returns 一个带有value属性的对象，返回计算后的值
 */
export function computed<T>(getter: () => T): ComputedRef<T> {
  let value: T;
  let dirty = true;

  // 这个副作用会在依赖项变化时将计算属性标记为脏
  const effect = () => {
    dirty = true;
  };

  return {
    get value() {
      // 只有在脏或首次访问时重新计算值
      if (dirty) {
        const previousEffect = activeEffect;
        activeEffect = effect;
        value = getter();
        dirty = false;
        activeEffect = previousEffect;
      }
      return value;
    },
  };
}

/**
 * 创建一个立即运行的副作用，当其中访问的任何响应式属性变化时重新运行
 *
 * @param fn - 作为副作用运行的函数
 * @returns 副作用函数
 */
export function effect(fn: EffectFn): EffectFn {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };

  // 立即运行副作用
  effectFn();
  return effectFn;
}

/**
 * ref对象的接口
 */
interface Ref<T> {
  value: T;
}

/**
 * 创建对值的响应式引用
 * 允许基本类型值变为响应式
 *
 * @param initialValue - ref的初始值
 * @returns 一个带有value属性的响应式对象
 */
export function ref<T>(initialValue: T): Ref<T> {
  return reactive({ value: initialValue }) as Ref<T>;
}
