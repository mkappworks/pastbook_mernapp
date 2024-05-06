import { useState, useRef, useEffect } from "react";
import classes from "./Gallery.module.css";

const ImageGrid = (props) => {
  const [imageList, setImageList] = useState(props.data);
  const [dragging, setDragging] = useState(false);

  const dragItemRef = useRef();
  const dragNodeRef = useRef();

  const localUserImageList = props.localUserGallery;
  const orderChange = props.orderChange;
  let cssClasses;

  //function to add component which has started to be drage to a event listener
  const dragStartHandler = (event, image) => {
    dragItemRef.current = image;
    dragNodeRef.current = event.target;
    dragNodeRef.current.addEventListener("dragend", dragEndHandler);
    setDragging(true);
  };

  //function to remove component which has started to be drage to a event listener
  const dragEndHandler = () => {
    setDragging(false);
    dragNodeRef.current.removeEventListener("dragend", dragEndHandler);
    dragItemRef.current = null;
    dragNodeRef.current = null;
  };

  //function to perform logic when draggin component crosses another component
  const dragEnterHandler = (event, image) => {
    const currentItem = dragItemRef.current;

    if (event.target !== dragNodeRef.current) {
      setImageList((oldList) => {
        let newList = [...oldList];

        //get the index of drag component
        const indexOfDragItem = newList
          .map((_, i) => i)
          .filter((e) => newList[e].id === currentItem.id);

        //get the index of the drag enter component
        const indexofDragEnterItem = newList
          .map((_, i) => i)
          .filter((e) => newList[e].id === image.id);

        //use splice to switch the location of the two components in the imageList state
        newList[indexofDragEnterItem] = newList.splice(
          indexOfDragItem,
          1,
          newList[indexofDragEnterItem]
        )[0];
        return newList;
      });
    }
  };

  const selectedImageStyleHandler = (image) => {
    //if image is found matching in the localUserImageIDList that if the image is selected then
    //the cssClasses is changed to included a blue border around the img tag
    const localUserImageIDList = localUserImageList.map(
      (element) => element.id
    );

    return localUserImageIDList.includes(image.id)
      ? `${classes.gallery_card} ${classes.gallery_card_selected}`
      : `${classes.gallery_card}`;
  };

  useEffect(() => {
    if (orderChange != null) orderChange(imageList);
  }, [imageList, orderChange]);

  return imageList.map((image) => {
    cssClasses =
      localUserImageList != null
        ? selectedImageStyleHandler(image)
        : `${classes.gallery_card}`;

    return (
      <img
        className={cssClasses}
        src={image.url}
        key={image.id}
        id={image.id}
        alt={image.id}
        onClick={props.onClick}
        draggable={props.draggable}
        onDragStart={(event) => dragStartHandler(event, image)}
        onDragEnter={
          dragging
            ? (event) => {
                dragEnterHandler(event, image);
              }
            : null
        }
      />
    );
  });
};

export default ImageGrid;
