import { Component, For, Show } from "solid-js";
import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: Component<TodoListProps> = (props) => {
  return (
    <div class="todo-list my-6">
      <h3 class="text-lg font-semibold mb-3">
        待办事项列表 ({props.todos.length})
      </h3>

      <Show
        when={props.todos.length > 0}
        fallback={<p class="text-gray-500">没有待办事项</p>}
      >
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <For each={props.todos}>
            {(todo) => (
              <TodoItem
                todo={todo}
                onToggle={props.onToggle}
                onDelete={props.onDelete}
              />
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default TodoList;
