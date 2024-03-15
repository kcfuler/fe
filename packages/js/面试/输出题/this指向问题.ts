/* 
1. 函数的this不是在定义的时候指定，而是在使用的时候动态获取
2. 箭头函数没有自己的this
3. 普通函数在被对象调用的时候，this指向对象
*/
namespace aaaaaa {
  const a = {
    b: () => {
      // console.log(this);
    },
    c: function () {
      console.log(this);
    }
  }

  a.b();
  const b = a.b;
  b();

  a.c();
  const c = a.c;
  c();
}
