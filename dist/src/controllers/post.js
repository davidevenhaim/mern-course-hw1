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
const post_model_1 = __importDefault(require("../models/post_model"));
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getAllPosts");
        let posts = {};
        if (req.query.sender == null) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ sender: req.query.sender });
        }
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ error: "fail to get posts from db" });
    }
});
const getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getPostById : " + req.params.id);
    if ((req.params.id == null) || (req.params.id == undefined)) {
        res.status(400).send({
            status: "fail",
            message: res.err.message,
        });
    }
    try {
        const posts = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(400).send({
            status: "fail",
            message: res.err.message,
        });
    }
});
const addNewPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addNewPost");
    console.log(req.body);
    const post = new post_model_1.default({
        message: req.body.message,
        sender: req.body.sender,
    });
    try {
        const newPost = yield post.save();
        console.log("save post in db");
        res.status(200).send(newPost);
    }
    catch (err) {
        console.log("fail to save post in db");
        res.status(400).send({ error: "fail adding new post to db" });
    }
});
const updatePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updatePostById");
    console.log(req.body);
    if ((req.params.id == null) || (req.params.id == undefined)) {
        res.status(400).send({
            status: "fail",
            message: res.err.message,
        });
    }
    try {
        const updatePost = yield post_model_1.default.findOneAndUpdate(req.params.id, req.body);
        console.log("update post in db");
        const newPost = yield post_model_1.default.findById(updatePost._id);
        res.status(200).send(newPost);
    }
    catch (error) {
        res.status(400).send({ error: "fail update post in db" });
    }
});
module.exports = { getAllPosts, getPostById, addNewPost, updatePostById };
//# sourceMappingURL=post.js.map