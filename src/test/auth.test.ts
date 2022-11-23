import request from "supertest";
import app from "../server"
import mongoose from "mongoose";
import Post from "../models/post_model";

const newPostMessage = "this is my test post";
const newPostSender = "Noa";
let newPostId = " ";

beforeAll(async () => {
  await Post.remove();
});

afterAll(async () => {
  await Post.remove();
  mongoose.connection.close();
});

describe("Testing Post API", () => {
  test("add new post", async () => {
    const response = await request(app).post("/post").send({
      message: newPostMessage,
      sender: newPostSender,
    });
    expect(response.statusCode).toEqual(200);
    const newPost = response.body;
    expect(newPost.message).toEqual(newPostMessage);
    expect(newPost.sender).toEqual(newPostSender);
  });

  test("get all posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toEqual(200);
  });

  test("get post by Id ", async () => {
    const response = await request(app).get("/post/" + newPostId);

    expect(response.statusCode).toEqual(200);
    expect(response.body[0].message).toEqual(newPostMessage);
    expect(response.body[0].sender).toEqual(newPostSender);
  });

  test("get post by sender ", async () => {
    const response = await request(app).get("/post?sender=" + newPostSender);
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].message).toEqual(newPostMessage);
    expect(response.body[0].sender).toEqual(newPostSender);
  });

  test("update post by id ", async () => {
    const postResponse = await request(app).get("/post");
    const postId = postResponse.body[0]._id;
    console.log(postResponse.body);
    const response = await request(app)
      .put("/post/" + postId)
      .send({ message: "this is my test post after update", sender: "Noaaa" })
      .expect(200);

    expect(response?.statusCode).toEqual(200);
    expect(response.body.message).not.toEqual(newPostMessage);
    expect(response.body.sender).not.toEqual(newPostSender);
  });
});

// describe("Restric access without Auth / ", () => {
//   test("It should respond with error", async () => {
//     const response = await request(app).get("/post");
//     expect(response.statusCode).not.toEqual(200);
//   });
// });
