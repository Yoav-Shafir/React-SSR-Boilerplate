import React from "react";

// `staticContext` is something that we have only on the server side rendering.
// on the browser it doesnt exists, this is why we default it to an empty object.
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h3>Ooops, page not found :(</h3>;
};

export default {
  component: NotFoundPage
};
