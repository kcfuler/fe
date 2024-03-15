// 核心思路就是将
const handleOption = (params) => {
  console.log("从始至终只用执行一次 if ... else ...");

  if (params === "A") {
    return () => console.log("A");
  } else {
    return () => console.log("others");
  }
};

const temp = handleOption("A");

temp();
temp();
temp();
