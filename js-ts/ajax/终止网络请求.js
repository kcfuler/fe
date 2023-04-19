const controller = new AbortController();
const signal = controller.signal;

fetch("https://baidu.com", { signal })
  .then((res) => console.log(res))
  .finally((err) => {
    console.log(err);
  });

controller.abort();
