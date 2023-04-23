function myBind(fn, context, ...args) {
  return function (...innerArgs) {
    let params = [...args.concat(innerArgs)];
    return fn.apply(context, params);
  };
}

function say(args) {
  console.log(this.name);
  console.log(args);
}

let obj = {
  name: "leon",
};

myBind(say, obj, [123])();
