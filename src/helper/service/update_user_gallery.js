import { uiActions } from "../../store/slice/ui-slice";
import { galleryActions } from "../../store/slice/gallery_slice";
import { checkTokenExpired } from "../util/token_util";

export const updateUserGallery = (imageList) => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Save User Gallery Images Pending!",
      })
    );

    //check whehter the access token in expired. If expired the function
    //will call the udpateToken() function
    checkTokenExpired();

    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/images`;

      const imageIDs = imageList.map((image) => image.id);

      //patch user images in the body to backend server
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          imageIDs: imageIDs,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        dispatch(
          galleryActions.addUserGallery({
            userGallery: imageList,
          })
        );

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Save User Gallery Images Successful!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Save User Gallery Images Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Save User Gallery Images Failed!",
        })
      );
    }
  };
};
