import { mockStore } from "../testUtils";
import { profileActionsMockData } from "../actionsMockData";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";
import {
  getCurrentProfile,
  getProfiles,
  deleteAccount,
  clearCurrentProfile,
  createProfile
} from "./profileActions";

import moxios from "moxios";

describe("profileActions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("it should get current profile on GET_PROFILE", async done => {
    const response = profileActionsMockData.getProfileData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: PROFILE_LOADING },
      {
        type: GET_PROFILE,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(getCurrentProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("it should get all profiles on GET_PROFILES", async done => {
    const response = profileActionsMockData.getProfilesData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: PROFILE_LOADING },
      {
        type: GET_PROFILES,
        payload: response
      }
    ];

    const store = mockStore({});

    await store.dispatch(getProfiles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should SET_CURRENT_USER to empty object on delete user", async done => {
    // const response = profileActionsMockData.getProfilesData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
        // response: response
      });
    });

    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        payload: {}
      }
    ];

    global.window = jest.fn();

    const store = mockStore({});

    await store.dispatch(deleteAccount(global.window)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should GET_ERRORS on failed create profile", async done => {
    const response = {
      error: "There was an error creating profile"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: response
      });
    });

    const expectedActions = [
      {
        type: GET_ERRORS,
        payload: response
      }
    ];

    const push = jest.fn();

    const history = {
      push: push
    };

    const store = mockStore({});

    await store.dispatch(createProfile({}, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    done();
  });

  it("should CLEAR_CURRENT_PROFILE", () => {
    const expectedActions = [{ type: CLEAR_CURRENT_PROFILE }];

    const store = mockStore({});
    store.dispatch(clearCurrentProfile());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
