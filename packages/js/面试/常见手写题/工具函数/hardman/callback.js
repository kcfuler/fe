/* 
1.使用ES6中的箭头函数可规避this指向的问题，否则需要用bind来绑定
2.setTimeout异步事件，会在同步事件执行完后再开始执行
3.实现链式调用，函数返回this即可
4.队列的使用
5.使用 next 函数实现任务执行的控制
*/

class _HardMan {
  constructor(name) {}

  restFirst(time) {}

  rest(time) {}

  wait(time) {}
  waitPrint() {}

  learn(subject) {}
}

const HardMan = function (name) {
  return new _HardMan(name);
};

HardMan("jack").restFirst(5).learn("chinese");
// //等待5秒..
// Start learning after 5 seconds
// I am jack
// Learning chinese

// HardMan("jack").rest(3).learn("computer");
// //等待3秒..
// I am jack
// Start learning after 3 seconds
