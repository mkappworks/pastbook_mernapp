import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../helper/service/logout_user";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSideNavBarOpen, setIsSideNavBarOpen] = useState(false);

  //fn to handle the opening and closing of sidebar when the menu button is clicked
  const handleClick = () => setIsSideNavBarOpen(!isSideNavBarOpen);
  //fn to handle when the link is selected the is isSideNavBarOpen is set false. This will close the sidebar when a item is clicked
  const closeMobileMenu = () => setIsSideNavBarOpen(false);
  //fn to call the logoutUser helper which in turn resets the states, removes the localstorage and
  //request the server to remove the refreshToken from the sever
  const logoutHandler = () => {
    dispatch(logoutUser(history));
    closeMobileMenu();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Past Book</div>

      {isAuthenticated && (
        <nav>
          <ul
            className={
              isSideNavBarOpen
                ? classes.header_side_bar
                : classes.header_top_bar
            }
          >
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Main Gallery
              </Link>
            </li>
            <li>
              <Link to="/usergallery" onClick={closeMobileMenu}>
                My Gallery
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
          <div className={classes.header_icon}>
            <button onClick={handleClick}>
              <i
                className={isSideNavBarOpen ? "fas fa-times" : "fas fa-bars"}
              />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
