Promise.reject(new Error("BOOM!")).catch(function (error) {
  console.error(error);
});
