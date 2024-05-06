import Gallery from "../../model/Gallery";

//check and return a updated List of Gallery objects by adding or removing the forwarded selected image 
export const updateLocalUserImageList = (
  localUserImageList,
  selectedImageID,
  selectedImageUrl,
) => {
  const tempList = localUserImageList.map((image) => image.id);

  //if selected image not in localUserImageList and list less than 9 then return list by adding selected image
  if (!tempList.includes(selectedImageID) && tempList.length < 9)
    return [...localUserImageList, Gallery(selectedImageID, selectedImageUrl)];

  //if selected image in localUserImageList then return list by filtering the selected image
  if (tempList.includes(selectedImageID))
    return localUserImageList.filter((image) => image.id !== selectedImageID);

  return localUserImageList;  
};
