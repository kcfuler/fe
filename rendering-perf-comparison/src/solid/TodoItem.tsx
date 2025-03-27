import { Component } from "solid-js";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: Component<TodoItemProps> = (props) => {
  return (
    <li class="todo-item py-3 flex items-center justify-between">
      <div class="flex items-center">
        <input
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.onToggle(props.todo.id)}
          class="h-4 w-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span
          class={`${
            props.todo.completed
              ? "completed text-gray-500"
              : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {props.todo.text}
        </span>
      </div>
      <button
        onClick={() => props.onDelete(props.todo.id)}
        class="text-red-500 hover:text-red-700"
      >
        删除
      </button>
    </li>
  );
};

export default TodoItem;
