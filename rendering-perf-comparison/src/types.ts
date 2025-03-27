// 待办事项类型
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 性能指标类型
export interface PerfMetrics {
  renders: number;
  updates: number;
  lastUpdateTime: number;
  avgUpdateTime: number;
  totalUpdateTime: number;
}
