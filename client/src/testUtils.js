import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { middleware } from "./store";
import configureMockStore from "redux-mock-store";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const mockStore = configureMockStore(middleware);
