/**
 * DOM渲染系统
 *
 * 此模块提供函数来连接响应式系统与DOM，
 * 使UI能在响应式状态变化时自动更新。
 */

import { effect } from "./reactivity";

/**
 * 虚拟DOM节点或元素的类型
 */
type VNode = {
  tag: string;
  props?: Record<string, any>;
  children?: (VNode | string)[];
  el?: HTMLElement;
};

/**
 * 创建组件并将其挂载到DOM
 *
 * @param component - 返回虚拟DOM树的函数
 * @param container - 要挂载组件的DOM元素
 */
export function createApp(
  component: () => VNode,
  container: HTMLElement
): void {
  // 使用effect使组件具有响应性
  // 每次组件内状态变化，都会重新执行effect，直接实现挂载功能
  effect(() => {
    // 每次渲染前清空容器
    container.innerHTML = "";

    // 创建组件的虚拟DOM树
    const vnode = component();

    // 将虚拟DOM挂载到真实DOM
    mount(vnode, container);
  });
}

/**
 * 将虚拟DOM节点挂载到真实DOM元素
 *
 * @param vnode - 要挂载的虚拟DOM节点
 * @param container - 挂载节点的容器
 */
function mount(vnode: VNode, container: HTMLElement): void {
  // 创建实际的DOM元素
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  // 设置属性和特性
  if (vnode.props) {
    for (const key in vnode.props) {
      // 处理事件监听器（例如onClick）
      if (key.startsWith("on") && key.length > 2) {
        const event = key.substring(2).toLowerCase();
        el.addEventListener(event, vnode.props[key]);
      } else {
        // 设置常规属性
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }

  // 处理子节点
  if (vnode.children) {
    vnode.children.forEach((child) => {
      if (typeof child === "string") {
        // 文本节点
        el.appendChild(document.createTextNode(child));
      } else {
        // 嵌套的虚拟DOM节点
        mount(child, el);
      }
    });
  }

  // 添加到容器
  container.appendChild(el);
}

/**
 * 创建虚拟DOM节点
 *
 * @param tag - HTML标签名
 * @param props - 元素属性和特性
 * @param children - 子元素或文本
 * @returns 虚拟DOM节点
 */
export function h(
  tag: string,
  props?: Record<string, any>,
  children?: (VNode | string)[]
): VNode {
  return {
    tag,
    props,
    children,
  };
}
