function* coroutine1() {
  console.log('Coroutine 1: started');
  yield;
  console.log('Coroutine 1: resumed');
}

function* coroutine2() {
  console.log('Coroutine 2: started');
  yield;
  console.log('Coroutine 2: resumed');
}

// 调度器函数，轮流执行每个协程直到它们都完成
function scheduler(coroutines: Generator[]) {
  while (coroutines.length > 0) {
    for (let i = 0; i < coroutines.length; i++) {
      const coroutine = coroutines[i];
      const { done } = coroutine.next();
      if (done) {
        // 移除已完成的协程
        coroutines.splice(i, 1);
        i--; // 修正数组索引
      }
    }
  }
}

// 创建协程实例
const coroutines = [coroutine1(), coroutine2()];

// 开始调度执行协程
scheduler(coroutines);