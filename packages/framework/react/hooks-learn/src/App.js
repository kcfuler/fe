"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useLatest_1 = __importDefault(require("./hooks/useLatest"));
function App() {
    const [count, setCount] = (0, react_1.useState)(0);
    const ref = (0, useLatest_1.default)(count);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setCount(ref.current + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (<>
      <div>自定义Hooks: useLatest</div>
      <div>count: {count}</div>
    </>);
}
exports.default = App;
