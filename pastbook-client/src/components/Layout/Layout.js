import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

//fn with the layout of the website
//navbar and the body
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
