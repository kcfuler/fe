
const bucket = new Set<() => void>();

const data = {
  text: 'hello world',
}

let activeEffect: () => void = () => { };

function createEffect(fn: () => void) {
  activeEffect = fn;
  fn();
}

const obj = new Proxy(data, {
  // 读取时添加副作用
  get(target: any, key) {
    bucket.add(activeEffect)
    return target[key]
  },

  // 修改的时候执行副作用
  set(target: any, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true
  }
})

createEffect(() => {
  document.body.innerText = obj.text
})

setTimeout(() => {
  data.text = 'hello vue3!'
}, 1000)