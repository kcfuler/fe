// 核心就是逐层遍历原型链，直到找到原型或者没有原型时返回结果
let myInstanceOf = (target, origin) =>{
  while(target){
    if( target.__proto__ === origin.prototype ){
      return true;
    }
    target = target.__proto__;
  }
  return false
}

let a = [1, 2, 3];
console.log(myInstanceOf(a, Array));
