import { SET_CURRENT_USER } from "../actions/types";
import authReducer from "./authReducer";

const initialState = {
  isAuthenticated: false,
  user: {}
};

describe("authReducer", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should set current user to payload on SET_CURRENT_USER action", () => {
    const mockUser = { id: 1, email: "thor@gmail.com" };
    const action = {
      type: SET_CURRENT_USER,
      payload: mockUser
    };
    expect(authReducer(initialState, action).user).toEqual(mockUser);
  });
});
