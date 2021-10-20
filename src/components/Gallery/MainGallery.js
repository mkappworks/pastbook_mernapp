import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchMainGallery } from "../../helper/service/fetch_main_gallery";

import ImageGrid from "./ImageGrid";
import ImageNotification from "./ImageNotification";
import { updateLocalUserImageList } from "../../helper/util/gallery_util";

import classes from "./Gallery.module.css";

//Body of the / route
const MainGallery = () => {
  const dispatch = useDispatch();
  const mainGallery = useSelector((state) => state.gallery.mainGallery);
  const userGallery = useSelector((state) => state.gallery.userGallery);
  const [isSelectionSaved, setIsSelectionSaved] = useState(true);
  const [localUserImageList, setLocalUserImageList] = useState([]);

  //function to handle click event of the images in the ImageGrid
  const selectChangedHandler = (event) => {
    event.preventDefault();
    const selectedImageID = event.target.id;
    const selectedImageUrl = event.target.src;
    //get updated list from the updateLocalUserImageList depending in the selected image
    const updatedLocalUserImageList = updateLocalUserImageList(
      localUserImageList,
      selectedImageID,
      selectedImageUrl
    );
    //update the state of isSelectionSaved to false and setLocalUserImageList to updatedLocalUserImageList;
    setLocalUserImageList(updatedLocalUserImageList);
    setIsSelectionSaved(false);
  };

  let content = <h1>No Images in Main Gallery</h1>;

  //maps the objects in mainGallery to img tag
  const imageGrid = (
    <ImageGrid
      data={mainGallery}
      localUserGallery={localUserImageList}
      draggable={false}
      onClick={selectChangedHandler}
    ></ImageGrid>
  );

  //if the mainGallery length is not zero then the content is changed to imageGrid
  if (mainGallery.length !== 0) content = imageGrid;

  useEffect(() => {
    //call the fetchMainGallery helper fn to get all image urls from the db
    dispatch(fetchMainGallery());
    
    setLocalUserImageList(userGallery);
    setIsSelectionSaved(true);
  }, [userGallery]);

  return (
    <Fragment>
      <ImageNotification
        messageType="saveSelection"
        isSaved={isSelectionSaved}
        localUserGallery={localUserImageList}
      ></ImageNotification>
      <section className={classes.gallery_grid}>{content}</section>;
    </Fragment>
  );
};

export default MainGallery;
