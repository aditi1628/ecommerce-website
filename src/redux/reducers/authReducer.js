import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP } from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case AUTH_SIGNUP:
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export default authReducer;
