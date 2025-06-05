import { Component } from "solid-js";
import { PerfMetrics } from "../types";

interface PerfMonitorProps {
  metrics: PerfMetrics;
}

const PerfMonitor: Component<PerfMonitorProps> = (props) => {
  const formatTime = (time: number) => {
    return time.toFixed(3);
  };

  return (
    <div class="metrics">
      <h3 class="text-lg font-semibold mb-2">性能监控</h3>
      <p>渲染次数: {props.metrics.renders}</p>
      <p>更新次数: {props.metrics.updates}</p>
      <p>最近更新时间: {formatTime(props.metrics.lastUpdateTime)} ms</p>
      <p>平均更新时间: {formatTime(props.metrics.avgUpdateTime)} ms</p>
      <p>总更新时间: {formatTime(props.metrics.totalUpdateTime)} ms</p>
    </div>
  );
};

export default PerfMonitor;
