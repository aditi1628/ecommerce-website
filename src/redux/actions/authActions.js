import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP } from "./types";

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
};

export const login = (username, password, navigate) => async (dispatch) => {
  try {
    console.log(username);
    console.log(password);
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    const data = await handleFetchResponse(response);
    localStorage.setItem("user", JSON.stringify(data));
    console.log("Response data: ", data);
    const { token, ...userData } = data;
    localStorage.setItem("authToken", token);
    dispatch({ type: AUTH_LOGIN, payload: userData });
    navigate("/home");
  } catch (error) {
    alert(error.message || "Login failed. Please try again.");
    console.error("Login error:", error);
  }
};

export const signUp = (username, password, navigate) => async (dispatch) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    const data = await handleFetchResponse(response);
    console.log("Response data: ", data);
    const { token, ...userData } = data;
    localStorage.setItem("authToken", token);
    dispatch({ type: AUTH_SIGNUP, payload: userData });
    navigate("/home");
  } catch (error) {
    alert(error.message || "Sign-up failed. Please try again.");
    console.error("Signup error:", error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({ type: AUTH_LOGOUT });
};
