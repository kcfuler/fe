const arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

const target = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [],
      },
    ],
  },
];
const convertToTree = (arr) => {
  const map = new Map();
  for (const item of arr) {
    map.set(item.id, item);
  }
  let res = null;
  for (const item of arr) {
    if (item.pid === 0) {
      res = item;
      continue;
    }
    const parent = map.get(item.pid);
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(item);
  }
  return res;
};
console.dir(convertToTree(arr), { depth: null });
