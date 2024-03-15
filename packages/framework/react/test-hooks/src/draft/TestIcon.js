"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIcon = void 0;
const react_1 = require("react");
const iconoir_react_1 = require("iconoir-react");
exports.TestIcon = (0, react_1.memo)(() => {
    return (<iconoir_react_1.IconoirProvider iconProps={{
            color: "red",
            strokeWidth: 1,
            width: "1em",
            height: "1em",
        }}>
      <div>
        <iconoir_react_1.Check />
      </div>
    </iconoir_react_1.IconoirProvider>);
});
