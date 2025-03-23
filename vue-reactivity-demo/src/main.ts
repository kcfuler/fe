/**
 * Demo Application
 *
 * This file demonstrates how our reactivity system connects to DOM updates.
 */

import { reactive, ref, computed } from "./reactivity";
import { createApp, h } from "./renderer";

// Main app initialization
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;

  // Create reactive state
  const state = reactive({
    count: 0,
    message: "Hello Vue Reactivity!",
  });

  // Create a reactive reference (for primitives)
  const name = ref("");

  // Create a computed property
  const greeting = computed(() => {
    return name.value ? `Hello, ${name.value}!` : "Enter your name above";
  });

  // Define how our component renders
  const AppComponent = () => {
    return h("div", {}, [
      // Display and update message
      h("div", { class: "message" }, [
        h("h2", {}, [state.message]),
        h("input", {
          value: state.message,
          onInput: (e: Event) => {
            state.message = (e.target as HTMLInputElement).value;
          },
        }),
      ]),

      // Counter example
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

      // Name input with computed property example
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

      // Explanation section
      h("div", { class: "explanation" }, [
        h("h2", {}, ["How It Works"]),
        h("p", {}, [
          "This demo shows a simple implementation of a Vue-like reactivity system. " +
            "When you update the state through user interactions, the DOM updates automatically.",
        ]),
        h("ol", {}, [
          h("li", {}, [
            "The reactive() function creates a Proxy around objects to track property access and changes.",
          ]),
          h("li", {}, [
            "The ref() function makes primitive values reactive by wrapping them in an object.",
          ]),
          h("li", {}, [
            "The effect() function registers a function to re-run when reactive data changes.",
          ]),
          h("li", {}, [
            "The computed() function creates a value that updates when its dependencies change.",
          ]),
          h("li", {}, [
            "Our renderer connects the reactivity system to DOM updates using effect().",
          ]),
        ]),
      ]),
    ]);
  };

  // Mount our app to the DOM
  createApp(AppComponent, app);
});
