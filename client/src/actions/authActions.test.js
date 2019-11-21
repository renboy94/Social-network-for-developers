import { SET_CURRENT_USER } from "../actions/types";
import { authActionsMockData } from "../actionsMockData";
import { loginUser, logoutUser } from "./authActions";
import { testStore, mockStore } from "../testUtils";
import jsonwebtoken from "jsonwebtoken";

import moxios from "moxios";

describe("authActions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("it logs in user", async done => {
    const userData = {
      email: "thor@gmail.com",
      password: "password"
    };

    const response = authActionsMockData.loginUserData;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const token = response.token.split(" ")[1];
    const expectedActions = [
      { type: SET_CURRENT_USER, payload: jsonwebtoken.decode(token) }
    ];

    const store = mockStore({});

    await store.dispatch(loginUser(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it("it logs out user", () => {
    const expectedActions = [{ type: SET_CURRENT_USER, payload: {} }];

    const store = mockStore({});
    store.dispatch(logoutUser());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
