// Startup point for the client side application.
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import axios from "axios";

import Routes from "./Routes";
import reducers from "./reducers";

// This instance of `axios` will prepend "/api"
// to every request. the request will go to the renderer server
// which knows to forward api request to the actual api server.
// This instance is being used by the client side.
const axiosInstance = axios.create({
  baseURL: "/api"
});

const store = createStore(
  reducers,
  // This is being injected by the server.
  // The store in the client must be in sync with the store that
  // the server had when rendering the content.
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// When this code is executed, the server side already rendered some content
// and pus it inside the `#root` div.
// React will not replace the rendered html from the server,
// it's just going to bring it to life(event handlers etc...).
// This process/technic is referred to as `hydration`.
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
