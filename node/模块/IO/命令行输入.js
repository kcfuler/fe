const readline = require("readline");

// 创建一个函数来读取一行输入
function readLine(rl) {
  return new Promise((resolve) => {
    rl.on("line", resolve);
  });
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // 读取第一行
    const firstLine = await readLine(rl);
    const [N, V] = firstLine.split(" ").map(Number);

    // 读取物品信息
    const items = [];
    for (let i = 0; i < N; i++) {
      const line = await readLine(rl);
      const [v, w] = line.split(" ").map(Number);
      items.push([v, w]);
    }

    // 解决问题
    const result = solve(N, V, items);
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
}

function solve(N, V, items) {
  let dp = new Array(V + 1).fill(0);

  for (let i = 0; i < N; i++) {
    for (let j = V; j >= items[i][0]; j--) {
      dp[j] = Math.max(dp[j], dp[j - items[i][0]] + items[i][1]);
    }
  }

  return dp[V];
}

main();
