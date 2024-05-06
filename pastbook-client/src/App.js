import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import MainGalleryPage from "./pages/MainGalleryPage";
import UserGalleryPage from "./pages/UserGalleryPage";
import Notification from "./components/UI/Notification";

function App() {
  //get the isAuthenticated state from the store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //get the notification state from the store
  const notification = useSelector((state) => state.ui.notification);

  return (
    <React.Fragment>
      {/* only shows Notification component if the notification is not null */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {/* only shows the AuthPage if the isAuthenticated state is false or else the rest of the routes are shown! */}
      <Layout>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated && <AuthPage />}
            {isAuthenticated && <MainGalleryPage />}
          </Route>
          <Route path="/usergallery">
            {!isAuthenticated && <Redirect to="/" />}
            {isAuthenticated && <UserGalleryPage />}
          </Route>
          {/* future feature : profile update */}
          {/* <Route path="/profile">
            {!isAuthenticated && <Redirect to="/" />}
            {isAuthenticated && <ProfilePage />}
          </Route> */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </React.Fragment>
  );
}

export default App;
