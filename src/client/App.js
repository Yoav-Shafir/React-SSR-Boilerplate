import React from "react";
import { renderRoutes } from "react-router-config";
import { fetchCurrentUser } from "./actions";

import Header from "./components/Header";

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {/* This is where/how we render all the child components */}
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
