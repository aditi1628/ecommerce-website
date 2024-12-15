// export const ADD_TO_CART = "ADD_TO_CART";
// export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// //export const UPDATE_CART = "UPDATE_CART";

// export const addToCart = (product, quantity = 1) => {
//   //defines an action creator function named addToCart, it takes two parameters, product: the product to add to the cart, quantity: the quantity of the product to add to the cart, defaulting to 1 if not provided
//   return {
//     type: ADD_TO_CART, //the action type which is ADD_TO_CART
//     payload: { ...product, quantity }, //an object containing the product details and the specified quantity, the spread operator {...product,quantity}
//   }; //ensures that all properties of the product object are included in the payload along with the quantity
// };

// export const removeFromCart = (productId) => {
//   return {
//     type: REMOVE_FROM_CART,
//     payload: productId,
//   };
// };

// // export const updateCart = (productId, quantity) => {
// //   return {
// //     type: UPDATE_CART,
// //     payload: { productId, quantity },
// //   };
// // };
