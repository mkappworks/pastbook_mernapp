import { checkTokenExpired } from "./token_util";

//return the intialAuthState depending on whether the refreshToken is available in the localStorage
 const getInitialAuthState = () => {
    if (localStorage.getItem("refreshToken") != null) {
      checkTokenExpired();
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  };
  
export default getInitialAuthState;