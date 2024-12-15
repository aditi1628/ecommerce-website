import { combineReducers } from "redux";
import cartReducer from "../cartSlice";
import { productReducer } from "./productReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  auth: authReducer,
});

export default rootReducer;
