"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const depsAreSame = (oldDeps, deps) => {
    if (oldDeps === deps)
        return true;
    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i]))
            return false;
    }
    return true;
};
const useCreation = (fn, deps) => {
    const { current } = (0, react_1.useRef)({
        deps,
        obj: undefined,
        initialized: false,
    });
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = fn();
        current.initialized = true;
    }
    return current.obj;
};
exports.default = useCreation;
