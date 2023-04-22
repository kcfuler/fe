const source = axios.CancelToken.source();
axios
  .get("/api/data", {
    cancelToken: source.token,
  })
  .then((response) => {
    // 处理响应
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("请求已被取消：", error.message);
    } else {
      console.log("请求出错：", error.message);
    }
  });
source.cancel("请求已被⽤户取消");
