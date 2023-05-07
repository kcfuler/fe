function apply(context, args){
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn // 防止内存泄漏
  return result
}
