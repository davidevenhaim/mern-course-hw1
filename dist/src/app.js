"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT;
server_1.default.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
//# sourceMappingURL=app.js.map