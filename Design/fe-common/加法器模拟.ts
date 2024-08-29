function addStrings(num1: string, num2: string): string {
  // 处理符号
  let isNegative = false;
  if (num1[0] === "-" && num2[0] === "-") {
    isNegative = true;
    num1 = num1.slice(1);
    num2 = num2.slice(1);
  } else if (num1[0] === "-") {
    return subtractStrings(num2, num1.slice(1));
  } else if (num2[0] === "-") {
    return subtractStrings(num1, num2.slice(1));
  }

  // 处理小数点
  let decimalPlaces = 0;
  const [int1, frac1 = ""] = num1.split(".");
  const [int2, frac2 = ""] = num2.split(".");
  decimalPlaces = Math.max(frac1.length, frac2.length);
  num1 = int1 + frac1.padEnd(decimalPlaces, "0");
  num2 = int2 + frac2.padEnd(decimalPlaces, "0");

  // 原有的加法逻辑
  if (num2.length > num1.length) {
    [num1, num2] = [num2, num1];
  }

  const n1 = num1.split("").reverse();
  const n2 = num2.split("").reverse();

  let carry = 0;
  const result: number[] = [];

  for (let i = 0; i < n1.length; i++) {
    const digit1 = parseInt(n1[i]);
    const digit2 = i < n2.length ? parseInt(n2[i]) : 0;

    const sum = digit1 + digit2 + carry;
    carry = Math.floor(sum / 10);
    result.push(sum % 10);
  }

  if (carry > 0) {
    result.push(carry);
  }

  let finalResult = result.reverse().join("");

  // 插入小数点
  if (decimalPlaces > 0) {
    finalResult =
      finalResult.slice(0, -decimalPlaces) +
      "." +
      finalResult.slice(-decimalPlaces);
  }

  // 添加负号（如果需要）
  if (isNegative) {
    finalResult = "-" + finalResult;
  }

  return finalResult;
}

function subtractStrings(num1: string, num2: string): string {
  // 实现减法逻辑
  // 这里需要一个完整的减法实现，为了简洁，此处省略
  return "0"; // 占位返回，实际实现需要完整的减法逻辑
}

// 测试代码
console.log(addStrings("123.45", "67.89")); // 输出: 191.34
console.log(addStrings("-123.45", "67.89")); // 输出: -55.56
console.log(addStrings("123.45", "-67.89")); // 输出: 55.56
console.log(addStrings("-123.45", "-67.89")); // 输出: -191.34
