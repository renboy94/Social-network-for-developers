import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";
import profileReducer from "./profileReducer";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

describe("profileReducer", () => {
  it("should return initial state", () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it("should set loading to true if PROFILE_LOADING triggers", () => {
    expect(
      profileReducer(initialState, {
        type: PROFILE_LOADING
      }).loading
    ).toBe(true);
  });

  it("should set profile to payload on GET_PROFILE action and loading to false", () => {
    const profile = {
      id: 1,
      email: "thor@gmail.com"
    };
    const action = {
      type: GET_PROFILE,
      payload: profile
    };
    expect(profileReducer(initialState, action).loading).toBe(false);
    expect(profileReducer(initialState, action).profile).toBe(profile);
  });

  it("should set profiles to payload on GET_PROFILES action and loading to false", () => {
    const profiles = [
      {
        id: 1,
        email: "thor@gmail.com"
      },
      {
        id: 2,
        email: "loki@gmail.com"
      }
    ];
    const action = {
      type: GET_PROFILES,
      payload: profiles
    };
    expect(profileReducer(initialState, action).loading).toBe(false);
    expect(profileReducer(initialState, action).profiles).toBe(profiles);
  });

  it("should clear profile on CLEAR_CURRENT_PROFILE action", () => {
    expect(profileReducer(undefined, { type: CLEAR_CURRENT_PROFILE })).toEqual(
      initialState
    );
  });
});
