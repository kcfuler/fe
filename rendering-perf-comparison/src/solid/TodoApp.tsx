import { createSignal, createEffect, onMount } from "solid-js";
import { Todo, PerfMetrics } from "../types";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import PerfMonitor from "./PerfMonitor";

// 初始待办事项数
const INITIAL_TODO_COUNT = 1000;

// 生成初始待办事项列表
const generateInitialTodos = (): Todo[] => {
  const todos: Todo[] = [];
  for (let i = 1; i <= INITIAL_TODO_COUNT; i++) {
    todos.push({
      id: i,
      text: `待办事项 #${i}`,
      completed: false,
    });
  }
  return todos;
};

const TodoApp = () => {
  // 响应式状态 (Signals)
  const [todos, setTodos] = createSignal<Todo[]>(generateInitialTodos());
  const [input, setInput] = createSignal<string>("");
  const [metrics, setMetrics] = createSignal<PerfMetrics>({
    renders: 0,
    updates: 0,
    lastUpdateTime: 0,
    avgUpdateTime: 0,
    totalUpdateTime: 0,
  });

  // 增加待办事项
  const addTodo = () => {
    if (input().trim()) {
      const startTime = performance.now();

      setTodos([
        ...todos(),
        {
          id: Date.now(),
          text: input(),
          completed: false,
        },
      ]);

      setInput("");

      const endTime = performance.now();
      const updateTime = endTime - startTime;

      setMetrics((prev) => ({
        renders: prev.renders + 1,
        updates: prev.updates + 1,
        lastUpdateTime: updateTime,
        totalUpdateTime: prev.totalUpdateTime + updateTime,
        avgUpdateTime: (prev.totalUpdateTime + updateTime) / (prev.updates + 1),
      }));
    }
  };

  // 切换完成状态
  const toggleTodo = (id: number) => {
    const startTime = performance.now();

    setTodos(
      todos().map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const endTime = performance.now();
    const updateTime = endTime - startTime;

    setMetrics((prev) => ({
      renders: prev.renders + 1,
      updates: prev.updates + 1,
      lastUpdateTime: updateTime,
      totalUpdateTime: prev.totalUpdateTime + updateTime,
      avgUpdateTime: (prev.totalUpdateTime + updateTime) / (prev.updates + 1),
    }));
  };

  // 删除待办事项
  const deleteTodo = (id: number) => {
    const startTime = performance.now();

    setTodos(todos().filter((todo) => todo.id !== id));

    const endTime = performance.now();
    const updateTime = endTime - startTime;

    setMetrics((prev) => ({
      renders: prev.renders + 1,
      updates: prev.updates + 1,
      lastUpdateTime: updateTime,
      totalUpdateTime: prev.totalUpdateTime + updateTime,
      avgUpdateTime: (prev.totalUpdateTime + updateTime) / (prev.updates + 1),
    }));
  };

  // 组件挂载时记录初始渲染
  onMount(() => {
    setMetrics((prev) => ({
      ...prev,
      renders: prev.renders + 1,
    }));
  });

  return (
    <div class="w-full max-w-4xl">
      <div class="perf-card solid-card mb-6">
        <h2 class="text-xl font-bold mb-4">Solid.js 待办事项应用</h2>
        <p class="mb-2">使用细粒度响应系统和依赖追踪</p>
        <p class="text-sm">初始待办事项数量: {INITIAL_TODO_COUNT}</p>
      </div>

      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
        <TodoInput
          value={input()}
          onChange={(value: string) => setInput(value)}
          onAdd={addTodo}
        />

        <TodoList todos={todos()} onToggle={toggleTodo} onDelete={deleteTodo} />

        <PerfMonitor metrics={metrics()} />
      </div>
    </div>
  );
};

export default TodoApp;
