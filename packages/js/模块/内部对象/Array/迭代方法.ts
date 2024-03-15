namespace iterator {
  interface User {
    name: string;
    age: number;
  }

  let arr = [1, 2, 3, 4, 5];
  let obj: User = {
    name: "leon",
    age: 10,
  };
  arr.forEach(function resolver(item, index, array) {
    console.log("this", this);
    console.log("item", item, "index", index);
    console.log("array", array);
  }, obj);
}
