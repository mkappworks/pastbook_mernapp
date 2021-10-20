import Gallery from "../../model/Gallery";

import { galleryActions } from "../../store/slice/gallery_slice";
import { uiActions } from "../../store/slice/ui-slice";
import { checkTokenExpired } from "../util/token_util";

export const fetchUserGallery = () => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Fetch User Gallery Images Pending!",
      })
    );

    //check whehter the access token in expired. If expired the function
    //will call the udpateToken() function
    checkTokenExpired();

    //get request to backend server and get image data
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/gallery/images`;

      const accessToken = localStorage.getItem("accessToken");
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("userImageCount", data.userImages.length);

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
            message: "Fetch User Gallery Images Successful!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetch User Gallery Images Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetch User Gallery Images Failed!",
        })
      );
    }
  };
};
