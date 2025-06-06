
// import React, { useState, useEffect } from "react";
// import "./ShoppingCart.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   updateQuantity,
//   selectCartTotalAmount,
//   setCartItems,
// } from "../../Features/Cart/cartSlice";
// import { MdOutlineClose } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import success from "../../Assets/success.png";

// const ShoppingCart = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("cartTab1");
//   const [payments, setPayments] = useState(false);

//   const handleTabClick = (tab) => {
//     if (tab === "cartTab1" || cartItems.length > 0) {
//       setActiveTab(tab);
//     }
//   };

//   const handleQuantityChange = (uniqueId, quantity) => {
//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 20) {
//       return; // Prevent invalid quantities
//     }

//     const item = cartItems.find((item) => item.uniqueCartId === uniqueId);

//     if (item) {
//       const productID = item.productID || item.productId || item._id;
//       dispatch(
//         updateQuantity({
//           uniqueId: uniqueId,
//           productID: productID,
//           quantity: parsedQuantity,
//         })
//       );
//     } else {
//       console.error("Item not found for uniqueId:", uniqueId);
//     }
//   };

//   const totalPrice = useSelector(selectCartTotalAmount);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // Current Date
//   const currentDate = new Date();

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Random number
//   const orderNumber = Math.floor(Math.random() * 100000);

//   // Radio Button Data
//   const [selectedPayment, setSelectedPayment] = useState("Direct Bank Transfer");

//   const handlePaymentChange = (e) => {
//     setSelectedPayment(e.target.value);
//   };

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) return;

//         let user;
//         try {
//           user = JSON.parse(storedUser);
//         } catch (error) {
//           console.error("Failed to parse user from localStorage:", error);
//           return;
//         }

//         const userId = user.id;
//         if (!userId) return;

//         // Only fetch if cart is empty to avoid overwriting local changes
//         if (cartItems.length > 0) {
//           console.log("Using existing cart items:", cartItems);
//           return;
//         }

//         const response = await fetch(
//           `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
//           {
//             method: "GET",
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch cart: ${response.status}`);
//         }

//         const cart = await response.json();
//         console.log("Fetched Cart:", cart);

//         if (cart && cart.items && Array.isArray(cart.items)) {
//           const updatedItems = await Promise.all(
//             cart.items.map(async (item, index) => {
//               if (!item.productId) return null;

//               const productId = item.productId._id || item.productId;

//               try {
//                 const productResponse = await fetch(
//                   `https://toyshop-sooty.vercel.app/api/products/${productId}`
//                 );
//                 if (!productResponse.ok) {
//                   throw new Error(`Failed to fetch product ${productId}`);
//                 }
//                 const product = await productResponse.json();

//                 return {
//                   uniqueCartId: `cart-item-${index}-${productId}`,
//                   productID: productId,
//                   productName: product.name || "Unnamed Product",
//                   productPrice: product.price || 0,
//                   frontImg: product.imageUrls?.[0] || "",
//                   quantity: item.quantity || 1,
//                   productReviews: "No Reviews",
//                 };
//               } catch (error) {
//                 console.error(`Failed to fetch product ${productId}:`, error);
//                 return null;
//               }
//             })
//           );

//           const validItems = updatedItems.filter((item) => item !== null);
//           console.log("Updated Cart Items:", validItems);

//           dispatch(setCartItems({ items: validItems }));
//         }
//       } catch (error) {
//         console.error("Failed to load cart:", error);
//       }
//     };

//     fetchCart();
//   }, [dispatch, cartItems.length]);

//   // Function to handle order placement
//   const handlePlaceOrder = async () => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (!token || !storedUser) {
//       alert("Please log in to place an order.");
//       navigate("/loginSignUp", { replace: true });
//       return false;
//     }

//     let user;
//     try {
//       user = JSON.parse(storedUser);
//     } catch (error) {
//       console.error("Failed to parse user from localStorage:", error);
//       alert("Invalid user data. Please log in again.");
//       navigate("/loginSignUp", { replace: true });
//       return false;
//     }

//     const userId = user.id;
//     if (!userId) {
//       alert("User ID not found. Please log in again.");
//       navigate("/loginSignUp", { replace: true });
//       return false;
//     }

//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return false;
//     }

//     const orderData = {
//       userId,
//       products: cartItems.map((item) => ({
//         productId: item.productID || item.productId || item._id,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       const response = await fetch("https://toyshop-sooty.vercel.app/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || `HTTP error ${response.status}`);
//       }

//       // Clear cart in Redux
//       dispatch(setCartItems({ items: [] }));

//       // Clear backend cart
//       try {
//         const clearResponse = await fetch(
//           `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ items: [] }),
//           }
//         );
//         if (!clearResponse.ok) {
//           console.error("Failed to clear backend cart:", clearResponse.status);
//         }
//       } catch (error) {
//         console.error("Error clearing backend cart:", error);
//       }

//       alert("Order is created"); // Updated success message
//       return true; // Indicate success
//     } catch (error) {
//       console.error("Order Placement Error:", error.message);
//       alert(`Error placing order: ${error.message}`);
//       return false; // Indicate failure
//     }
//   };

//   return (
//     <div>
//       <div className="shoppingCartSection">
//         <h2>Cart</h2>

//         <div className="shoppingCartTabsContainer">
//           <div className={`shoppingCartTabs ${activeTab}`}>
//             <button
//               className={activeTab === "cartTab1" ? "active" : ""}
//               onClick={() => {
//                 handleTabClick("cartTab1");
//                 setPayments(false);
//               }}
//             >
//               <div className="shoppingCartTabsNumber">
//                 <h3>01</h3>
//                 <div className="shoppingCartTabsHeading">
//                   <h3>Shopping Bag</h3>
//                   <p>Manage Your Items List</p>
//                 </div>
//               </div>
//             </button>
//             <button
//               className={activeTab === "cartTab2" ? "active" : ""}
//               onClick={() => {
//                 handleTabClick("cartTab2");
//                 setPayments(false);
//               }}
//               disabled={cartItems.length === 0}
//             >
//               <div className="shoppingCartTabsNumber">
//                 <h3>02</h3>
//                 <div className="shoppingCartTabsHeading">
//                   <h3>Shipping and Checkout</h3>
//                   <p>Checkout Your Items List</p>
//                 </div>
//               </div>
//             </button>
//             <button
//               className={activeTab === "cartTab3" ? "active" : ""}
//               onClick={() => {
//                 handleTabClick("cartTab3");
//               }}
//               disabled={cartItems.length === 0 || payments === false}
//             >
//               <div className="shoppingCartTabsNumber">
//                 <h3>03</h3>
//                 <div className="shoppingCartTabsHeading">
//                   <h3>Confirmation</h3>
//                   <p>Review And Submit Your Order</p>
//                 </div>
//               </div>
//             </button>
//           </div>
//           <div className="shoppingCartTabsContent">
//             {/* tab1 */}
//             {activeTab === "cartTab1" && (
//               <div className="shoppingBagSection">
//                 <div className="shoppingBagTableSection">
//                   <table className="shoppingBagTable">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th></th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Subtotal</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartItems.length > 0 ? (
//                         cartItems.map((item, index) => {
//                           const itemId = item.productID || item.productId || item._id;
//                           const uniqueId = item.uniqueCartId || `cart-item-${index}-${itemId}`;

//                           return (
//                             <tr key={uniqueId}>
//                               <td data-label="Product">
//                                 <div className="shoppingBagTableImg">
//                                   <Link to="/product" onClick={scrollToTop}>
//                                     <img src={item.frontImg} alt={item.productName} />
//                                   </Link>
//                                 </div>
//                               </td>
//                               <td data-label="">
//                                 <div className="shoppingBagTableProductDetail">
//                                   <Link to="/product" onClick={scrollToTop}>
//                                     <h4>{item.productName}</h4>
//                                   </Link>
//                                   <p>{item.productReviews || "No reviews"}</p>
//                                 </div>
//                               </td>
//                               <td data-label="Price" style={{ textAlign: "center" }}>
//                                 ₹{item.productPrice}
//                               </td>
//                               <td data-label="Quantity">
//                                 <div className="ShoppingBagTableQuantity">
//                                   <button
//                                     onClick={() => handleQuantityChange(uniqueId, item.quantity - 1)}
//                                   >
//                                     -
//                                   </button>
//                                   <input
//                                     type="text"
//                                     min="1"
//                                     max="20"
//                                     value={item.quantity}
//                                     onChange={(e) =>
//                                       handleQuantityChange(uniqueId, parseInt(e.target.value))
//                                     }
//                                   />
//                                   <button
//                                     onClick={() => handleQuantityChange(uniqueId, item.quantity + 1)}
//                                   >
//                                     +
//                                   </button>
//                                 </div>
//                               </td>
//                               <td data-label="Subtotal">
//                                 <p
//                                   style={{
//                                     textAlign: "center",
//                                     fontWeight: "500",
//                                   }}
//                                 >
//                                   ₹{item.quantity * item.productPrice}
//                                 </p>
//                               </td>
//                               <td data-label="">
//                                 <MdOutlineClose
//                                   onClick={() => dispatch(removeFromCart(itemId))}
//                                 />
//                               </td>
//                             </tr>
//                           );
//                         })
//                       ) : (
//                         <tr>
//                           <td colSpan="6">
//                             <div className="shoppingCartEmpty">
//                               <span>Your cart is empty!</span>
//                               <Link to="/shop" onClick={scrollToTop}>
//                                 <button>Shop Now</button>
//                               </Link>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                     <tfoot>
//                       <tr>
//                         <th
//                           colSpan="6"
//                           className="shopCartFooter"
//                           style={{
//                             borderBottom: "none",
//                             padding: "20px 0px",
//                           }}
//                         >
//                           {cartItems.length > 0 && (
//                             <div className="shopCartFooterContainer">
//                               <form>
//                                 <input
//                                   type="text"
//                                   placeholder="Coupon Code"
//                                 ></input>
//                                 <button
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                   }}
//                                 >
//                                   Apply Coupon
//                                 </button>
//                               </form>
//                               <button
//                                 onClick={async (e) => {
//                                   e.preventDefault();
//                                   try {
//                                     const storedUser = localStorage.getItem("user");
//                                     if (!storedUser) {
//                                       alert("Please log in to update cart");
//                                       return;
//                                     }

//                                     const user = JSON.parse(storedUser);
//                                     const userId = user.id;

//                                     const response = await fetch(
//                                       `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
//                                       {
//                                         method: "PUT",
//                                         headers: {
//                                           "Content-Type": "application/json",
//                                         },
//                                         body: JSON.stringify({
//                                           items: cartItems.map((item) => ({
//                                             productId: item.productID || item.productId || item._id,
//                                             quantity: item.quantity,
//                                             price: item.productPrice,
//                                           })),
//                                         }),
//                                       }
//                                     );

//                                     if (!response.ok) {
//                                       throw new Error(`Failed to update cart: ${response.status}`);
//                                     }

//                                     const updatedCart = await response.json();
//                                     console.log("Updated Cart Response:", updatedCart);

//                                     if (updatedCart.cart && updatedCart.cart.items) {
//                                       const updatedItems = updatedCart.cart.items.map(
//                                         (item, index) => ({
//                                           uniqueCartId: `cart-item-${index}-${
//                                             item.productId._id || item.productId
//                                           }`,
//                                           productID: item.productId._id || item.productId,
//                                           productName: item.productId.name || "Unnamed Product",
//                                           productPrice: item.price,
//                                           frontImg: item.productId.imageUrls?.[0] || "",
//                                           quantity: item.quantity,
//                                           productReviews: "No Reviews",
//                                         })
//                                       );

//                                       dispatch(setCartItems({ items: updatedItems }));
//                                       alert("Cart updated successfully!");
//                                     } else {
//                                       throw new Error("Invalid cart data in response");
//                                     }
//                                   } catch (error) {
//                                     console.error("Failed to update cart:", error);
//                                     alert("Failed to update cart");
//                                   }
//                                 }}
//                                 className="shopCartFooterbutton"
//                               >
//                                 Update Cart
//                               </button>
//                             </div>
//                           )}
//                         </th>
//                       </tr>
//                     </tfoot>
//                   </table>
//                   {/* For Mobile devices */}
//                   <div className="shoppingBagTableMobile">
//                     {cartItems.length > 0 ? (
//                       <>
//                         {cartItems.map((item, index) => {
//                           const itemId = item.productID || item.productId || item._id;
//                           const uniqueId = item.uniqueCartId || `cart-item-${index}-${itemId}`;

//                           return (
//                             <div key={uniqueId}>
//                               <div className="shoppingBagTableMobileItems">
//                                 <div className="shoppingBagTableMobileItemsImg">
//                                   <Link to="/product" onClick={scrollToTop}>
//                                     <img src={item.frontImg} alt={item.productName} />
//                                   </Link>
//                                 </div>
//                                 <div className="shoppingBagTableMobileItemsDetail">
//                                   <div className="shoppingBagTableMobileItemsDetailMain">
//                                     <Link to="/product" onClick={scrollToTop}>
//                                       <h4>{item.productName}</h4>
//                                     </Link>
//                                     <p>{item.productReviews || "No Reviews"}</p>
//                                     <div className="shoppingBagTableMobileQuantity">
//                                       <button
//                                         onClick={() => handleQuantityChange(uniqueId, item.quantity - 1)}
//                                       >
//                                         -
//                                       </button>
//                                       <input
//                                         type="text"
//                                         min="1"
//                                         max="20"
//                                         value={item.quantity}
//                                         onChange={(e) =>
//                                           handleQuantityChange(uniqueId, parseInt(e.target.value))
//                                         }
//                                       />
//                                       <button
//                                         onClick={() => handleQuantityChange(uniqueId, item.quantity + 1)}
//                                       >
//                                         +
//                                       </button>
//                                     </div>
//                                     <span>₹{item.productPrice}</span>
//                                   </div>
//                                   <div className="shoppingBagTableMobileItemsDetailTotal">
//                                     <MdOutlineClose
//                                       size={20}
//                                       onClick={() => dispatch(removeFromCart(itemId))}
//                                     />
//                                     <p>₹{item.quantity * item.productPrice}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                         <div className="shopCartFooter">
//                           <div className="shopCartFooterContainer">
//                             <form>
//                               <input
//                                 type="text"
//                                 placeholder="Coupon Code"
//                               ></input>
//                               <button
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                 }}
//                               >
//                                 Apply Coupon
//                               </button>
//                             </form>
//                             <button
//                               onClick={async (e) => {
//                                 e.preventDefault();
//                                 try {
//                                   const storedUser = localStorage.getItem("user");
//                                   if (!storedUser) {
//                                     alert("Please log in to update cart");
//                                     return;
//                                   }

//                                   const user = JSON.parse(storedUser);
//                                   const userId = user.id;

//                                   const response = await fetch(
//                                     `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
//                                     {
//                                       method: "PUT",
//                                       headers: {
//                                         "Content-Type": "application/json",
//                                       },
//                                       body: JSON.stringify({
//                                         items: cartItems.map((item) => ({
//                                           productId: item.productID || item.productId || item._id,
//                                           quantity: item.quantity,
//                                           price: item.productPrice,
//                                         })),
//                                       }),
//                                     }
//                                   );

//                                   if (!response.ok) {
//                                     throw new Error(`Failed to update cart: ${response.status}`);
//                                   }

//                                   const updatedCart = await response.json();
//                                   console.log("Updated Cart Response:", updatedCart);

//                                   if (updatedCart.cart && updatedCart.cart.items) {
//                                     const updatedItems = updatedCart.cart.items.map(
//                                       (item, index) => ({
//                                         uniqueCartId: `cart-item-${index}-${
//                                           item.productId._id || item.productId
//                                         }`,
//                                         productID: item.productId._id || item.productId,
//                                         productName: item.productId.name || "Unnamed Product",
//                                         productPrice: item.price,
//                                         frontImg: item.productId.imageUrls?.[0] || "",
//                                         quantity: item.quantity,
//                                         productReviews: "No Reviews",
//                                       })
//                                     );

//                                     dispatch(setCartItems({ items: updatedItems }));
//                                     alert("Cart updated successfully!");
//                                   } else {
//                                     throw new Error("Invalid cart data in response");
//                                   }
//                                 } catch (error) {
//                                   console.error("Failed to update cart:", error);
//                                   alert("Failed to update cart");
//                                 }
//                               }}
//                               className="shopCartFooterbutton"
//                             >
//                               Update Cart
//                             </button>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="shoppingCartEmpty">
//                         <span>Your cart is empty!</span>
//                         <Link to="/shop" onClick={scrollToTop}>
//                           <button>Shop Now</button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="shoppingBagTotal">
//                   <h3>Cart Totals</h3>
//                   <table className="shoppingBagTotalTable">
//                     <tbody>
//                       <tr>
//                         <th>Subtotal</th>
//                         <td>₹{totalPrice.toFixed(2)}</td>
//                       </tr>
//                       <tr>
//                         <th>Shipping</th>
//                         <td>
//                           <div className="shoppingBagTotalTableCheck">
//                             <p>₹{(totalPrice === 0 ? 0 : 5).toFixed(2)}</p>
//                             <p>Shipping to Al..</p>
//                             <p
//                               onClick={scrollToTop}
//                               style={{
//                                 cursor: "pointer",
//                               }}
//                             >
//                               CHANGE ADDRESS
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>VAT</th>
//                         <td>₹{(totalPrice === 0 ? 0 : 11).toFixed(2)}</td>
//                       </tr>
//                       <tr>
//                         <th>Total</th>
//                         <td>
//                           ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <button
//                     onClick={async () => {
//                       const success = await handlePlaceOrder();
//                       if (success) {
//                         handleTabClick("cartTab2"); // Proceed to cartTab2 after order creation
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                       }
//                     }}
//                     disabled={cartItems.length === 0}
//                   >
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* tab2 */}
//             {activeTab === "cartTab2" && (
//               <div className="checkoutSection">
//                 <div className="checkoutDetailsSection">
//                   <h4>Billing Details</h4>
//                   <div className="checkoutDetailsForm">
//                     <form>
//                       <div className="checkoutDetailsFormRow">
//                         <input type="text" placeholder="First Name" />
//                         <input type="text" placeholder="Last Name" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Company Name (optional)"
//                       />
//                       <select name="country" id="country">
//                         <option value="Country / Region" selected disabled>
//                           Country / Region
//                         </option>
//                         <option value="India">India</option>
//                         <option value="Canada">Canada</option>
//                         <option value="United Kingdom">United Kingdom</option>
//                         <option value="United States">United States</option>
//                         <option value="Turkey">Turkey</option>
//                       </select>
//                       <input type="text" placeholder="Street Address*" />
//                       <input type="text" placeholder="" />
//                       <input type="text" placeholder="Town / City *" />
//                       <input type="text" placeholder="Postcode / ZIP *" />
//                       <input type="text" placeholder="Phone *" />
//                       <input type="mail" placeholder="Your Mail *" />
//                       <div className="checkoutDetailsFormCheck">
//                         <label>
//                           <input type="checkbox" />
//                           <p>Create An Account?</p>
//                         </label>
//                         <label>
//                           <input type="checkbox" />
//                           <p>Ship to a different Address</p>
//                         </label>
//                       </div>
//                       <textarea
//                         cols={30}
//                         rows={8}
//                         placeholder="Order Notes (Optional)"
//                       />
//                     </form>
//                   </div>
//                 </div>
//                 <div className="checkoutPaymentSection">
//                   <div className="checkoutTotalContainer">
//                     <h3>Your Order</h3>
//                     <div className="checkoutItems">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>PRODUCTS</th>
//                             <th>SUBTOTALS</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {cartItems.map((items) => (
//                             <tr key={items.uniqueCartId}>
//                               <td>
//                                 {items.productName} x {items.quantity}
//                               </td>
//                               <td>₹{items.productPrice * items.quantity}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className="checkoutTotal">
//                       <table>
//                         <tbody>
//                           <tr>
//                             <th>Subtotal</th>
//                             <td>₹{totalPrice.toFixed(2)}</td>
//                           </tr>
//                           <tr>
//                             <th>Shipping</th>
//                             <td>₹5</td>
//                           </tr>
//                           <tr>
//                             <th>VAT</th>
//                             <td>₹11</td>
//                           </tr>
//                           <tr>
//                             <th>Total</th>
//                             <td>
//                               ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                   <div className="checkoutPaymentContainer">
//                     <label>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="Direct Bank Transfer"
//                         defaultChecked
//                         onChange={handlePaymentChange}
//                       />
//                       <div className="checkoutPaymentMethod">
//                         <span>Direct Bank Transfer</span>
//                         <p>
//                           Make your payment directly into our bank account.
//                           Please use your Order ID as the payment reference.Your
//                           order will not be shipped until the funds have cleared
//                           in our account.
//                         </p>
//                       </div>
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="Check Payments"
//                         onChange={handlePaymentChange}
//                       />
//                       <div className="checkoutPaymentMethod">
//                         <span>Check Payments</span>
//                         <p>
//                           Phasellus sed volutpat orci. Fusce eget lore mauris
//                           vehicula elementum gravida nec dui. Aenean aliquam
//                           varius ipsum, non ultricies tellus sodales eu. Donec
//                           dignissimo viverra nunc, ut aliquet magna posuere eget.
//                         </p>
//                       </div>
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="Cash on delivery"
//                         onChange={handlePaymentChange}
//                       />
//                       <div className="checkoutPaymentMethod">
//                         <span>Cash on delivery</span>
//                         <p>
//                           Phasellus sed volutpat orci. Fusce eget lore mauris
//                           vehicula elementum gravida nec dui. Aenean aliquam
//                           varius ipsum, non ultricies tellus sodales eu. Donec
//                           dignissimo viverra nunc, ut aliquet magna posuere eget.
//                         </p>
//                       </div>
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="Paypal"
//                         onChange={handlePaymentChange}
//                       />
//                       <div className="checkoutPaymentMethod">
//                         <span>Paypal</span>
//                         <p>
//                           Phasellus sed volutpat orci. Fusce eget lore mauris
//                           vehicula elementum gravida nec dui. Aenean aliquam
//                           varius ipsum, non ultricies tellus sodales eu. Donec
//                           dignissimo viverra nunc, ut aliquet magna posuere eget.
//                         </p>
//                       </div>
//                     </label>
//                     <div className="policyText">
//                       Your personal data will be used to process your order,
//                       support your experience throughout this website, and for
//                       other purposes described in our{" "}
//                       <Link to="/terms" onClick={scrollToTop}>
//                         Privacy Policy
//                       </Link>
//                       .
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleTabClick("cartTab3");
//                       window.scrollTo({ top: 0, behavior: "smooth" });
//                       setPayments(true);
//                     }}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* tab3 */}
//             {activeTab === "cartTab3" && (
//               <div className="orderCompleteSection">
//                 <div className="orderComplete">
//                   <div className="orderCompleteMessage">
//                     <div className="orderCompleteMessageImg">
//                       <img src={success} alt="" />
//                     </div>
//                     <h3>Your order is completed!</h3>
//                     <p>Thank you. Your order has been received.</p>
//                   </div>
//                   <div className="orderInfo">
//                     <div className="orderInfoItem">
//                       <p>Order Number</p>
//                       <h4>{orderNumber}</h4>
//                     </div>
//                     <div className="orderInfoItem">
//                       <p>Date</p>
//                       <h4>{formatDate(currentDate)}</h4>
//                     </div>
//                     <div className="orderInfoItem">
//                       <p>Total</p>
//                       <h4>₹{totalPrice.toFixed(2)}</h4>
//                     </div>
//                     <div className="orderInfoItem">
//                       <p>Payment Method</p>
//                       <h4>{selectedPayment}</h4>
//                     </div>
//                   </div>
//                   <div className="orderTotalContainer">
//                     <h3>Order Details</h3>
//                     <div className="orderItems">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>PRODUCTS</th>
//                             <th>SUBTOTALS</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {cartItems.map((items) => (
//                             <tr key={items.uniqueCartId}>
//                               <td>
//                                 {items.productName} x {items.quantity}
//                               </td>
//                               <td>₹{items.productPrice * items.quantity}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className="orderTotal">
//                       <table>
//                         <tbody>
//                           <tr>
//                             <th>Subtotal</th>
//                             <td>₹{totalPrice.toFixed(2)}</td>
//                           </tr>
//                           <tr>
//                             <th>Shipping</th>
//                             <td>₹5</td>
//                           </tr>
//                           <tr>
//                             <th>VAT</th>
//                             <td>₹11</td>
//                           </tr>
//                           <tr>
//                             <th>Total</th>
//                             <td>
//                               ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;

import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotalAmount,
  setCartItems,
} from "../../Features/Cart/cartSlice";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import success from "../../Assets/success.png";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [orderId, setOrderId] = useState(null); // Store the created order ID

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };

  const handleQuantityChange = (uniqueId, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 20) {
      return; // Prevent invalid quantities
    }

    const item = cartItems.find((item) => item.uniqueCartId === uniqueId);

    if (item) {
      const productID = item.productID || item.productId || item._id;
      dispatch(
        updateQuantity({
          uniqueId: uniqueId,
          productID: productID,
          quantity: parsedQuantity,
        })
      );
    } else {
      console.error("Item not found for uniqueId:", uniqueId);
    }
  };

  const totalPrice = useSelector(selectCartTotalAmount);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Current Date
  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number
  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data
  const [selectedPayment, setSelectedPayment] = useState("Direct Bank Transfer");

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        let user;
        try {
          user = JSON.parse(storedUser);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          return;
        }

        const userId = user.id;
        if (!userId) return;

        // Only fetch if cart is empty to avoid overwriting local changes
        if (cartItems.length > 0) {
          console.log("Using existing cart items:", cartItems);
          return;
        }

        const response = await fetch(
          `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.status}`);
        }

        const cart = await response.json();
        console.log("Fetched Cart:", cart);

        if (cart && cart.items && Array.isArray(cart.items)) {
          const updatedItems = await Promise.all(
            cart.items.map(async (item, index) => {
              if (!item.productId) return null;

              const productId = item.productId._id || item.productId;

              try {
                const productResponse = await fetch(
                  `https://toyshop-sooty.vercel.app/api/products/${productId}`
                );
                if (!productResponse.ok) {
                  throw new Error(`Failed to fetch product ${productId}`);
                }
                const product = await productResponse.json();

                return {
                  uniqueCartId: `cart-item-${index}-${productId}`,
                  productID: productId,
                  productName: product.name || "Unnamed Product",
                  productPrice: product.price || 0,
                  frontImg: product.imageUrls?.[0] || "",
                  quantity: item.quantity || 1,
                  productReviews: "No Reviews",
                };
              } catch (error) {
                console.error(`Failed to fetch product ${productId}:`, error);
                return null;
              }
            })
          );

          const validItems = updatedItems.filter((item) => item !== null);
          console.log("Updated Cart Items:", validItems);

          dispatch(setCartItems({ items: validItems }));
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    fetchCart();
  }, [dispatch, cartItems.length]);

  // Function to handle order placement
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      alert("Please log in to place an order.");
      navigate("/loginSignUp", { replace: true });
      return false;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      alert("Invalid user data. Please log in again.");
      navigate("/loginSignUp", { replace: true });
      return false;
    }

    const userId = user.id;
    if (!userId) {
      alert("User ID not found. Please log in again.");
      navigate("/loginSignUp", { replace: true });
      return false;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return false;
    }

    const orderData = {
      userId,
      products: cartItems.map((item) => ({
        productId: item.productID || item.productId || item._id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("https://toyshop-sooty.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const orderResponse = await response.json();
      const createdOrderId = orderResponse.order._id; // Assuming the API returns the order ID
      setOrderId(createdOrderId); // Store the order ID

      // Clear cart in Redux
      dispatch(setCartItems({ items: [] }));

      // Clear backend cart
      try {
        const clearResponse = await fetch(
          `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ items: [] }),
          }
        );
        if (!clearResponse.ok) {
          console.error("Failed to clear backend cart:", clearResponse.status);
        }
      } catch (error) {
        console.error("Error clearing backend cart:", error);
      }

      alert("Order is created");
      return true; // Indicate success
    } catch (error) {
      console.error("Order Placement Error:", error.message);
      alert(`Error placing order: ${error.message}`);
      return false; // Indicate failure
    }
  };

  // Function to handle address submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);
    
    const addressData = {
      orderId: orderId,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phoneNumber: formData.get("phone"),
      email: formData.get("email"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2") || "",
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
    };

    try {
      const response = await fetch("https://toyshop-sooty.vercel.app/api/address/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      alert("Address saved successfully!");
      handleTabClick("cartTab3");
      setPayments(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Address Submission Error:", error.message);
      alert(`Error saving address: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="shoppingCartSection">
        <h2>Cart</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shopping Bag</h3>
                  <p>Manage Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shipping and Checkout</h3>
                  <p>Checkout Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Confirmation</h3>
                  <p>Review And Submit Your Order</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => {
                          const itemId = item.productID || item.productId || item._id;
                          const uniqueId = item.uniqueCartId || `cart-item-${index}-${itemId}`;

                          return (
                            <tr key={uniqueId}>
                              <td data-label="Product">
                                <div className="shoppingBagTableImg">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <img src={item.frontImg} alt={item.productName} />
                                  </Link>
                                </div>
                              </td>
                              <td data-label="">
                                <div className="shoppingBagTableProductDetail">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews || "No reviews"}</p>
                                </div>
                              </td>
                              <td data-label="Price" style={{ textAlign: "center" }}>
                                ₹{item.productPrice}
                              </td>
                              <td data-label="Quantity">
                                <div className="ShoppingBagTableQuantity">
                                  <button
                                    onClick={() => handleQuantityChange(uniqueId, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    min="1"
                                    max="20"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(uniqueId, parseInt(e.target.value))
                                    }
                                  />
                                  <button
                                    onClick={() => handleQuantityChange(uniqueId, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td data-label="Subtotal">
                                <p
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "500",
                                  }}
                                >
                                  ₹{item.quantity * item.productPrice}
                                </p>
                              </td>
                              <td data-label="">
                                <MdOutlineClose
                                  onClick={() => dispatch(removeFromCart(itemId))}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>Your cart is empty!</span>
                              <Link to="/shop" onClick={scrollToTop}>
                                <button>Shop Now</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th
                          colSpan="6"
                          className="shopCartFooter"
                          style={{
                            borderBottom: "none",
                            padding: "20px 0px",
                          }}
                        >
                          {cartItems.length > 0 && (
                            <div className="shopCartFooterContainer">
                              <form>
                                <input
                                  type="text"
                                  placeholder="Coupon Code"
                                ></input>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  Apply Coupon
                                </button>
                              </form>
                              <button
                                onClick={async (e) => {
                                  e.preventDefault();
                                  try {
                                    const storedUser = localStorage.getItem("user");
                                    if (!storedUser) {
                                      alert("Please log in to update cart");
                                      return;
                                    }

                                    const user = JSON.parse(storedUser);
                                    const userId = user.id;

                                    const response = await fetch(
                                      `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
                                      {
                                        method: "PUT",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          items: cartItems.map((item) => ({
                                            productId: item.productID || item.productId || item._id,
                                            quantity: item.quantity,
                                            price: item.productPrice,
                                          })),
                                        }),
                                      }
                                    );

                                    if (!response.ok) {
                                      throw new Error(`Failed to update cart: ${response.status}`);
                                    }

                                    const updatedCart = await response.json();
                                    console.log("Updated Cart Response:", updatedCart);

                                    if (updatedCart.cart && updatedCart.cart.items) {
                                      const updatedItems = updatedCart.cart.items.map(
                                        (item, index) => ({
                                          uniqueCartId: `cart-item-${index}-${
                                            item.productId._id || item.productId
                                          }`,
                                          productID: item.productId._id || item.productId,
                                          productName: item.productId.name || "Unnamed Product",
                                          productPrice: item.price,
                                          frontImg: item.productId.imageUrls?.[0] || "",
                                          quantity: item.quantity,
                                          productReviews: "No Reviews",
                                        })
                                      );

                                      dispatch(setCartItems({ items: updatedItems }));
                                      alert("Cart updated successfully!");
                                    } else {
                                      throw new Error("Invalid cart data in response");
                                    }
                                  } catch (error) {
                                    console.error("Failed to update cart:", error);
                                    alert("Failed to update cart");
                                  }
                                }}
                                className="shopCartFooterbutton"
                              >
                                Update Cart
                              </button>
                            </div>
                          )}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                  {/* For Mobile devices */}
                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item, index) => {
                          const itemId = item.productID || item.productId || item._id;
                          const uniqueId = item.uniqueCartId || `cart-item-${index}-${itemId}`;

                          return (
                            <div key={uniqueId}>
                              <div className="shoppingBagTableMobileItems">
                                <div className="shoppingBagTableMobileItemsImg">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <img src={item.frontImg} alt={item.productName} />
                                  </Link>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetail">
                                  <div className="shoppingBagTableMobileItemsDetailMain">
                                    <Link to="/product" onClick={scrollToTop}>
                                      <h4>{item.productName}</h4>
                                    </Link>
                                    <p>{item.productReviews || "No Reviews"}</p>
                                    <div className="shoppingBagTableMobileQuantity">
                                      <button
                                        onClick={() => handleQuantityChange(uniqueId, item.quantity - 1)}
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        min="1"
                                        max="20"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(uniqueId, parseInt(e.target.value))
                                        }
                                      />
                                      <button
                                        onClick={() => handleQuantityChange(uniqueId, item.quantity + 1)}
                                      >
                                        +
                                      </button>
                                    </div>
                                    <span>₹{item.productPrice}</span>
                                  </div>
                                  <div className="shoppingBagTableMobileItemsDetailTotal">
                                    <MdOutlineClose
                                      size={20}
                                      onClick={() => dispatch(removeFromCart(itemId))}
                                    />
                                    <p>₹{item.quantity * item.productPrice}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="shopCartFooter">
                          <div className="shopCartFooterContainer">
                            <form>
                              <input
                                type="text"
                                placeholder="Coupon Code"
                              ></input>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Apply Coupon
                              </button>
                            </form>
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  const storedUser = localStorage.getItem("user");
                                  if (!storedUser) {
                                    alert("Please log in to update cart");
                                    return;
                                  }

                                  const user = JSON.parse(storedUser);
                                  const userId = user.id;

                                  const response = await fetch(
                                    `https://toyshop-sooty.vercel.app/api/cart/${userId}`,
                                    {
                                      method: "PUT",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        items: cartItems.map((item) => ({
                                          productId: item.productID || item.productId || item._id,
                                          quantity: item.quantity,
                                          price: item.productPrice,
                                        })),
                                      }),
                                    }
                                  );

                                  if (!response.ok) {
                                    throw new Error(`Failed to update cart: ${response.status}`);
                                  }

                                  const updatedCart = await response.json();
                                  console.log("Updated Cart Response:", updatedCart);

                                  if (updatedCart.cart && updatedCart.cart.items) {
                                    const updatedItems = updatedCart.cart.items.map(
                                      (item, index) => ({
                                        uniqueCartId: `cart-item-${index}-${
                                          item.productId._id || item.productId
                                        }`,
                                        productID: item.productId._id || item.productId,
                                        productName: item.productId.name || "Unnamed Product",
                                        productPrice: item.price,
                                        frontImg: item.productId.imageUrls?.[0] || "",
                                        quantity: item.quantity,
                                        productReviews: "No Reviews",
                                      })
                                    );

                                    dispatch(setCartItems({ items: updatedItems }));
                                    alert("Cart updated successfully!");
                                  } else {
                                    throw new Error("Invalid cart data in response");
                                  }
                                } catch (error) {
                                  console.error("Failed to update cart:", error);
                                  alert("Failed to update cart");
                                }
                              }}
                              className="shopCartFooterbutton"
                            >
                              Update Cart
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Your cart is empty!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Shop Now</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>Cart Totals</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>₹{totalPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>
                          <div className="shoppingBagTotalTableCheck">
                            <p>₹{(totalPrice === 0 ? 0 : 5).toFixed(2)}</p>
                            <p>Shipping to Al..</p>
                            <p
                              onClick={scrollToTop}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              CHANGE ADDRESS
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>VAT</th>
                        <td>₹{(totalPrice === 0 ? 0 : 11).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>
                          ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={async () => {
                      const success = await handlePlaceOrder();
                      if (success) {
                        handleTabClick("cartTab2"); // Proceed to cartTab2 after order creation
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <div className="checkoutSection">
                <div className="checkoutDetailsSection">
                  <h4>Billing Details</h4>
                  <div className="checkoutDetailsForm">
                    <form onSubmit={handleAddressSubmit}>
                      <div className="checkoutDetailsFormRow">
                        <input type="text" name="firstName" placeholder="First Name *" required />
                        <input type="text" name="lastName" placeholder="Last Name *" required />
                      </div>
                      <select name="country" id="country" required>
                        <option value="" disabled selected>
                          Country / Region *
                        </option>
                        <option value="INDIA">India</option>
                        <option value="CANADA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="USA">United States</option>
                        <option value="TURKEY">Turkey</option>
                      </select>
                      <input type="text" name="addressLine1" placeholder="Street Address *" required />
                      <input type="text" name="addressLine2" placeholder="Apartment, suite, etc. (optional)" />
                      <input type="text" name="city" placeholder="Town / City *" required />
                      <input type="text" name="state" placeholder="State *" required />
                      <input type="text" name="postalCode" placeholder="Postcode / ZIP *" required />
                      <input type="tel" name="phone" placeholder="Phone *" required />
                      <input type="email" name="email" placeholder="Your Email *" required />
                      <div className="checkoutDetailsFormCheck">
                        <label>
                          <input type="checkbox" />
                          <p>Create An Account?</p>
                        </label>
                        <label>
                          <input type="checkbox" />
                          <p>Ship to a different Address</p>
                        </label>
                      </div>
                      <textarea
                        cols={30}
                        rows={8}
                        name="orderNotes"
                        placeholder="Order Notes (Optional)"
                      />
                      <button type="submit">Place Order</button>
                    </form>
                  </div>
                </div>
                <div className="checkoutPaymentSection">
                  <div className="checkoutTotalContainer">
                    <h3>Your Order</h3>
                    <div className="checkoutItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr key={items.uniqueCartId}>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>₹{items.productPrice * items.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkoutTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{totalPrice.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹5</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="checkoutPaymentContainer">
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Direct Bank Transfer"
                        defaultChecked
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Direct Bank Transfer</span>
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.Your
                          order will not be shipped until the funds have cleared
                          in our account.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Check Payments"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Check Payments</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissimo viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on delivery"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Cash on delivery</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissimo viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Paypal"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Paypal</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissimo viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <div className="policyText">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link to="/terms" onClick={scrollToTop}>
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Your order is completed!</h3>
                    <p>Thank you. Your order has been received.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Order Number</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Date</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>₹{totalPrice.toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Payment Method</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Order Details</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr key={items.uniqueCartId}>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>₹{items.productPrice * items.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{totalPrice.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹5</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;