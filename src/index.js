import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";

import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// Any request to "/api" will be forward to this domain.
app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    // This option is specifically for this application because of how the api server is configured
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    }
  })
);
// Tell express that this directory is available to the outside world.
// When the user hits the "/" route, express will send him
// an html with the <Home /> component rendered as an html.
// Then, after the user gets the html response, additional request for the `bundle.js` will be made
// which will make express check its `public` directory for any `bundle.js` file.
app.use(express.static("public"));
app.get("*", (req, res) => {
  // Create a Redux store.
  const store = createStore(req);

  // `matchRoutes` lets us figure out what is going to be rendered before it actually is rendered.
  // This is what we get for req.path = "/users"
  // [ { route:
  //   { loadData: [Function: loadData],
  //     path: '/users',
  //     component: [Function] },
  //  match: { path: '/users', url: '/users', isExact: true, params: {} } } ]
  let promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  // Make sure we "swallow" any errors so `Promise.all()` will not drop any further requests
  // and stop us from serving the page.
  promises = promises.map(promise => {
    // We ingonre `null` values.
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
    }
  });
  Promise.all(promises).then(response => {
    const context = {};
    // At this point store is stuffed with all the data we loaded
    // using the `loadData()` functions.
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(303, context.url);
    }

    if (context.notFound) res.status(404);
    res.send(content);
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
