//用户名正则，4到16位（字母，数字，下划线，减号）
var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
//输出 true
// console.log(uPattern.test("caibaojian"));

//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern =
  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//输出 true
// console.log("==" + pPattern.test("K123cp1!"));

//正整数正则
var posPattern = /^\d+$/;
//负整数正则
var negPattern = /^-\d+$/;
//整数正则
var intPattern = /^-?\d+$/;
// //输出 true
// console.log(posPattern.test("42"));
// //输出 true
// console.log(negPattern.test("-42"));
// //输出 true
// console.log(intPattern.test("-42"));

// 数字正则
const numPattern = /^\d+.?\d+$/;
// console.log("numPattern", numPattern.test("213.12312"));

//Email正则
var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//输出 true
// console.log(ePattern.test("99154507@qq.com"));

//手机号正则
var mPattern = /^1[34578]\d{9}$/; //http://caibaojian.com/regexp-example.html
//输出 true
console.log(mPattern.test("15507621888"));

//身份证号（18位）正则
var cP =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//输出 true
console.log(cP.test("11010519880605371X"));
