import React, { memo } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 使用 memo 优化 TodoItem 组件
const TodoItem: React.FC<TodoItemProps> = memo(
  ({ todo, onToggle, onDelete }) => {
    return (
      <li className="todo-item py-3 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-4 w-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span
            className={`${
              todo.completed
                ? "completed text-gray-500"
                : "text-gray-800 dark:text-gray-200"
            }`}
          >
            {todo.text}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          删除
        </button>
      </li>
    );
  }
);

export default TodoItem;
