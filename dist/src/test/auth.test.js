"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const newPostMessage = "this is my test post";
const newPostSender = "Noa";
let newPostId = " ";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
    mongoose_1.default.connection.close();
}));
describe("Testing Post API", () => {
    test("add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/post").send({
            message: newPostMessage,
            sender: newPostSender,
        });
        expect(response.statusCode).toEqual(200);
        const newPost = response.body;
        expect(newPost.message).toEqual(newPostMessage);
        expect(newPost.sender).toEqual(newPostSender);
    }));
    test("get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/post");
        expect(response.statusCode).toEqual(200);
    }));
    test("get post by Id ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/post/" + newPostId);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(newPostMessage);
        expect(response.body[0].sender).toEqual(newPostSender);
    }));
    test("get post by sender ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/post?sender=" + newPostSender);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(newPostMessage);
        expect(response.body[0].sender).toEqual(newPostSender);
    }));
    test("update post by id ", () => __awaiter(void 0, void 0, void 0, function* () {
        const postResponse = yield (0, supertest_1.default)(server_1.default).get("/post");
        const postId = postResponse.body[0]._id;
        console.log(postResponse.body);
        const response = yield (0, supertest_1.default)(server_1.default)
            .put("/post/" + postId)
            .send({ message: "this is my test post after update", sender: "Noaaa" })
            .expect(200);
        expect(response === null || response === void 0 ? void 0 : response.statusCode).toEqual(200);
        expect(response.body.message).not.toEqual(newPostMessage);
        expect(response.body.sender).not.toEqual(newPostSender);
    }));
});
// describe("Restric access without Auth / ", () => {
//   test("It should respond with error", async () => {
//     const response = await request(app).get("/post");
//     expect(response.statusCode).not.toEqual(200);
//   });
// });
//# sourceMappingURL=auth.test.js.map