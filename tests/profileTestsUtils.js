const request = require("supertest");
const app = require("../app");

exports.createProfile = async token =>
  await request(app)
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

exports.addExperience = async token =>
  await request(app)
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

exports.addEducation = async token =>
  await request(app)
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
