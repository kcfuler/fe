function myObjectCreate(proto) {
  if (typeof proto !== "object" || proto === null) {
    throw new TypeError("Argument must be an object");
  }

  function A() {}
  A.prototype = proto;
  return new A();
}
