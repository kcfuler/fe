namespace slice {
  interface User {
    name: string;
    age: number;
  }
  const obj: User = {
    name: "leon",
    age: 13,
  };

  const source = new Array<User>(obj);
  const aim: User[] = source.slice(0, 1);
  console.log("aim", aim);
  console.log("source", source);
  aim[0].name = "hello";
  console.log("obj", obj); // 数组中存储的是索引，且slice是浅拷贝，会影响到原对象，在进行操作的时候需要注意
}
