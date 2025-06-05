import React, { useState, useEffect, useCallback } from "react";
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

const TodoApp: React.FC = () => {
  // 状态
  const [todos, setTodos] = useState<Todo[]>(() => generateInitialTodos());
  const [input, setInput] = useState<string>("");
  const [metrics, setMetrics] = useState<PerfMetrics>({
    renders: 0,
    updates: 0,
    lastUpdateTime: 0,
    avgUpdateTime: 0,
    totalUpdateTime: 0,
  });

  // 增加待办事项
  const addTodo = useCallback(() => {
    if (input.trim()) {
      const startTime = performance.now();

      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: input,
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
  }, [input]);

  // 切换完成状态
  const toggleTodo = useCallback((id: number) => {
    const startTime = performance.now();

    setTodos((prev) =>
      prev.map((todo) =>
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
  }, []);

  // 删除待办事项
  const deleteTodo = useCallback((id: number) => {
    const startTime = performance.now();

    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    const endTime = performance.now();
    const updateTime = endTime - startTime;

    setMetrics((prev) => ({
      renders: prev.renders + 1,
      updates: prev.updates + 1,
      lastUpdateTime: updateTime,
      totalUpdateTime: prev.totalUpdateTime + updateTime,
      avgUpdateTime: (prev.totalUpdateTime + updateTime) / (prev.updates + 1),
    }));
  }, []);

  // 组件挂载时记录初始渲染
  useEffect(() => {
    setMetrics((prev) => ({
      ...prev,
      renders: prev.renders + 1,
    }));
  }, []);

  return (
    <div className="w-full max-w-4xl">
      <div className="perf-card react-card mb-6">
        <h2 className="text-xl font-bold mb-4">React 待办事项应用</h2>
        <p className="mb-2">使用虚拟 DOM 进行渲染和更新</p>
        <p className="text-sm">初始待办事项数量: {INITIAL_TODO_COUNT}</p>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
        <TodoInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onAdd={addTodo}
        />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        <PerfMonitor metrics={metrics} />
      </div>
    </div>
  );
};

export default TodoApp;
