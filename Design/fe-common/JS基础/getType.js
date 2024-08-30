function getType(data) {
  return Object.prototype.toString
    .call(data)
    .match(/^\[object (\w+)]$/)[1]
    .toLowerCase();
}

console.log(getType(""));
