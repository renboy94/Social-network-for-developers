const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const { register, login } = require("./userTestsUtils");
const { createPost } = require("./postsTestUtils");

describe("/api/posts", () => {
  describe("GET endpoints", () => {
    it("should get all posts - /api/posts", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      await createPost(token, decoded);
      const getAllPostsRes = await request(app).get("/api/posts");

      expect(getAllPostsRes.statusCode).toBe(200);
      expect(getAllPostsRes.body.length).toBe(1);
      expect(getAllPostsRes.type).toBe("application/json");

      done();
    });

    it("should get single post - /api/posts/:id", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createNewPostRes = await createPost(token, decoded);
      const postId = createNewPostRes.body._id;
      const getSinglePostsRes = await request(app).get(`/api/posts/${postId}`);

      expect(getSinglePostsRes.statusCode).toBe(200);
      expect(getSinglePostsRes.body).toHaveProperty("_id");
      expect(getSinglePostsRes.type).toBe("application/json");

      done();
    });
  });

  describe("POST endpoints", () => {
    it("should create post - /api/posts", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createPostRes = await createPost(token, decoded);

      expect(createPostRes.statusCode).toBe(200);
      expect(createPostRes.type).toBe("application/json");

      done();
    });

    it("should like/unlike post - /api/posts/like/:id && /api/posts/unlike/:id", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createNewPostRes = await createPost(token, decoded);
      const postId = createNewPostRes.body._id;

      const likePostRes = await request(app)
        .post(`/api/posts/like/${postId}`)
        .set("Authorization", token);

      const unlikePostRes = await request(app)
        .post(`/api/posts/unlike/${postId}`)
        .set("Authorization", token);

      expect(likePostRes.statusCode).toBe(200);
      expect(likePostRes.body.likes.length).toBe(1);

      expect(unlikePostRes.statusCode).toBe(200);
      expect(unlikePostRes.body.likes.length).toBe(0);

      done();
    });

    it("should add comment to post - /api/posts/comment/:id", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createNewPostRes = await createPost(token, decoded);
      const postId = createNewPostRes.body._id;

      const addCommentToPostRes = await request(app)
        .post(`/api/posts/comment/${postId}`)
        .set("Authorization", token)
        .send({
          text: "I am also the king of asgard",
          name: decoded.name,
          avatar: "",
          user: decoded.id
        });

      expect(addCommentToPostRes.statusCode).toBe(200);
      expect(addCommentToPostRes.body.comments.length).toBe(1);

      done();
    });
  });

  describe("DELETE endpoints", () => {
    it("should delete comment from post - /api/posts/comment/:id", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createNewPostRes = await createPost(token, decoded);
      const postId = createNewPostRes.body._id;

      const addCommentToPostRes = await request(app)
        .post(`/api/posts/comment/${postId}`)
        .set("Authorization", token)
        .send({
          text: "I am also the king of asgard",
          name: decoded.name,
          avatar: "",
          user: decoded.id
        });

      const commentId = addCommentToPostRes.body.comments[0]._id;

      const delCommentFromPostRes = await request(app)
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .set("Authorization", token);

      expect(addCommentToPostRes.statusCode).toBe(200);
      expect(addCommentToPostRes.body.comments.length).toBe(1);

      expect(delCommentFromPostRes.statusCode).toBe(200);
      expect(delCommentFromPostRes.body.comments.length).toBe(0);

      done();
    });

    it("should delete single post - /api/posts/:id", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;
      const decoded = jwt.decode(token.split(" ")[1]);

      const createNewPostRes = await createPost(token, decoded);
      const postId = createNewPostRes.body._id;
      const delSinglePostsRes = await request(app)
        .delete(`/api/posts/${postId}`)
        .set("Authorization", token);

      expect(delSinglePostsRes.statusCode).toBe(200);
      expect(delSinglePostsRes.body.success).toBe(true);

      done();
    });
  });
});
