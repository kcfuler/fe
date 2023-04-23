new Promise(() => {
  throw new Error();
})
  .then(
    () => {
      console.log(1);
    },
    () => {
      console.log(2);
    }
  )
  .catch((err) => {
    console.log(3);
    console.log("err", err);
  })
  .then(() => {
    console.log(4);
  });
