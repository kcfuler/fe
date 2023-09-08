Array.prototype.myMap =function(fn, thisValue){
  let res = [];
  thisValue = thisValue || [];
  // 使用reduce来代替for循环
  this.reduce(function(pre, cur, index, arr){
    return res.push(fn.call(thisValue, cur, index, arr));
  },[])
  return res;
}

let arr = [2,3,1,5];
arr.myMap(function(item,index,arr){
  console.log(item,index,arr);
})
