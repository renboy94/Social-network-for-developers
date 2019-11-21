export const authActionsMockData = {
  loginUserData: {
    success: true,
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzAxMjg3MDRhNzAxNDRlZGI4ODhhOSIsIm5hbWUiOiJUaG9yIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9kNjY4YzI3Y2JhZDgxZmYwYmNkMGM0YWE3M2ZjM2Q4Mj9zPTIwMCZyPXBnJmQ9bW0iLCJpYXQiOjE1NzI4ODEyMjIsImV4cCI6MTU3Mjg4NDgyMn0.ENJ3oE8bFENo9tIB03oyxskFhhN4nCMMX-OnF1RuLl8"
  }
};

export const profileActionsMockData = {
  getProfileData: {
    skills: ["HTML", "CSS", "JAVASCRIPT"],
    _id: "5d838ad7b9f9cc41301d0ec3",
    user: {
      _id: "5d838aa9b9f9cc41301d0ec2",
      name: "tester",
      avatar:
        "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm"
    },
    handle: "tester",
    company: "Tester Inc",
    website: "tester.com",
    bio: "I am tester",
    status: "Developer",
    githubusername: "tester",
    experience: [],
    education: [],
    date: "2019-09-19T14:04:07.905Z",
    __v: 0
  },
  getProfilesData: [
    {
      social: {
        twitter: "http://twitter.com/renboy"
      },
      skills: ["HTML", "CSS", "JAVASCRIPT"],
      _id: "5ba6b102c3b7cb79d55184a6",
      user: {
        _id: "5ba6b0dac3b7cb79d55184a5",
        name: "Rendell E Lasola",
        avatar:
          "//www.gravatar.com/avatar/a462de38a1b1f33c944427600bacda05?s=200&r=pg&d=mm"
      },
      handle: "renboy",
      company: "Rensoft",
      website: "http://rensoft.com",
      status: "Developer",
      experience: [
        {
          current: false,
          _id: "5ba803a769c69a84b299eb17",
          title: "Game Developer",
          company: "Insomniac Games",
          location: "Somewhere, USA",
          from: "2017-01-11T00:00:00.000Z",
          to: "2018-09-05T00:00:00.000Z",
          description: "Part of Spider-Man Game"
        }
      ],
      education: [
        {
          current: false,
          _id: "5ba7facc998467832fff3271",
          school: "Dev Academy",
          degree: "Computer Science",
          fieldofstudy: "Software Development",
          from: "2013-06-06T00:00:00.000Z",
          to: "2017-04-04T00:00:00.000Z",
          description: "Development Course"
        }
      ],
      date: "2018-09-22T21:15:46.670Z",
      __v: 6,
      bio: "I am a legendary developer. Fear me.",
      githubusername: "renboy94"
    },
    {
      skills: ["HTML", "CSS", "JAVASCRIPT"],
      _id: "5d838ad7b9f9cc41301d0ec3",
      user: {
        _id: "5d838aa9b9f9cc41301d0ec2",
        name: "tester",
        avatar:
          "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm"
      },
      handle: "tester",
      company: "Tester Inc",
      website: "tester.com",
      bio: "I am tester",
      status: "Developer",
      githubusername: "tester",
      experience: [],
      education: [],
      date: "2019-09-19T14:04:07.905Z",
      __v: 0
    }
  ]
};

export const postActionsMockData = {
  addPostData: {
    _id: "5dc14ca25f6ece6a285a5fed",
    text: "This is a new post",
    name: "tester",
    avatar:
      "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm",
    user: "5d838aa9b9f9cc41301d0ec2",
    likes: [],
    comments: [],
    date: "2019-11-05T10:19:14.380Z",
    __v: 0
  },
  getPostsData: [
    {
      _id: "5dc14ca25f6ece6a285a5fed",
      text: "This is a new post",
      name: "tester",
      avatar:
        "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm",
      user: "5d838aa9b9f9cc41301d0ec2",
      likes: [],
      comments: [],
      date: "2019-11-05T10:19:14.380Z",
      __v: 0
    },
    {
      _id: "5bac3ba62cf6ed0f5cc721f5",
      text: "What is you favorite testing framework?",
      name: "Rendell E Lasola",
      avatar:
        "//www.gravatar.com/avatar/a462de38a1b1f33c944427600bacda05?s=200&r=pg&d=mm",
      user: "5ba6b0dac3b7cb79d55184a5",
      likes: [],
      comments: [
        {
          date: "2018-09-27T04:51:56.203Z",
          _id: "5bac61ecf29ac211bcb9dbaf",
          text: "My favorite is Jest",
          name: "Rendell E Lasola",
          avatar:
            "//www.gravatar.com/avatar/a462de38a1b1f33c944427600bacda05?s=200&r=pg&d=mm",
          user: "5ba6b0dac3b7cb79d55184a5"
        }
      ],
      date: "2018-09-27T02:08:38.943Z",
      __v: 41
    },
    {
      _id: "5bac324c3355680e4e09adf7",
      text: "What if your favorite Javascript framework?",
      name: "Rendell E Lasola",
      avatar:
        "//www.gravatar.com/avatar/a462de38a1b1f33c944427600bacda05?s=200&r=pg&d=mm",
      user: "5ba6b0dac3b7cb79d55184a5",
      likes: [
        {
          _id: "5d83963241a15b42a8bf427b",
          user: "5d838aa9b9f9cc41301d0ec2"
        },
        {
          _id: "5bac7c2a9628f10015c2edca",
          user: "5ba6b0dac3b7cb79d55184a5"
        }
      ],
      comments: [
        {
          date: "2018-09-27T07:58:25.587Z",
          _id: "5bac8da1b7f87d0015d44a6e",
          text: "React / Redux",
          name: "Rendell E Lasola",
          avatar:
            "//www.gravatar.com/avatar/a462de38a1b1f33c944427600bacda05?s=200&r=pg&d=mm",
          user: "5ba6b0dac3b7cb79d55184a5"
        }
      ],
      date: "2018-09-27T01:28:44.828Z",
      __v: 5
    }
  ],
  getPostData: {
    _id: "5dc14ca25f6ece6a285a5fed",
    text: "This is a new post",
    name: "tester",
    avatar:
      "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm",
    user: "5d838aa9b9f9cc41301d0ec2",
    likes: [],
    comments: [],
    date: "2019-11-05T10:19:14.380Z",
    __v: 0
  },
  likePostData: {
    _id: "5dc15769eac9de6d3d3860ab",
    text: "This is a new post",
    name: "tester",
    avatar:
      "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm",
    user: "5d838aa9b9f9cc41301d0ec2",
    likes: [
      {
        _id: "5dc15917eac9de6d3d3860ac",
        user: "5d838aa9b9f9cc41301d0ec2"
      }
    ],
    comments: [],
    date: "2019-11-05T11:05:13.497Z",
    __v: 1
  }
};
