const request = require("supertest");
const app = require("../app");

let token;

const createProfile = async token => {
  return await request(app)
    .post("/api/profile")
    .set("Authorization", token)
    .send({
      handle: "test",
      company: "test company",
      website: "www.test.io",
      location: "test city",
      status: "Senior Developer",
      skills: "HTML,CSS,Javascript",
      githubusername: "test",
      bio: "I am a test",
      twitter: "https://www.twitter.com/test",
      facebook: "https://www.facebook.com/test",
      linkedin: "https://www.linkedin.com/test",
      youtube: "https://www.youtube.com/test",
      instagram: "https://www.instagram.com/test"
    });
};

describe("/api/profile", () => {
  beforeEach(async () => {
    // register user
    await request(app)
      .post("/api/users/register")
      .send({
        name: "test",
        email: "test@example.com",
        password: "password",
        password2: "password"
      });

    // login user
    const login = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@example.com",
        password: "password"
      });

    token = login.body.token;
  });

  describe("GET - /api/profile", () => {
    let id;
    beforeEach(async () => {
      const response = await createProfile(token);
      id = response.body.user;
    });

    it("should get all profiles", async () => {
      const response = await request(app).get("/api/profile/all");
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should get current user profile", async () => {
      const response = await request(app)
        .get("/api/profile")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    it("should get profile by handle", async () => {
      const response = await request(app)
        .get("/api/profile/handle/test")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });

    it("should get profile by id", async () => {
      const response = await request(app)
        .get(`/api/profile/user/${id}`)
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });
  });

  describe("POST - /api/profile", () => {
    describe("Create and edit user profile", () => {
      it("should create user profile", async () => {
        const response = await createProfile(token);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });

      it("should edit user profile", async () => {
        await createProfile(token);

        const response = await request(app)
          .post("/api/profile")
          .set("Authorization", token)
          .send({
            handle: "test2",
            company: "test2 company",
            website: "www.test2.io",
            location: "test2 city",
            status: "Software Architect",
            skills: "HTML,CSS,Javascript,PHP",
            githubusername: "test 2",
            bio: "I am a test 2",
            twitter: "https://www.twitter.com/test2",
            facebook: "https://www.facebook.com/test2",
            linkedin: "https://www.linkedin.com/test2",
            youtube: "https://www.youtube.com/test2",
            instagram: "https://www.instagram.com/test2"
          });
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
    });

    describe("Add and delete experience and education", () => {
      beforeEach(async () => {
        await createProfile(token);
      });

      it("should add experience to profile and delete it afterwards", async () => {
        // add experience
        const response = await request(app)
          .post("/api/profile/experience")
          .set("Authorization", token)
          .send({
            company: "Test company",
            title: "Test Developer",
            location: "New York",
            from: "01/13/2015",
            to: "01/10/2018",
            description: "I am a test developer"
          });

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body.experience.length).toBeGreaterThan(0);

        const exp_id = response.body.experience._id;

        // delete experience
        const deleteExp = await request(app)
          .delete(`/api/profile/experience/${exp_id}`)
          .set("Authorization", token);

        expect(deleteExp.statusCode).toBe(200);
        expect(deleteExp.type).toBe("application/json");
        expect(deleteExp.body.experience.length).toEqual(0);
      });

      it("should add education to profile and delete it afterwards", async () => {
        // add education
        const response = await request(app)
          .post("/api/profile/education")
          .set("Authorization", token)
          .send({
            school: "Test Academy",
            degree: "Computer Science",
            fieldofstudy: "Test study",
            from: "01/13/2005",
            to: "01/10/2010",
            description: "Test description"
          });

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body.education.length).toBeGreaterThan(0);

        const edu_id = response.body.experience._id;

        // delete education
        const deleteEdu = await request(app)
          .delete(`/api/profile/education/${edu_id}`)
          .set("Authorization", token);

        expect(deleteEdu.statusCode).toBe(200);
        expect(deleteEdu.type).toBe("application/json");
        expect(deleteEdu.body.education.length).toEqual(0);
      });
    });

    describe("Delete user and profile", () => {
      it("should delete user and profile", async () => {
        const response = await request(app)
          .delete("/api/profile")
          .set("Authorization", token);

        // console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });
});
