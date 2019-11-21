const request = require("supertest");
const app = require("../app");

exports.register = async () =>
  await request(app)
    .post("/api/users/register")
    .send({
      name: "test",
      email: "test@example.com",
      password: "password",
      password2: "password"
    });

exports.login = async () =>
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@example.com",
      password: "password"
    });

exports.createPost = async (token, decoded) =>
  await request(app)
    .post("/api/posts")
    .set("Authorization", token)
    .send({
      text: "I am the all father",
      name: decoded.name,
      avatar: "",
      user: decoded.id
    });
