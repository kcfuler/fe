import React, { memo } from "react";
import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 使用 memo 优化 TodoList 组件，只有当 todos 发生变化时才重新渲染
const TodoList: React.FC<TodoListProps> = memo(
  ({ todos, onToggle, onDelete }) => {
    return (
      <div className="todo-list my-6">
        <h3 className="text-lg font-semibold mb-3">
          待办事项列表 ({todos.length})
        </h3>

        {todos.length === 0 ? (
          <p className="text-gray-500">没有待办事项</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default TodoList;
