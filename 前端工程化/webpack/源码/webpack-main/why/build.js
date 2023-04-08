const webpack = require("../lib/webpack");
const config = require("./webpack.config");

// 1.创建一个对象: compiler
// 另外一个非常重要的对象: compilation
const compiler = webpack(config);

// 2.执行run方法, 开始对代码进行编译和打包
compiler.run((err, stats) => {
	if (err) {
		console.error(err);
	} else {
		console.log(stats);
	}
});
