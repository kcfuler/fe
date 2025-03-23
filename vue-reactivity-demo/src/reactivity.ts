/**
 * Vue-style Reactivity System in TypeScript
 *
 * This module implements a reactivity system similar to Vue's, which allows
 * for automatic DOM updates when reactive data changes.
 */

// Types for our reactivity system
type Dep = Set<EffectFn>;
type KeyToDepMap = Map<any, Dep>;
type EffectFn = () => void;

// Global state to track active effects
let activeEffect: EffectFn | null = null;
// WeakMap to store dependencies for each reactive object
const targetMap = new WeakMap<object, KeyToDepMap>();

/**
 * Tracks dependencies between reactive objects and effects
 * When a property is accessed during an effect, we record that dependency
 *
 * @param target - The reactive object being accessed
 * @param key - The property key being accessed
 */
function track(target: object, key: any): void {
  if (activeEffect) {
    // Get or create a map of dependencies for this target object
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // Get or create a set of effects for this property
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }

    // Add the current effect to the dependency set
    dep.add(activeEffect);
  }
}

/**
 * Triggers all effects that depend on a property when it changes
 *
 * @param target - The reactive object being modified
 * @param key - The property key that was modified
 */
function trigger(target: object, key: any): void {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    // Run all effects that depend on this property
    dep.forEach((effect) => {
      effect();
    });
  }
}

/**
 * Creates a reactive proxy around an object
 * Properties accessed within effects will be tracked
 * Property changes will trigger effects to run again
 *
 * @param target - The object to make reactive
 * @returns A reactive proxy of the target object
 */
export function reactive<T extends object>(target: T): T {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // Track that this property was accessed during the current effect
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // If the value actually changed, trigger dependent effects
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
  };

  // Return a proxy that intercepts property access and changes
  return new Proxy(target, handler);
}

/**
 * Interface for computed value object
 */
interface ComputedRef<T> {
  readonly value: T;
}

/**
 * Creates a computed property that automatically updates
 * when its dependencies change
 *
 * @param getter - Function that computes the value
 * @returns An object with a value property that returns the computed value
 */
export function computed<T>(getter: () => T): ComputedRef<T> {
  let value: T;
  let dirty = true;

  // This effect will mark the computed property as dirty
  // when any of its dependencies change
  const effect = () => {
    dirty = true;
  };

  return {
    get value() {
      // Only recompute value if dirty or first access
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
 * Creates an effect that runs immediately and re-runs
 * when any reactive properties accessed during the effect change
 *
 * @param fn - Function to run as an effect
 * @returns The effect function
 */
export function effect(fn: EffectFn): EffectFn {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };

  // Run the effect immediately
  effectFn();
  return effectFn;
}

/**
 * Interface for ref object
 */
interface Ref<T> {
  value: T;
}

/**
 * Creates a reactive reference to a value
 * Allows primitive values to be made reactive
 *
 * @param initialValue - Initial value for the ref
 * @returns A reactive object with a value property
 */
export function ref<T>(initialValue: T): Ref<T> {
  return reactive({ value: initialValue }) as Ref<T>;
}
