import { uiActions } from "../../store/slice/ui-slice";

export const registerUser = (enteredEmail, enterPassword, enterName) => {
  return async (dispatch) => {
    //update the notification in store/slice/uiSlice
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Registration Pending!",
      })
    );

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/`;
      //post user data in the body to backend server to add the user to the db
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enterPassword,
          name: enterName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Registration Successful!",
          })
        );
      } else if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "User Already Registered!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Registration Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Registration Failed!",
        })
      );
    }
  };
};
