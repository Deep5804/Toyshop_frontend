// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   totalAmount: 0,
// };

// const MAX_QUANTITY = 20;

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const product = action.payload;
//       const existingItem = state.items.find(
//         (item) => item.productID === product.productID
//       );
//       if (existingItem) {
//         if (existingItem.quantity < MAX_QUANTITY) {
//           existingItem.quantity += 1;
//           state.totalAmount += product.productPrice;
//         }
//       } else {
//         state.items.push({ ...product, quantity: 1 });
//         state.totalAmount += product.productPrice;
//       }
//     },
//     updateQuantity(state, action) {
//       const { productID, quantity } = action.payload;
//       const itemToUpdate = state.items.find(
//         (item) => item.productID === productID
//       );
//       if (itemToUpdate) {
//         const difference = quantity - itemToUpdate.quantity;
//         if (quantity <= MAX_QUANTITY) {
//           itemToUpdate.quantity = quantity;
//           state.totalAmount += difference * itemToUpdate.productPrice;
//         } else {
//           itemToUpdate.quantity = MAX_QUANTITY;
//           state.totalAmount +=
//             (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.productPrice;
//         }
//       }
//     },
//     removeFromCart(state, action) {
//       const productId = action.payload;
//       const itemToRemove = state.items.find(
//         (item) => item.productID === productId
//       );
//       if (itemToRemove) {
//         state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
//         state.items = state.items.filter(
//           (item) => item.productID !== productId
//         );
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;
// export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 
    // 
    addToCart(state, action) {
      const product = action.payload;
      const productID = product.productID || product._id; // Ensure correct mapping
    
      const existingItem = state.items.find((item) => item.productID === productID);
    
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
          state.totalAmount += existingItem.productPrice;
        }
      } else {
        const newItem = {
          productID: productID,
          productName: product.productName || product.name,
          productPrice: product.productPrice || product.price,
          frontImg: product.frontImg || (product.imageUrls?.[0] ?? "fallback-image.jpg"),
          productReviews: product.productReviews || "No Reviews",
          quantity: 1,
        };
    
        state.items.push(newItem);
        state.totalAmount += newItem.productPrice;
      }
    }
    ,    
    updateQuantity(state, action) {
      const { productID, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.productID === productID
      );
      if (itemToUpdate) {
        const newQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY)); // Clamp between 1 and 20
        const difference = newQuantity - itemToUpdate.quantity;
        itemToUpdate.quantity = newQuantity;
        state.totalAmount += difference * itemToUpdate.productPrice;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.productID === productId
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.productID !== productId
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;