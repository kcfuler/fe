"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useUpdate() {
    const [, update] = (0, react_1.useReducer)((num) => num + 1, 0);
    return update;
}
exports.default = useUpdate;
