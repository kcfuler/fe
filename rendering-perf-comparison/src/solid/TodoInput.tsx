import { Component } from "solid-js";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const TodoInput: Component<TodoInputProps> = (props) => {
  // 处理回车键
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onAdd();
    }
  };

  // 处理输入变化
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.onChange(target.value);
  };

  return (
    <div class="flex items-center mb-6">
      <input
        type="text"
        value={props.value}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="添加新的待办事项..."
        class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      />
      <button onClick={props.onAdd} class="btn btn-primary">
        添加
      </button>
    </div>
  );
};

export default TodoInput;
