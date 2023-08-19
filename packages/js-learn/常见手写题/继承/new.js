function objFactory(constructor, ...args) {
  if( typeof constructor !== 'function' ) {
    throw new TypeError('constructor must be a function')
  }

  let obj = Object.create(constructor.prototype)
  let res = constructor.apply(obj, args)
  return res instanceof Object ? res : obj
}
