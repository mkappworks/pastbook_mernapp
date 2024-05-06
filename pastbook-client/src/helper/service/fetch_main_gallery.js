import Gallery from "../../model/Gallery";

import { galleryActions } from "../../store/slice/gallery_slice";
import { uiActions } from "../../store/slice/ui-slice";
import { checkTokenExpired } from "../util/token_util";

export const fetchMainGallery = () => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Fetch Main Gallery Images Pending!",
      })
    );

    //check whehter the access token in expired. If expired the function 
    //will call the udpateToken() function
    checkTokenExpired();

    //get request to backend server and get image data
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/gallery/`;

      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        //map the response data in to Gallery model
        const mainImageList = data.map((image) =>
          Gallery(image._id, image.url)
        );

        //store the mainImageList in the mainGallery state in the gallerySlice
        dispatch(
          galleryActions.addMainGallery({
            mainGallery: mainImageList,
          })
        );

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Fetch Main Gallery Images Successful!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetch Main Gallery Images Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetch Main Gallery Images Failed!",
        })
      );
    }
  };
};
