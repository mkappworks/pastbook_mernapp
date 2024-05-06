import { useRef } from "react";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
 // const newEmailInputRef = useRef();
  const newPasswordInputRef = useRef();
  // const newNameInputRef = useRef();
  

  const submitHandler = async (event) => {
    event.preventDefault();
 
    // UpdateProfileHelper(
    //   newEmailInputRef.current.value,
    //   newPasswordInputRef.current.value,
    //   newNameInputRef.current.value
    // );

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
