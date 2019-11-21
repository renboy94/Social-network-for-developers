import { mockStore } from "../testUtils";
import { postActionsMockData } from "../actionsMockData";
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  LIKE_POST
} from "./types";

import moxios from "moxios";
import { addPost, getPosts, getPost, deletePost, addLike } from "./postActions";

describe("postActions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should ADD_POST on add new post", async done => {
    const response = postActionsMockData.addPostData;

    const newPost = {
      text: "This is a new post",
      name: "tester",
      avatar:
        "//www.gravatar.com/avatar/ce1c96ea158675f39e57c91bc50d7c16?s=200&r=pg&d=mm"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: CLEAR_ERRORS },
      {
        type: ADD_POST,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(addPost(newPost)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should GET_ERRORS on failed add new post", async done => {
    const response = {
      error: "There was an error adding new post"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: response
      });
    });

    const expectedActions = [
      { type: CLEAR_ERRORS },
      {
        type: GET_ERRORS,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(addPost({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should get all post with GET_POSTS", async done => {
    const response = postActionsMockData.getPostsData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: POST_LOADING },
      {
        type: GET_POSTS,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(getPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should get single post with GET_POST", async done => {
    const response = postActionsMockData.getPostData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: POST_LOADING },
      {
        type: GET_POST,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(getPost()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should delete single post with DELETE_POST", async done => {
    const postId = "5dc14ca25f6ece6a285a5fed";

    const response = {
      success: true
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      {
        type: DELETE_POST,
        payload: postId
      }
    ];

    const store = mockStore({});

    await store.dispatch(deletePost(postId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should like/unlike post with LIKE_POST", async done => {
    const postId = "5dc15769eac9de6d3d3860ab";

    const response = postActionsMockData.likePostData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      {
        type: LIKE_POST,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(addLike(postId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });
});
