import { calulateExpirationTime } from "../util/token_util";

export const updateToken = async () => {
  //post login data in the body to backend server and get accessToken, refreshToken, expirationTime as a response
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/`;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      const expirationTime = calulateExpirationTime(data.expiresIn);

      //store them in local storage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expirationTime", expirationTime);
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error");
  }
};
