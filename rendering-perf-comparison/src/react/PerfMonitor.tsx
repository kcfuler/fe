import React, { memo } from "react";
import { PerfMetrics } from "../types";

interface PerfMonitorProps {
  metrics: PerfMetrics;
}

// 使用 memo 优化 PerfMonitor 组件
const PerfMonitor: React.FC<PerfMonitorProps> = memo(({ metrics }) => {
  const formatTime = (time: number) => {
    return time.toFixed(3);
  };

  return (
    <div className="metrics">
      <h3 className="text-lg font-semibold mb-2">性能监控</h3>
      <p>渲染次数: {metrics.renders}</p>
      <p>更新次数: {metrics.updates}</p>
      <p>最近更新时间: {formatTime(metrics.lastUpdateTime)} ms</p>
      <p>平均更新时间: {formatTime(metrics.avgUpdateTime)} ms</p>
      <p>总更新时间: {formatTime(metrics.totalUpdateTime)} ms</p>
    </div>
  );
});

export default PerfMonitor;
