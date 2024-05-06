import Gallery from "../../model/Gallery";

import { authActions } from "../../store/slice/auth-slice";
import { galleryActions } from "../../store/slice/gallery_slice";
import { uiActions } from "../../store/slice/ui-slice";

import { calulateExpirationTime } from "../util/token_util";

export const loginUser = (enteredEmail, enterPassword, history) => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Log-in Pending!",
      })
    );

    //post login data in the body to backend server and get accessToken, refreshToken, expirationTime as a response
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enterPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        const expirationTime = calulateExpirationTime(data.expiresIn);

        //store them in local storage
        localStorage.setItem("userID", data.userID);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userImageCount", data.userImages.length);

        //update the auth-slice data
        dispatch(authActions.addLoginData());

        if (data.userImages.length !== 0) {
          //map the response data in to Gallery model
          const userImageList = data.userImages.map((image) =>
            Gallery(image._id, image.url)
          );

          //store the userImageList in the userGallery state in the gallerySlice
          dispatch(
            galleryActions.addUserGallery({
              userGallery: userImageList,
            })
          );
        }

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Login Successful!",
          })
        );

        //replace the route with "/"
        history.replace("/");
      } else if (response.status === 400) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "User Not Registered!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Login Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Login Failed!",
        })
      );
    }
  };
};
