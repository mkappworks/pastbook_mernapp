import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ImageGrid from "./ImageGrid";
import ImageNotification from "./ImageNotification";

import { fetchUserGallery } from "../../helper/service/fetch_user_gallery";

import classes from "./Gallery.module.css";

//Body of the /userGallery route
const UserGallery = () => {
  const dispatch = useDispatch();
  const userGallery = useSelector((state) => state.gallery.userGallery);
  const [isImageOrderSaved, setIsImageOrderSaved] = useState(true);
  const [localUserImageList, setLocalUserImageList] = useState([]);
  const [draggedUserImageList, setDraggedUserImageList] = useState([]);

  let content = <h1>No Images in User Gallery</h1>;

  const orderChangeHandler = (draggedImageList) => {
    //get the list of ids in the localUserImageList
    const localUserImageIDList = localUserImageList.map((image) => image.id);
    //get the list of ids from the draggedImageList in the ImageNotification component
    const draggedImageIDList = draggedImageList.map((image) => image.id);
    //if the order of the two array have changed set the isImageOrderSaved false or else to true
    const isOrderChanged =
      localUserImageIDList.toString() === draggedImageIDList.toString();
    setIsImageOrderSaved(isOrderChanged);
    setDraggedUserImageList(draggedImageList);
  };

  //maps the objects in dbUserGallery to img tag
  const imageGrid = (
    <ImageGrid
      data={localUserImageList}
      draggable={true}
      orderChange={orderChangeHandler}
    ></ImageGrid>
  );

  //if the dbUserGallery length is not zero then the content is changed to imageGrid
  if (localUserImageList.length !== 0) content = imageGrid;

  useEffect(() => {
    if (Number(localStorage.getItem("userImageCount")) !== userGallery.length)
      dispatch(fetchUserGallery());
    setLocalUserImageList(userGallery);
    setDraggedUserImageList(userGallery);
    setIsImageOrderSaved(true);
  }, [userGallery]);

  return (
    <Fragment>
      <ImageNotification
        messageType="saveOrder"
        isSaved={isImageOrderSaved}
        localUserGallery={draggedUserImageList}
      ></ImageNotification>
      <section className={classes.gallery_grid}>{content}</section>
    </Fragment>
  );
};

export default UserGallery;
