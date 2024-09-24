/**
 * 1 + 2 + 3 + (4 + 5 * 6 / 7 - 8)
 */

/**
 * 思路：双栈 => 一个存储数字，一个存储符号
 * 优先级 => 通过定义优先级来实现
 *
 * case：
 * 1. 长数字 => 累加
 * 2. 括号 => 入栈
 * 3. 空格 => 前置去除
 * 4. 负号 => 单独处理
 */

function calculate(s) {
  // 去除空格
  s = s.replace(/\s/g, "");

  let nums = [];
  let ops = [];
  let priority = { "+": 1, "-": 1, "*": 2, "/": 2 };

  function compute() {
    let b = nums.pop();
    let a = nums.pop();
    let op = ops.pop();

    switch (op) {
      case "+":
        nums.push(a + b);
        break;
      case "-":
        nums.push(a - b);
        break;
      case "*":
        nums.push(a * b);
        break;
      case "/":
        nums.push(Math.trunc(a / b));
        break;
    }
  }

  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    // 处理数字
    if (c >= "0" && c <= "9") {
      let num = 0;
      // 处理多个位数的情况
      while (i < s.length && s[i] >= "0" && s[i] <= "9") {
        num = num * 10 + parseInt(s[i]);
        i++;
      }
      i--;

      nums.push(num);
    }
    // 处理括号
    else if (c === "(") {
      ops.push(c);
    } else if (c === ")") {
      // 完成括号内的计算
      while (ops[ops.length - 1] !== "(") {
        compute();
      }
      // 将左括号弹出
      ops.pop();
    }
    // 处理其它符号
    else {
      // 处理负数
      if (c === "-" && (i === 0 || s[i - 1] === "(" || s[i - 1] in priority)) {
        nums.push(0);
      }

      // 处理符号的优先级
      while (
        ops.length &&
        ops[ops.length - 1] !== "(" &&
        priority[c] <= priority[ops[ops.length - 1]]
      ) {
        compute();
      }

      ops.push(c);
    }
  }

  while (ops.length) {
    compute();
  }

  return nums[0];
}
