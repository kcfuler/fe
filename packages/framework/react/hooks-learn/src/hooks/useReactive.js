"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useUpdate_1 = __importDefault(require("./useUpdate"));
const useCreation_1 = __importDefault(require("./useCreation"));
const useLatest_1 = __importDefault(require("./useLatest"));
const observer = (initialVal, cb) => {
    const proxy = new Proxy(initialVal, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            return typeof res === "object"
                ? observer(res, cb)
                : Reflect.get(target, key);
        },
        set(target, key, val) {
            const ret = Reflect.set(target, key, val);
            cb();
            return ret;
        },
    });
    return proxy;
};
const useReactive = (initialState) => {
    const ref = (0, useLatest_1.default)(initialState);
    const update = (0, useUpdate_1.default)();
    const state = (0, useCreation_1.default)(() => {
        return observer(ref.current, () => {
            update();
        });
    }, []);
    return state;
};
exports.default = useReactive;
