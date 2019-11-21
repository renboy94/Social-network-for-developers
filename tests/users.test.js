const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

describe("/api/users", () => {
  beforeEach(async () => {
    // for login
    await request(app)
      .post("/api/users/register")
      .send({
        name: "test",
        email: "test@example.com",
        password: "password",
        password2: "password"
      });
  });

  it("POST /api/users/register - should register a new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "rendell",
        email: "rendell@example.com",
        password: "password",
        password2: "password"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("rendell");
    expect(response.body.email).toBe("rendell@example.com");
  });

  it("POST /api/users/login - should login user && GET api/users/current - should get current user", async () => {
    // login user
    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@example.com",
        password: "password"
      });
    const decoded = jwt.decode(response.body.token.split(" ")[1]);

    expect(response.statusCode).toBe(200);
    expect(decoded.name).toBe("test");

    // get current user
    const currentUser = await request(app)
      .get("/api/users/current")
      .set("Authorization", response.body.token);

    expect(currentUser.statusCode).toBe(200);
    expect(currentUser.body.name).toBe("test");
    expect(currentUser.body.email).toBe("test@example.com");
  });
});
