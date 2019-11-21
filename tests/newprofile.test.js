const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const { register, login } = require("./userTestsUtils");
const {
  createProfile,
  addExperience,
  addEducation
} = require("./profileTestsUtils");

describe("/api/profile", () => {
  describe("GET endpoints", () => {
    it("should get all profiles - /api/profile", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      await createProfile(token);
      const getAllProfilesRes = await request(app).get("/api/profile/all");

      expect(getAllProfilesRes.statusCode).toBe(200);
      expect(getAllProfilesRes.body.length).toBe(1);
      expect(getAllProfilesRes.type).toBe("application/json");

      done();
    });

    it("should get current user profile - /api/profile", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      await createProfile(token);
      const getCurrentUserProfileRes = await request(app)
        .get("/api/profile")
        .set("Authorization", token);

      expect(getCurrentUserProfileRes.statusCode).toBe(200);
      expect(getCurrentUserProfileRes.body).toHaveProperty("_id");
      expect(getCurrentUserProfileRes.type).toBe("application/json");

      done();
    });

    it("should get profile by handle - /api/profile/handle/:handle", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      const createUserProfile = await createProfile(token);
      const getProfileByHandle = await request(app).get(
        `/api/profile/handle/${createUserProfile.body.handle}`
      );

      //   console.log(getProfileByHandle.body);

      expect(getProfileByHandle.statusCode).toBe(200);
      expect(getProfileByHandle.body).toHaveProperty("_id");
      expect(getProfileByHandle.type).toBe("application/json");

      done();
    });

    it("should get profile by id - /api/profile/user/:id", async done => {
      const registerRes = await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      await createProfile(token);
      const getProfileById = await request(app).get(
        `/api/profile/user/${registerRes.body._id}`
      );

      //   console.log(getProfileById.body);

      expect(getProfileById.statusCode).toBe(200);
      expect(getProfileById.body).toHaveProperty("_id");
      expect(getProfileById.type).toBe("application/json");

      done();
    });
  });

  describe("POST and DELETE endpoints", () => {
    it("should create and edit user profile - /api/profile", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      const createNewProfile = await createProfile(token);

      //   console.log(createNewProfile.body);

      const editProfile = await request(app)
        .post("/api/profile")
        .set("Authorization", token)
        .send({
          handle: "new test",
          company: "new test company",
          website: "www.newtest.io",
          location: "new test city",
          status: "new Senior Developer",
          skills: "new,HTML,CSS,Javascript",
          githubusername: "test",
          bio: "new I am a test",
          twitter: "https://www.twitter.com/newtest",
          facebook: "https://www.facebook.com/newtest",
          linkedin: "https://www.linkedin.com/newtest",
          youtube: "https://www.youtube.com/newtest",
          instagram: "https://www.instagram.com/newtest"
        });

      //   console.log(editProfile.body);
      expect(createNewProfile.statusCode).toBe(200);
      expect(createNewProfile.type).toBe("application/json");

      expect(editProfile.statusCode).toBe(200);
      expect(editProfile.type).toBe("application/json");

      done();
    });

    it("should add experience to profile and remove it - /api/profile/experience && /api/profile/experience/:expId", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      await createProfile(token);

      //   console.log(createNewProfile.body);

      const addExperienceToProfile = await addExperience(token);
      const expId = addExperienceToProfile.body._id;

      //   console.log(addExperienceToProfile.body);

      const removeExperienceFromProfile = await request(app)
        .delete(`/api/profile/experience/${expId}`)
        .set("Authorization", token);

      //   console.log(removeExperienceFromProfile.body);

      expect(addExperienceToProfile.statusCode).toBe(200);
      expect(addExperienceToProfile.body.experience.length).toBe(1);
      expect(addExperienceToProfile.type).toBe("application/json");

      expect(removeExperienceFromProfile.statusCode).toBe(200);
      expect(removeExperienceFromProfile.body.experience.length).toBe(0);
      expect(removeExperienceFromProfile.type).toBe("application/json");

      done();
    });

    it("should add education to profile and remove it - /api/profile/education && /api/profile/education/:eduId", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      await createProfile(token);

      //   console.log(createNewProfile.body);

      const addEducationToProfile = await addEducation(token);
      const eduId = addEducationToProfile.body._id;

      //   console.log(addEducationToProfile.body);

      const removeEducationFromProfile = await request(app)
        .delete(`/api/profile/education/${eduId}`)
        .set("Authorization", token);

      //   console.log(removeEducationFromProfile.body);

      expect(addEducationToProfile.statusCode).toBe(200);
      expect(addEducationToProfile.body.education.length).toBe(1);
      expect(addEducationToProfile.type).toBe("application/json");

      expect(removeEducationFromProfile.statusCode).toBe(200);
      expect(removeEducationFromProfile.body.education.length).toBe(0);
      expect(removeEducationFromProfile.type).toBe("application/json");

      done();
    });

    it("should delete user and profile - /api/profile", async done => {
      await register();

      const loginRes = await login();
      const token = loginRes.body.token;

      const createNewProfile = await createProfile(token);

      //   console.log(createNewProfile.body);

      const deleteUserAndProfile = await request(app)
        .delete("/api/profile")
        .set("Authorization", token);

      //   console.log(deleteUserAndProfile.body);

      expect(deleteUserAndProfile.statusCode).toBe(200);
      expect(deleteUserAndProfile.type).toBe("application/json");
      expect(deleteUserAndProfile.body.success).toBe(true);

      done();
    });
  });
});
