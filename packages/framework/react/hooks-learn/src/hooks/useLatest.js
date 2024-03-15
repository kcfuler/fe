"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useLatest = (value) => {
    const ref = (0, react_1.useRef)(value);
    ref.current = value;
    return ref;
};
exports.default = useLatest;
