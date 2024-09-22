(function (modules) {
  // webpack运行时代码
  var installedModules = {};

  function __webpack_require__(moduleId) {
    // 检查模块是否在缓存中
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 创建新模块并放入缓存
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    // 执行模块函数
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__,
    );
    // 标记模块为已加载
    module.l = true;
    // 返回模块的exports
    return module.exports;
  }

  // 加载入口模块并返回exports
  return __webpack_require__(0);
})([
  /* 0 */
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);

    Object(_logger_js__WEBPACK_IMPORTED_MODULE_1__["log"])(
      "Result: " + Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["add"])(5, 3),
    );
  },
  /* 1 */
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_exports__["add"] = function (a, b) {
      return a + b;
    };
  },
  /* 2 */
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_exports__["log"] = function (message) {
      console.log(message);
    };
  },
]);
