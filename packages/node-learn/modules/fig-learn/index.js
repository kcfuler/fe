const figlet = require("figlet");

// figlet("can you support chinese? ", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// figlet.text(
//   "Boo!",
//   {
//     font: "Ghost",
//     horizontalLayout: "default",
//     verticalLayout: "default",
//     width: 80,
//     whitespaceBreak: true,
//   },
//   function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   }
// );

figlet.fonts(function (err, fonts) {
  if (err) {
    console.log("something went wrong...");
    console.dir(err);
    return;
  }
  console.dir(fonts);
});
