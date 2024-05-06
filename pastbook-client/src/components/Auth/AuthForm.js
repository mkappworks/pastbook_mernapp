import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../helper/service/login_user";
import { registerUser } from "../../helper/service/register_user";

import classes from "./AuthForm.module.css";
import CryptoJS from "crypto-js";

//Body of the / route when the user is not logged in or not Authenticated
const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    //encrypt the password against the REACT_APP_PASSWORD_PASSPHRASE in .env
    const encryptPassword = CryptoJS.AES.encrypt(
      passwordInputRef.current.value,
      process.env.REACT_APP_PASSWORD_PASSPHRASE
    ).toString();

    //if isLogin call the loginUser helper fn or else the registerUser
    isLogin
      ? dispatch(
          loginUser(emailInputRef.current.value, encryptPassword, history)
        )
      : dispatch(
          registerUser(
            emailInputRef.current.value,
            encryptPassword,
            nameInputRef.current.value
          )
        );
    setIsLoading(false);
  };

  //To switch between the state of isLogin
  //changes the ui of the AuthForm input depending on the state
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label>Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
