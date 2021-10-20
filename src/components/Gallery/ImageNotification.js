import { useDispatch } from "react-redux";
import { updateUserGallery } from "../../helper/service/update_user_gallery";

import classes from "./ImageNotification.module.css";

//section to display the number of images selected out of 9
const ImageNotification = (props) => {
  const dispatch = useDispatch();

  //calls the updateUserGallery helper fn update the userGallery state and the images array in a given User in th db
  const updateUserGalleryHandler = () => {
    dispatch(updateUserGallery(props.localUserGallery));
  };

  let message;

  //update the message depending on the props.messageType
  if (props.messageType === "saveSelection")
    message = props.isSaved ? (
      <p>{props.localUserGallery.length} of 9 selected</p>
    ) : (
      <p>
        {props.localUserGallery.length} of 9 selected. Do you want to save the
        selection?
      </p>
    );

  if (props.messageType === "saveOrder" && !props.isSaved)
    message = <p> Do you want to save the new order of images?</p>;

  const button = !props.isSaved && (
    <button onClick={updateUserGalleryHandler}>Save</button>
  );

  return (
    <section className={classes.notification}>
      {message}
      {button}
    </section>
  );
};

export default ImageNotification;
