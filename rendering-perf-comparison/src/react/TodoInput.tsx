import React, { ChangeEvent, KeyboardEvent } from "react";

interface TodoInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => {
  // 处理回车键
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="添加新的待办事项..."
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      />
      <button onClick={onAdd} className="btn btn-primary">
        添加
      </button>
    </div>
  );
};

export default TodoInput;
