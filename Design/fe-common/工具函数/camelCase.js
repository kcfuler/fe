function toCamelCase(str) {
  // 将字符串转换为小写,并用空格替换所有非字母数字字符
  str = str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());

  // 确保第一个字符是小写
  return str.charAt(0).toLowerCase() + str.slice(1);
}

console.log(toCamelCase("hello_world")); // 输出: helloWorld
console.log(toCamelCase("The-stealth-warrior")); // 输出: theStealthWarrior
console.log(toCamelCase("A_B_C")); // 输出: aBC
