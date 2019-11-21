import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
import errorReducer from "./errorReducer";

describe("errorReducer", () => {
  it("should return initial state", () => {
    expect(errorReducer(undefined, {})).toEqual({});
  });

  it("should return errors on GET_ERRORS action", () => {
    const errors = {
      error: "error"
    };
    const action = {
      type: GET_ERRORS,
      payload: errors
    };
    expect(errorReducer(undefined, action)).toEqual(errors);
  });

  it("should clear errors on CLEAR_ERRORS action", () => {
    const action = {
      type: CLEAR_ERRORS
    };
    expect(errorReducer(undefined, action)).toEqual({});
  });
});
