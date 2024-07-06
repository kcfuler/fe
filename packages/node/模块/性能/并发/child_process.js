import { spawn, fork, exec, execFile } from "child_process";

// 捕获标准输出并将其打印到控制台
child.stdout.on("data", (data) => {
  console.log(`标准输出：\n${data}`);
});

// 捕获标准错误输出并将其打印到控制台
child.stderr.on("data", (data) => {
  console.error(`标准错误输出：\n${data}`);
});

// 注册子进程关闭事件
child.on("close", (code) => {
  console.log(`子进程退出码：${code}`);
});
