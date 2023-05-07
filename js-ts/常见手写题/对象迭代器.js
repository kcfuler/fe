let obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function*() {
    for (let key in this) {
      yield [key, this[key]]
    }
  }
}

for(let [key, value] of obj) {
  console.log(key, value)
}
