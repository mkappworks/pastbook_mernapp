import { authActions } from "../../store/slice/auth-slice";
import { galleryActions } from "../../store/slice/gallery_slice";
import { uiActions } from "../../store/slice/ui-slice";

export const logoutUser = (history) => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Logging Out Pending!",
      })
    );

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/`;
      const refreshToken = localStorage.getItem("refreshToken");
      
      //post refreshToken in the body and accessToken in the Header to backend server to remove the refreshToken
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        // remove from the localstorage
        localStorage.removeItem("userID");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userImageCount");

        //reset the auth-data in the store
        dispatch(authActions.removeLoginData());
        dispatch(galleryActions.removeGallery());

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Logout Successful!",
          })
        );

        history.replace("/");
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Logout Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Logout Failed!",
        })
      );
    }
  };
};
