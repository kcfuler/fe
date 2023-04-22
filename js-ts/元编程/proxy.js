let obj = {
  name: "张三",
  age: 18,
};
let p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
});

console.log(p.name);
