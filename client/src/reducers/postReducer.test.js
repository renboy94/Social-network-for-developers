import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  LIKE_POST
} from "../actions/types";
import postReducer from "./postReducer";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

describe("postReducer", () => {
  it("should return initial state", () => {
    expect(postReducer(undefined, {})).toEqual(initialState);
  });

  it("should set loading to true if POST_LOADING triggers", () => {
    expect(
      postReducer(initialState, {
        type: POST_LOADING
      }).loading
    ).toBe(true);
  });

  it("should set profile to payload on GET_POSTS action and loading to false", () => {
    const posts = [
      {
        id: 1,
        post: "Hello world"
      },
      {
        id: 2,
        post: "Hello universe"
      }
    ];
    const action = {
      type: GET_POSTS,
      payload: posts
    };
    expect(postReducer(initialState, action).loading).toBe(false);
    expect(postReducer(initialState, action).posts).toBe(posts);
  });

  it("should set profile to payload on GET_POST action and loading to false", () => {
    const post = {
      id: 1,
      post: "Hello world"
    };
    const action = {
      type: GET_POST,
      payload: post
    };
    expect(postReducer(initialState, action).loading).toBe(false);
    expect(postReducer(initialState, action).post).toBe(post);
  });

  it("should add new post to posts on ADD_POST action", () => {
    const newInitialState = {
      posts: [
        {
          id: 1,
          post: "Hello world"
        }
      ],
      post: {},
      loading: false
    };
    const post = {
      id: 2,
      post: "Hello universe"
    };
    const action = {
      type: ADD_POST,
      payload: post
    };
    expect(postReducer(newInitialState, action).posts.length).toEqual(2);
  });

  it("should delete post from posts on DELETE_POST action", () => {
    const newInitialState = {
      posts: [
        {
          _id: 1,
          post: "Hello world"
        },
        {
          _id: 2,
          post: "Hello universe"
        }
      ],
      post: {},
      loading: false
    };
    const postId = 2;
    const action = {
      type: DELETE_POST,
      payload: postId
    };
    expect(postReducer(newInitialState, action).posts.length).toEqual(1);
  });

  describe("like and unlike post", () => {
    it("should like a post", () => {
      const newInitialState = {
        posts: [
          {
            _id: 1,
            post: "Hello world",
            likes: 1
          },
          {
            _id: 2,
            post: "Hello universe",
            likes: 1
          }
        ],
        post: {},
        loading: false
      };
      const updatedPost = {
        _id: 2,
        post: "Hello universe",
        likes: 2
      };
      const action = {
        type: LIKE_POST,
        payload: updatedPost //pass in updated post
      };
      expect(postReducer(newInitialState, action).posts[1]).toEqual(
        updatedPost
      );
    });

    it("should unlike a post", () => {
      const newInitialState = {
        posts: [
          {
            _id: 1,
            post: "Hello world",
            likes: 1
          },
          {
            _id: 2,
            post: "Hello universe",
            likes: 2
          }
        ],
        post: {},
        loading: false
      };
      const updatedPost = {
        _id: 2,
        post: "Hello universe",
        likes: 1
      };
      const action = {
        type: LIKE_POST,
        payload: updatedPost //pass in updated post
      };
      expect(postReducer(newInitialState, action).posts[1]).toEqual(
        updatedPost
      );
    });
  });
});
