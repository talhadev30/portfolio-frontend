import { createContext } from "react";

const PageRevealContext = createContext({
  loaderComplete: false,
  routeKey: null,
});

export default PageRevealContext;
