const obj = {
  a: 1,
  get bar() {
    return this.a;
  },
};

const proxy = new Proxy(obj, {
  get(target, key, reveiver) {
    console.log("get", key);
    // 这里调用get方法，bar中的this指向的是 obj
    return target[key];
  },
});
