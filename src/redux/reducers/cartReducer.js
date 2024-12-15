import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../actions/cartActions"; //represents the type of actions that can be dispatched to update the cart state

const initialState = []; //initializes state with an empty array [], state array will hold the list of products/items in the cart

const cartReducer = (state = initialState, action) => {
  //takes state and action as parameters, action parameter represents the action object dispatched from components
  switch (
    action.type //switch statement to handle different types of actions based on action type
  ) {
    case ADD_TO_CART: //handles ADD_TO_CART action
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      ); //finds the index of the existing product in the state array using the product's id from the action payload
      if (existingProductIndex >= 0) {
        //this condition checks if product already exists in the cart
        const updatedState = [...state]; //creates a copy of the current state array
        updatedState[existingProductIndex].quantity += action.payload.quantity; //updates the quantity of the existing product by adding the quantity from the action payload
        if (updatedState[existingProductIndex].quantity <= 0) {
          //this condition checks if the updated quantity is less than or equal to zero
          updatedState.splice(existingProductIndex, 1); //if the quantity is less than or equal to zero, the product is removed from the cart using the splice method
        }
        return updatedState; //returns the updated state array
      } else {
        return [...state, { ...action.payload }]; //if the product does not already exist in the cart, this line adds the new product to the state array by spreading the current state and adding the new product from the action payload
      }
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};
export default cartReducer;
