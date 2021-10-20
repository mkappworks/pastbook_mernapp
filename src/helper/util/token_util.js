import { updateToken } from "../service/update_token";

//calculate the expiration time in DateTime depending on the expireIn time which is in seconds
export const calulateExpirationTime = (expiresIn) => {
  return new Date(new Date().getTime() + +expiresIn * 1000).toISOString();
};

//calculate the remaining time to the expirationTime in the localStorage in ms
export const calculateRemainingTime = () => {
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const adjExpirationTime = new Date(storedExpirationTime).getTime();
  const currentTime = new Date().getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

//check if the Token is expired by calculating the remainingTime if less than 20s
//call the updateToken helper fn which request the server for a new accessToken
export const checkTokenExpired = () => {
  const remainingTime = calculateRemainingTime();
  if (remainingTime <= 20000) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    updateToken();
  }
};

