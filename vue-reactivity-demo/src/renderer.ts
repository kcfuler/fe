/**
 * DOM Rendering System
 *
 * This module provides functions to connect our reactivity system with the DOM,
 * allowing automatic UI updates when reactive state changes.
 */

import { effect } from "./reactivity";

/**
 * Type for a virtual DOM node or element
 */
type VNode = {
  tag: string;
  props?: Record<string, any>;
  children?: (VNode | string)[];
  el?: HTMLElement;
};

/**
 * Creates and mounts a component to the DOM
 *
 * @param component - Function that returns a virtual DOM tree
 * @param container - DOM element to mount the component to
 */
export function createApp(
  component: () => VNode,
  container: HTMLElement
): void {
  // Use effect to make the component reactive
  effect(() => {
    // Clear the container before each render
    container.innerHTML = "";

    // Create the component's virtual DOM tree
    const vnode = component();

    // Mount the virtual DOM to the real DOM
    mount(vnode, container);
  });
}

/**
 * Mounts a virtual DOM node to a real DOM element
 *
 * @param vnode - Virtual DOM node to mount
 * @param container - Container to mount the node to
 */
function mount(vnode: VNode, container: HTMLElement): void {
  // Create the actual DOM element
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  // Set attributes and properties
  if (vnode.props) {
    for (const key in vnode.props) {
      // Handle event listeners (e.g., onClick)
      if (key.startsWith("on") && key.length > 2) {
        const event = key.substring(2).toLowerCase();
        el.addEventListener(event, vnode.props[key]);
      } else {
        // Set regular attributes
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }

  // Handle children
  if (vnode.children) {
    vnode.children.forEach((child) => {
      if (typeof child === "string") {
        // Text node
        el.appendChild(document.createTextNode(child));
      } else {
        // Nested virtual DOM node
        mount(child, el);
      }
    });
  }

  // Add to the container
  container.appendChild(el);
}

/**
 * Creates a virtual DOM node
 *
 * @param tag - HTML tag name
 * @param props - Element attributes and properties
 * @param children - Child elements or text
 * @returns A virtual DOM node
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
