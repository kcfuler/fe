"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnmount = exports.useMount = void 0;
const react_1 = require("react");
const useLatest_1 = __importDefault(require("./useLatest"));
const useMount = (fn) => {
    (0, react_1.useEffect)(() => {
        fn === null || fn === void 0 ? void 0 : fn();
    }, []);
};
exports.useMount = useMount;
const useUnmount = (fn) => {
    const fnRef = (0, useLatest_1.default)(fn);
    (0, react_1.useEffect)(() => {
        return () => {
            fnRef.current();
        };
    }, []);
};
exports.useUnmount = useUnmount;
const useUnmountedRef = () => {
    const unmountedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        };
    }, []);
    return unmountedRef;
};
exports.default = useUnmountedRef;
