let iterable = [1, 2, 3];

function createIterator(array) {
  let count = 0;
  return {
    next: function () {
      let res =
        count < array.length
          ? { value: array[count], done: false }
          : { value: undefined, done: true };
      count++;
      return res;
    },
  };
}

let myIterator = createIterator(iterable);

console.log(myIterator.next()); // {value: 1, done: false}
console.log(myIterator.next()); // {value: 2, done: false}
console.log(myIterator.next()); // {value: 3, done: false}
console.log(myIterator.next()); // {value: undefined, done: true}
