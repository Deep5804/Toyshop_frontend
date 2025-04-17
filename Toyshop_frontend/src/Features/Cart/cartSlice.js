
// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   items: [],
// //   totalAmount: 0,
// // };

// // const MAX_QUANTITY = 20;

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     // 
// //     // 
// //     addToCart(state, action) {
// //       const product = action.payload;
// //       const productID = product.productID || product._id; // Ensure correct mapping
    
// //       const existingItem = state.items.find((item) => item.productID === productID);
    
// //       if (existingItem) {
// //         if (existingItem.quantity + product.quantity <= MAX_QUANTITY) {
// //           existingItem.quantity += product.quantity; // Add the passed quantity
// //           state.totalAmount += existingItem.productPrice * product.quantity;
// //         } else {
// //           const remainingCapacity = MAX_QUANTITY - existingItem.quantity;
// //           existingItem.quantity = MAX_QUANTITY;
// //           state.totalAmount += existingItem.productPrice * remainingCapacity;
// //         }
// //       } else {
// //         const newItem = {
// //           productID: productID,
// //           productName: product.productName || product.name,
// //           productPrice: product.productPrice || product.price,
// //           frontImg: product.frontImg || (product.imageUrls?.[0] ?? "fallback-image.jpg"),
// //           productReviews: product.productReviews || "No Reviews",
// //           quantity: Math.min(product.quantity, MAX_QUANTITY), // Use the passed quantity, capped at MAX_QUANTITY
// //         };
    
// //         state.items.push(newItem);
// //         state.totalAmount += newItem.productPrice * newItem.quantity;
// //       }
// //     }
// //     ,    
// //     updateQuantity(state, action) {
// //       const { productID, quantity } = action.payload;
// //       const itemToUpdate = state.items.find(
// //         (item) => item.productID === productID
// //       );
// //       if (itemToUpdate) {
// //         const newQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY)); // Clamp between 1 and 20
// //         const difference = newQuantity - itemToUpdate.quantity;
// //         itemToUpdate.quantity = newQuantity;
// //         state.totalAmount += difference * itemToUpdate.productPrice;
// //       }
// //     },
// //     removeFromCart(state, action) {
// //       const productId = action.payload;
// //       const itemToRemove = state.items.find(
// //         (item) => item.productID === productId
// //       );
// //       if (itemToRemove) {
// //         state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
// //         state.items = state.items.filter(
// //           (item) => item.productID !== productId
// //         );
// //       }
// //     },
// //   },
// // });

// // export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// // export const selectCartItems = (state) => state.cart.items;
// // export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// // export default cartSlice.reducer;

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
//     setCartItems(state, action) {
//       state.items = action.payload;
//       // Recalculate totalAmount based on new items
//       state.totalAmount = action.payload.reduce(
//         (total, item) => total + item.productPrice * item.quantity,
//         0
//       );
//     },
//     addToCart(state, action) {
//       const product = action.payload;
//       const productID = product.productID || product._id; // Ensure correct mapping

//       const existingItem = state.items.find((item) => item.productID === productID);

//       if (existingItem) {
//         if (existingItem.quantity + product.quantity <= MAX_QUANTITY) {
//           existingItem.quantity += product.quantity; // Add the passed quantity
//           state.totalAmount += existingItem.productPrice * product.quantity;
//         } else {
//           const remainingCapacity = MAX_QUANTITY - existingItem.quantity;
//           existingItem.quantity = MAX_QUANTITY;
//           state.totalAmount += existingItem.productPrice * remainingCapacity;
//         }
//       } else {
//         const newItem = {
//           productID: productID,
//           productName: product.productName || product.name,
//           productPrice: product.productPrice || product.price,
//           frontImg: product.frontImg || (product.imageUrls?.[0] ?? "fallback-image.jpg"),
//           productReviews: product.productReviews || "No Reviews",
//           quantity: Math.min(product.quantity, MAX_QUANTITY), // Use the passed quantity, capped at MAX_QUANTITY
//         };

//         state.items.push(newItem);
//         state.totalAmount += newItem.productPrice * newItem.quantity;
//       }
//     },
//     updateQuantity(state, action) {
//       const { productID, quantity } = action.payload;
//       const itemToUpdate = state.items.find(
//         (item) => item.productID === productID
//       );
//       if (itemToUpdate) {
//         const newQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY)); // Clamp between 1 and 20
//         const difference = newQuantity - itemToUpdate.quantity;
//         itemToUpdate.quantity = newQuantity;
//         state.totalAmount += difference * itemToUpdate.productPrice;
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

// export const { setCartItems, addToCart, removeFromCart, updateQuantity } =
//   cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;
// export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// export default cartSlice.reducer;



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
//     setCartItems(state, action) {
//       const backendItems = action.payload.items || [];

//       state.items = backendItems.map((product) => {
//         const productID = product.productId || product._id;

//         const item = {
//           productID: productID,
//           productName: product.productName || "Unnamed Product", // Add fallback for productName
//           productPrice: product.productPrice || 0, // Fallback price if not available
//           frontImg: product.frontImg || "fallback-image.jpg", // Default image URL if not available
//           productReviews: product.productReviews || "No Reviews", // Fallback review text
//           quantity: Math.min(product.quantity || 1, MAX_QUANTITY), // Ensure quantity doesn't exceed MAX_QUANTITY
//         };

//         return item;
//       });

//       // Recalculate totalAmount
//       state.totalAmount = state.items.reduce(
//         (total, item) => total + item.productPrice * item.quantity,
//         0
//       );
//     },

    
//     addToCart(state, action) {
//       const product = action.payload;
//       const productID = product.productID || product._id; // Ensure correct mapping

//       const existingItem = state.items.find((item) => item.productID === productID);

//       if (existingItem) {
//         if (existingItem.quantity + product.quantity <= MAX_QUANTITY) {
//           existingItem.quantity += product.quantity; // Add the passed quantity
//           state.totalAmount += existingItem.productPrice * product.quantity;
//         } else {
//           const remainingCapacity = MAX_QUANTITY - existingItem.quantity;
//           existingItem.quantity = MAX_QUANTITY;
//           state.totalAmount += existingItem.productPrice * remainingCapacity;
//         }
//       } else {
//         const newItem = {
//           productID: productID,
//           productName: product.productName || product.name,
//           productPrice: product.productPrice || product.price,
//           frontImg: product.frontImg || (product.imageUrls?.[0] ?? "fallback-image.jpg"),
//           productReviews: product.productReviews || "No Reviews",
//           quantity: Math.min(product.quantity, MAX_QUANTITY), // Use the passed quantity, capped at MAX_QUANTITY
//         };

//         state.items.push(newItem);
//         state.totalAmount += newItem.productPrice * newItem.quantity;
//       }
//     },
//     updateQuantity(state, action) {
//       const { productID, quantity } = action.payload;
//       console.log("Updating quantity in reducer:", productID, quantity);
      
//       // Find the exact item using strict equality
//       const itemToUpdate = state.items.find(item => {
//         const itemId = item.productID || item.productId || item._id;
//         console.log("Comparing", itemId, "with", productID, "result:", itemId === productID);
//         return itemId === productID;
//       });
      
//       if (itemToUpdate) {
//         console.log("Found item to update:", itemToUpdate.productName);
//         const newQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY));
//         const difference = newQuantity - itemToUpdate.quantity;
//         itemToUpdate.quantity = newQuantity;
//         state.totalAmount += difference * itemToUpdate.productPrice;
//       } else {
//         console.error("Could not find item with ID:", productID);
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

// export const { setCartItems, addToCart, removeFromCart, updateQuantity } =
//   cartSlice.actions;

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
    setCartItems(state, action) {
      const backendItems = action.payload.items || [];

      state.items = backendItems.map((product, index) => {
        const productID = product.productID || product.productId || product._id;

        return {
          uniqueCartId: product.uniqueCartId || `cart-item-${index}-${productID}`,
          productID: productID,
          productName: product.productName || "Unnamed Product",
          productPrice: product.productPrice || 0,
          frontImg: product.frontImg || "fallback-image.jpg",
          productReviews: product.productReviews || "No Reviews",
          quantity: Math.min(product.quantity || 1, MAX_QUANTITY),
        };
      });

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
      );
    },

    addToCart(state, action) {
      const product = action.payload;
      const productID = product.productID || product.productId || product._id;
      const uniqueCartId = `cart-item-${state.items.length}-${productID}`;

      const existingItem = state.items.find((item) => item.productID === productID);

      if (existingItem) {
        if (existingItem.quantity + product.quantity <= MAX_QUANTITY) {
          existingItem.quantity += product.quantity;
          state.totalAmount += existingItem.productPrice * product.quantity;
        } else {
          const remainingCapacity = MAX_QUANTITY - existingItem.quantity;
          existingItem.quantity = MAX_QUANTITY;
          state.totalAmount += existingItem.productPrice * remainingCapacity;
        }
      } else {
        const newItem = {
          uniqueCartId: uniqueCartId,
          productID: productID,
          productName: product.productName || product.name,
          productPrice: product.productPrice || product.price,
          frontImg: product.frontImg || (product.imageUrls?.[0] ?? "fallback-image.jpg"),
          productReviews: product.productReviews || "No Reviews",
          quantity: Math.min(product.quantity, MAX_QUANTITY),
        };

        state.items.push(newItem);
        state.totalAmount += newItem.productPrice * newItem.quantity;
      }
    },

    updateQuantity(state, action) {
      const { uniqueId, productID, quantity } = action.payload;
      console.log("Updating quantity in reducer:", uniqueId, productID, quantity);

      const itemToUpdate = state.items.find(item => item.uniqueCartId === uniqueId);

      if (itemToUpdate) {
        console.log("Found item to update:", itemToUpdate.productName);
        const newQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY));
        const difference = newQuantity - itemToUpdate.quantity;
        itemToUpdate.quantity = newQuantity;
        state.totalAmount += difference * itemToUpdate.productPrice;
      } else {
        console.error("Could not find item with uniqueId:", uniqueId);
      }
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => (item.productID || item.productId || item._id) === productId
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => (item.productID || item.productId || item._id) !== productId
        );
      }
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;