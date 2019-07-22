import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

import reducers from "../client/reducers";

export default req => {
  // This instance of `axios` will prepend the `baseURL` to each request
  // with the original cookie the came with the initial browser request.
  // making sure all requests will go to the api server.
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: {
      cookie: req.get("cookie") || ""
    }
  });
  const store = createStore(
    reducers,
    {},
    // `withExtraArgument` lets us inject a custom argument that
    // we can use later in the action creators, e.g `fetchUsers(dispatch, getState, api)
    // the last argument `api` is the `axiosInstance` we are injecting.
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
  return store;
};
