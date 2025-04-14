

// // import React, { useState, useEffect } from "react";
// // import "./ShopDetails.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addToCart } from "../../../Features/Cart/cartSlice";
// // import Filter from "../Filters/Filter";
// // import { Link } from "react-router-dom";
// // import { FiHeart } from "react-icons/fi";
// // import { FaStar, FaCartPlus } from "react-icons/fa";
// // import { IoFilterSharp, IoClose } from "react-icons/io5";
// // import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// // import toast from "react-hot-toast";

// // const ShopDetails = () => {
// //   const dispatch = useDispatch();
// //   const [products, setProducts] = useState([]);
// //   const [wishList, setWishList] = useState({});
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 6;

// //   useEffect(() => {
// //     fetch(`https://toyshop-sooty.vercel.app/api/products?page=${currentPage}&limit=${productsPerPage}`)
// //       .then((res) => res.json())
// //       .then((data) => setProducts(data))
// //       .catch((err) => console.error("Error fetching products:", err));
// //   }, [currentPage]);

// //   const handleWishlistClick = (productID) => {
// //     setWishList((prevWishlist) => ({
// //       ...prevWishlist,
// //       [productID]: !prevWishlist[productID],
// //     }));
// //   };

// //   const scrollToTop = () => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
// //   const closeDrawer = () => setIsDrawerOpen(false);
  
// //   const cartItems = useSelector((state) => state.cart.items);

// //   // const handleAddToCart = (product) => {
// //   //   const productInCart = cartItems.find((item) => item._id === product._id);
// //   //   if (productInCart && productInCart.quantity >= 20) {
// //   //     toast.error("Product limit reached", { duration: 2000, style: { backgroundColor: "#ff4b4b", color: "white" } });
// //   //   } else {
// //   //     dispatch(addToCart(product));
// //   //     toast.success("Added to cart!", { duration: 2000, style: { backgroundColor: "#07bc0c", color: "white" } });
// //   //   }
// //   // };

// //   const handleAddToCart = async (product) => {
// //     try {
// //       // Fetch product details from the API using the product ID
// //       const response = await fetch(`https://toyshop-sooty.vercel.app/api/products/${product._id}`);
// //       const productData = await response.json();
  
// //       // Structure the product object to match what the cart expects
// //       const cartProduct = {
// //         productID: productData._id,
// //         frontImg: productData.imageUrls[0], // Use the first image
// //         productName: productData.name,
// //         productPrice: productData.price,
// //         quantity: 1, // Default quantity
// //         productReviews: productData.productReviews || "No Reviews", // Optional
// //       };
  
// //       // Check if the product is already in the cart and limit quantity
// //       const productInCart = cartItems.find((item) => item.productID === cartProduct.productID);
// //       if (productInCart && productInCart.quantity >= 20) {
// //         toast.error("Product limit reached", {
// //           duration: 2000,
// //           style: { backgroundColor: "#ff4b4b", color: "white" },
// //         });
// //       } else {
// //         // Dispatch the product to the Redux store
// //         dispatch(addToCart(cartProduct));
// //         toast.success("Added to cart!", {
// //           duration: 2000,
// //           style: { backgroundColor: "#07bc0c", color: "white" },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error adding product to cart:", error);
// //       toast.error("Failed to add to cart", {
// //         duration: 2000,
// //         style: { backgroundColor: "#ff4b4b", color: "white" },
// //       });
// //     }
// //   };
// //   return (
// //     <>
// //       <div className="shopDetails">
// //         <div className="shopDetailMain">
// //           <div className="shopDetails__left">
// //             <Filter />
// //           </div>
// //           <div className="shopDetails__right">
// //             <div className="shopDetailsSorting">
// //               <div className="shopDetailsBreadcrumbLink">
// //                 <Link to="/" onClick={scrollToTop}>Home</Link> &nbsp;/&nbsp;
// //                 <Link to="/shop">The Shop</Link>
// //               </div>
// //               <div className="filterLeft" onClick={toggleDrawer}>
// //                 <IoFilterSharp /> <p>Filter</p>
// //               </div>
// //             </div>
// //             <div className="shopDetailsProducts">
// //               <div className="shopDetailsProductsContainer">
// //                 {products.map((product) => (
// //                   <div className="sdProductContainer" key={product._id}>
// //                   <div className="sdProductImages">
// //   <Link to={`/product/${product._id}`} onClick={scrollToTop}>
// //     <img src={product.imageUrls[0]} alt="" className="sdProduct_front" />
// //     <img src={product.imageUrls[1]} alt="" className="sdProduct_back" />
// //   </Link>
// //   <h4 onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Add to Cart</h4>
// // </div>

// //                     <div className="sdProductImagesCart" onClick={() => handleAddToCart(product)}>
// //                       <FaCartPlus />
// //                     </div>
// //                     <div className="sdProductInfo">
// //                       <div className="sdProductCategoryWishlist">
// //                         <p>{product.categoryID}</p>
// //                         <FiHeart
// //                           onClick={() => handleWishlistClick(product._id)}
// //                           style={{ color: wishList[product._id] ? "red" : "#767676", cursor: "pointer" }}
// //                         />
// //                       </div>
// //                       <div className="sdProductNameInfo">
// //                         <Link to={`/product/${product._id}`} onClick={scrollToTop}>
// //                           <h5>{product.name}</h5>
// //                         </Link>
// //                         <p>${product.price}</p>
// //                         <div className="sdProductRatingReviews">
// //                           <div className="sdProductRatingStar">
// //                             {[...Array(5)].map((_, index) => (
// //                               <FaStar key={index} color="#FEC78A" size={10} />
// //                             ))}
// //                           </div>
// //                           <span>{product.productReviews || "No Reviews"}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //             {/* Pagination */}
// //             <div className="shopDetailsPagination">
// //               <div className="sdPaginationPrev">
// //                 {currentPage > 1 && (
// //                   <p onClick={() => { setCurrentPage(currentPage - 1); scrollToTop(); }}>
// //                     <FaAngleLeft /> Prev
// //                   </p>
// //                 )}
// //               </div>
// //               <div className="sdPaginationNumber">
// //                 <div className="paginationNum">
// //                   <p className={currentPage === 1 ? "active" : ""} onClick={() => { setCurrentPage(1); scrollToTop(); }}>1</p>
// //                   <p className={currentPage === 2 ? "active" : ""} onClick={() => { setCurrentPage(2); scrollToTop(); }}>2</p>
// //                   <p className={currentPage === 3 ? "active" : ""} onClick={() => { setCurrentPage(3); scrollToTop(); }}>3</p>
// //                   <p className={currentPage === 4 ? "active" : ""} onClick={() => { setCurrentPage(4); scrollToTop(); }}>4</p>
// //                 </div>
// //               </div>
// //               <div className="sdPaginationNext">
// //                 <p onClick={() => { setCurrentPage(currentPage + 1); scrollToTop(); }}>
// //                   Next <FaAngleRight />
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Drawer */}
// //       <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
// //         <div className="drawerHeader">
// //           <p>Filter By</p>
// //           <IoClose onClick={closeDrawer} className="closeButton" size={26} />
// //         </div>
// //         <div className="drawerContent">
// //           <Filter />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ShopDetails;

// import React, { useState, useEffect } from "react";
// import "./ShopDetails.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";
// import Filter from "../Filters/Filter";
// import { Link } from "react-router-dom";
// import { FiHeart } from "react-icons/fi";
// import { FaStar, FaCartPlus } from "react-icons/fa";
// import { IoFilterSharp, IoClose } from "react-icons/io5";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import axios from "axios";

// const ShopDetails = () => {
//   const dispatch = useDispatch();
//   const [products, setProducts] = useState([]);
//   const [wishList, setWishList] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const productsPerPage = 6;
//   const [filters, setFilters] = useState({
//     categoryID: null,
//     subcategoryID: null,
//     minPrice: 0,
//     maxPrice: 1000,
//   });

//   const fetchProducts = async () => {
//     try {
//       let url = `https://toyshop-sooty.vercel.app/api/products?page=${currentPage}&limit=${productsPerPage}`;
//       const params = [];

//       if (filters.subcategoryID) {
//         // Fetch by subcategory
//         url = `https://toyshop-sooty.vercel.app/api/products/subcategory/${filters.subcategoryID}`;
//       } else if (filters.categoryID) {
//         // Fetch by category
//         params.push(`categoryID=${filters.categoryID}`);
//       }
//       if (filters.minPrice !== null) {
//         params.push(`minPrice=${filters.minPrice}`);
//       }
//       if (filters.maxPrice !== null) {
//         params.push(`maxPrice=${filters.maxPrice}`);
//       }

//       if (params.length > 0 && !filters.subcategoryID) {
//         url += `&${params.join("&")}`;
//       }

//       const response = await axios.get(url);
//       let fetchedProducts = response.data;

//       // If category filter, fetch products from subcategories
//       if (filters.categoryID && !filters.subcategoryID) {
//         const categoryResponse = await axios.get(
//           `https://toyshop-sooty.vercel.app/api/categories`
//         );
//         const category = categoryResponse.data.find(
//           (cat) => cat.categoryID === filters.categoryID
//         );
//         if (category) {
//           const productIds = category.subcategories.flatMap((sub) =>
//             sub.products
//           );
//           const uniqueProductIds = [...new Set(productIds)];
//           fetchedProducts = await Promise.all(
//             uniqueProductIds.map(async (id) => {
//               const productResponse = await axios.get(
//                 `https://toyshop-sooty.vercel.app/api/products/${id}`
//               );
//               return productResponse.data;
//             })
//           );
//           // Apply price filter client-side
//           fetchedProducts = fetchedProducts.filter(
//             (product) =>
//               product.price >= filters.minPrice &&
//               product.price <= filters.maxPrice
//           );
//         }
//       }

//       // Paginate results
//       const startIndex = (currentPage - 1) * productsPerPage;
//       const paginatedProducts = fetchedProducts.slice(
//         startIndex,
//         startIndex + productsPerPage
//       );
//       setProducts(paginatedProducts);
//       setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage));
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, filters]);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   const cartItems = useSelector((state) => state.cart.items);

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch(
//         `https://toyshop-sooty.vercel.app/api/products/${product._id}`
//       );
//       const productData = await response.json();

//       const cartProduct = {
//         productID: productData._id,
//         frontImg: productData.imageUrls[0],
//         productName: productData.name,
//         productPrice: productData.price,
//         quantity: 1,
//         productReviews: productData.productReviews || "No Reviews",
//       };

//       const productInCart = cartItems.find(
//         (item) => item.productID === cartProduct.productID
//       );
//       if (productInCart && productInCart.quantity >= 20) {
//         toast.error("Product limit reached", {
//           duration: 2000,
//           style: { backgroundColor: "#ff4b4b", color: "white" },
//         });
//       } else {
//         dispatch(addToCart(cartProduct));
//         toast.success("Added to cart!", {
//           duration: 2000,
//           style: { backgroundColor: "#07bc0c", color: "white" },
//         });
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Failed to add to cart", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     }
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1); // Reset to page 1 on filter change
//   };

//   return (
//     <>
//       <div className="shopDetails">
//         <div className="shopDetailMain">
//           <div className="shopDetails__left">
//             <Filter onFilterChange={handleFilterChange} />
//           </div>
//           <div className="shopDetails__right">
//             <div className="shopDetailsSorting">
//               <div className="shopDetailsBreadcrumbLink">
//                 <Link to="/" onClick={scrollToTop}>
//                   Home
//                 </Link>{" "}
//                  / 
//                 <Link to="/shop">The Shop</Link>
//               </div>
//               <div className="filterLeft" onClick={toggleDrawer}>
//                 <IoFilterSharp /> <p>Filter</p>
//               </div>
//             </div>
//             <div className="shopDetailsProducts">
//               <div className="shopDetailsProductsContainer">
//                 {products.length > 0 ? (
//                   products.map((product) => (
//                     <div className="sdProductContainer" key={product._id}>
//                       <div className="sdProductImages">
//                         <Link
//                           to={`/product/${product._id}`}
//                           onClick={scrollToTop}
//                         >
//                           <img
//                             src={product.imageUrls[0]}
//                             alt=""
//                             className="sdProduct_front"
//                           />
//                           <img
//                             src={product.imageUrls[1] || product.imageUrls[0]}
//                             alt=""
//                             className="sdProduct_back"
//                           />
//                         </Link>
//                         <h4
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAddToCart(product);
//                           }}
//                         >
//                           Add to Cart
//                         </h4>
//                       </div>
//                       <div
//                         className="sdProductImagesCart"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <FaCartPlus />
//                       </div>
//                       <div className="sdProductInfo">
//                         <div className="sdProductCategoryWishlist">
//                           <p>{product.categoryID || "Uncategorized"}</p>
//                           <FiHeart
//                             onClick={() => handleWishlistClick(product._id)}
//                             style={{
//                               color: wishList[product._id] ? "red" : "#767676",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </div>
//                         <div className="sdProductNameInfo">
//                           <Link
//                             to={`/product/${product._id}`}
//                             onClick={scrollToTop}
//                           >
//                             <h5>{product.name}</h5>
//                           </Link>
//                           <p>${product.price}</p>
//                           <div className="sdProductRatingReviews">
//                             <div className="sdProductRatingStar">
//                               {[...Array(5)].map((_, index) => (
//                                 <FaStar key={index} color="#FEC78A" size={10} />
//                               ))}
//                             </div>
//                             <span>{product.productReviews || "No Reviews"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No products found.</p>
//                 )}
//               </div>
//             </div>
//             {/* Pagination */}
//             <div className="shopDetailsPagination">
//               <div className="sdPaginationPrev">
//                 {currentPage > 1 && (
//                   <p
//                     onClick={() => {
//                       setCurrentPage(currentPage - 1);
//                       scrollToTop();
//                     }}
//                   >
//                     <FaAngleLeft /> Prev
//                   </p>
//                 )}
//               </div>
//               <div className="sdPaginationNumber">
//                 <div className="paginationNum">
//                   {[...Array(totalPages)].map((_, index) => (
//                     <p
//                       key={index + 1}
//                       className={currentPage === index + 1 ? "active" : ""}
//                       onClick={() => {
//                         setCurrentPage(index + 1);
//                         scrollToTop();
//                       }}
//                     >
//                       {index + 1}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//               <div className="sdPaginationNext">
//                 {currentPage < totalPages && (
//                   <p
//                     onClick={() => {
//                       setCurrentPage(currentPage + 1);
//                       scrollToTop();
//                     }}
//                   >
//                     Next <FaAngleRight />
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Drawer */}
//       <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
//         <div className="drawerHeader">
//           <p>Filter By</p>
//           <IoClose onClick={closeDrawer} className="closeButton" size={26} />
//         </div>
//         <div className="drawerContent">
//           <Filter onFilterChange={handleFilterChange} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopDetails;

// import React, { useState, useEffect } from "react";
// import "./ShopDetails.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";
// import Filter from "../Filters/Filter";
// import { Link } from "react-router-dom";
// import { FiHeart } from "react-icons/fi";
// import { FaStar, FaCartPlus } from "react-icons/fa";
// import { IoFilterSharp, IoClose } from "react-icons/io5";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import axios from "axios";

// const ShopDetails = () => {
//   const dispatch = useDispatch();
//   const [products, setProducts] = useState([]);
//   const [wishList, setWishList] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const productsPerPage = 6;
//   const [filters, setFilters] = useState({
//     categoryID: null,
//     subcategoryID: null,
//     minPrice: 0,
//     maxPrice: 1000,
//     materialTypes: [],
//     productTypes: [],
//   });

//   const fetchProducts = async () => {
//     try {
//       let fetchedProducts = [];
//       let url = `https://toyshop-sooty.vercel.app/api/products?page=${currentPage}&limit=${productsPerPage}`;

//       if (filters.subcategoryID) {
//         // Fetch by subcategory
//         const response = await axios.get(
//           `https://toyshop-sooty.vercel.app/api/products/subcategory/${filters.subcategoryID}`
//         );
//         fetchedProducts = response.data;
//       } else if (filters.categoryID) {
//         // Fetch by category
//         const categoryResponse = await axios.get(
//           `https://toyshop-sooty.vercel.app/api/categories`
//         );
//         const category = categoryResponse.data.find(
//           (cat) => cat.categoryID === filters.categoryID
//         );
//         if (category) {
//           const productIds = [
//             ...new Set(category.subcategories.flatMap((sub) => sub.products)),
//           ];
//           fetchedProducts = await Promise.all(
//             productIds.map(async (id) => {
//               try {
//                 const productResponse = await axios.get(
//                   `https://toyshop-sooty.vercel.app/api/products/${id}`
//                 );
//                 return productResponse.data;
//               } catch (err) {
//                 console.error(`Error fetching product ${id}:`, err);
//                 return null;
//               }
//             })
//           );
//           fetchedProducts = fetchedProducts.filter((p) => p !== null);
//         }
//       } else {
//         // Fetch all products
//         const response = await axios.get(url);
//         fetchedProducts = response.data;
//       }

//       // Apply filters
//       fetchedProducts = fetchedProducts.filter((product) => {
//         const priceMatch =
//           product.price >= filters.minPrice &&
//           product.price <= filters.maxPrice;
//         const materialMatch =
//           filters.materialTypes.length === 0 ||
//           filters.materialTypes.includes(product.materialType);
//         const productTypeMatch =
//           filters.productTypes.length === 0 ||
//           filters.productTypes.includes(product.productType);
//         return priceMatch && materialMatch && productTypeMatch;
//       });

//       // Paginate results
//       const startIndex = (currentPage - 1) * productsPerPage;
//       const paginatedProducts = fetchedProducts.slice(
//         startIndex,
//         startIndex + productsPerPage
//       );
//       setProducts(paginatedProducts);
//       setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage));
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//       setTotalPages(1);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, filters]);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   const cartItems = useSelector((state) => state.cart.items);

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch(
//         `https://toyshop-sooty.vercel.app/api/products/${product._id}`
//       );
//       const productData = await response.json();

//       const cartProduct = {
//         productID: productData._id,
//         frontImg: productData.imageUrls[0],
//         productName: productData.name,
//         productPrice: productData.price,
//         quantity: 1,
//         productReviews: productData.productReviews || "No Reviews",
//       };

//       const productInCart = cartItems.find(
//         (item) => item.productID === cartProduct.productID
//       );
//       if (productInCart && productInCart.quantity >= 20) {
//         toast.error("Product limit reached", {
//           duration: 2000,
//           style: { backgroundColor: "#ff4b4b", color: "white" },
//         });
//       } else {
//         dispatch(addToCart(cartProduct));
//         toast.success("Added to cart!", {
//           duration: 2000,
//           style: { backgroundColor: "#07bc0c", color: "white" },
//         });
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Failed to add to cart", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     }
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       <div className="shopDetails">
//         <div className="shopDetailMain">
//           <div className="shopDetails__left">
//             <Filter onFilterChange={handleFilterChange} />
//           </div>
//           <div className="shopDetails__right">
//             <div className="shopDetailsSorting">
//               <div className="shopDetailsBreadcrumbLink">
//                 <Link to="/" onClick={scrollToTop}>
//                   Home
//                 </Link>{" "}
//                  / 
//                 <Link to="/shop">The Shop</Link>
//               </div>
//               <div className="filterLeft" onClick={toggleDrawer}>
//                 <IoFilterSharp /> <p>Filter</p>
//               </div>
//             </div>
//             <div className="shopDetailsProducts">
//               <div className="shopDetailsProductsContainer">
//                 {products.length > 0 ? (
//                   products.map((product) => (
//                     <div className="sdProductContainer" key={product._id}>
//                       <div className="sdProductImages">
//                         <Link
//                           to={`/product/${product._id}`}
//                           onClick={scrollToTop}
//                         >
//                           <img
//                             src={product.imageUrls[0]}
//                             alt=""
//                             className="sdProduct_front"
//                           />
//                           <img
//                             src={product.imageUrls[1] || product.imageUrls[0]}
//                             alt=""
//                             className="sdProduct_back"
//                           />
//                         </Link>
//                         <h4
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAddToCart(product);
//                           }}
//                         >
//                           Add to Cart
//                         </h4>
//                       </div>
//                       <div
//                         className="sdProductImagesCart"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <FaCartPlus />
//                       </div>
//                       <div className="sdProductInfo">
//                         <div className="sdProductCategoryWishlist">
//                           <p>{product.categoryID || "Uncategorized"}</p>
//                           <FiHeart
//                             onClick={() => handleWishlistClick(product._id)}
//                             style={{
//                               color: wishList[product._id] ? "red" : "#767676",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </div>
//                         <div className="sdProductNameInfo">
//                           <Link
//                             to={`/product/${product._id}`}
//                             onClick={scrollToTop}
//                           >
//                             <h5>{product.name}</h5>
//                           </Link>
//                           <p>${product.price}</p>
//                           <div className="sdProductRatingReviews">
//                             <div className="sdProductRatingStar">
//                               {[...Array(5)].map((_, index) => (
//                                 <FaStar key={index} color="#FEC78A" size={10} />
//                               ))}
//                             </div>
//                             <span>{product.productReviews || "No Reviews"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No products found.</p>
//                 )}
//               </div>
//             </div>
//             <div className="shopDetailsPagination">
//               <div className="sdPaginationPrev">
//                 {currentPage > 1 && (
//                   <p
//                     onClick={() => {
//                       setCurrentPage(currentPage - 1);
//                       scrollToTop();
//                     }}
//                   >
//                     <FaAngleLeft /> Prev
//                   </p>
//                 )}
//               </div>
//               <div className="sdPaginationNumber">
//                 <div className="paginationNum">
//                   {[...Array(totalPages)].map((_, index) => (
//                     <p
//                       key={index + 1}
//                       className={currentPage === index + 1 ? "active" : ""}
//                       onClick={() => {
//                         setCurrentPage(index + 1);
//                         scrollToTop();
//                       }}
//                     >
//                       {index + 1}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//               <div className="sdPaginationNext">
//                 {currentPage < totalPages && (
//                   <p
//                     onClick={() => {
//                       setCurrentPage(currentPage + 1);
//                       scrollToTop();
//                     }}
//                   >
//                     Next <FaAngleRight />
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
//         <div className="drawerHeader">
//           <p>Filter By</p>
//           <IoClose onClick={closeDrawer} className="closeButton" size={26} />
//         </div>
//         <div className="drawerContent">
//           <Filter onFilterChange={handleFilterChange} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopDetails;

import React, { useState, useEffect } from "react";
import "./ShopDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;
  const [filters, setFilters] = useState({
    categoryID: null,
    subcategoryID: null,
    minPrice: 0,
    maxPrice: 1000,
    materialTypes: [],
  });

  const fetchProducts = async () => {
    try {
      let fetchedProducts = [];
      let url = `https://toyshop-sooty.vercel.app/api/products?page=${currentPage}&limit=${productsPerPage}`;

      if (filters.subcategoryID) {
        // Fetch by subcategory
        const response = await axios.get(
          `https://toyshop-sooty.vercel.app/api/products/subcategory/${filters.subcategoryID}`
        );
        fetchedProducts = response.data;
      } else if (filters.categoryID) {
        // Fetch by category
        const categoryResponse = await axios.get(
          `https://toyshop-sooty.vercel.app/api/categories`
        );
        const category = categoryResponse.data.find(
          (cat) => cat.categoryID === filters.categoryID
        );
        if (category) {
          const productIds = [
            ...new Set(category.subcategories.flatMap((sub) => sub.products)),
          ];
          fetchedProducts = await Promise.all(
            productIds.map(async (id) => {
              try {
                const productResponse = await axios.get(
                  `https://toyshop-sooty.vercel.app/api/products/${id}`
                );
                return productResponse.data;
              } catch (err) {
                console.error(`Error fetching product ${id}:`, err);
                return null;
              }
            })
          );
          fetchedProducts = fetchedProducts.filter((p) => p !== null);
        }
      } else {
        // Fetch all products
        const response = await axios.get(url);
        fetchedProducts = response.data;
      }

      // Apply filters
      fetchedProducts = fetchedProducts.filter((product) => {
        const priceMatch =
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice;
        const materialMatch =
          filters.materialTypes.length === 0 ||
          filters.materialTypes.includes(product.materialType);
        return priceMatch && materialMatch;
      });

      // Paginate results
      const startIndex = (currentPage - 1) * productsPerPage;
      const paginatedProducts = fetchedProducts.slice(
        startIndex,
        startIndex + productsPerPage
      );
      setProducts(paginatedProducts);
      setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage));
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch(
        `https://toyshop-sooty.vercel.app/api/products/${product._id}`
      );
      const productData = await response.json();

      const cartProduct = {
        productID: productData._id,
        frontImg: productData.imageUrls[0],
        productName: productData.name,
        productPrice: productData.price,
        quantity: 1,
        productReviews: productData.productReviews || "No Reviews",
      };

      const productInCart = cartItems.find(
        (item) => item.productID === cartProduct.productID
      );
      if (productInCart && productInCart.quantity >= 20) {
        toast.error("Product limit reached", {
          duration: 2000,
          style: { backgroundColor: "#ff4b4b", color: "white" },
        });
      } else {
        dispatch(addToCart(cartProduct));
        toast.success("Added to cart!", {
          duration: 2000,
          style: { backgroundColor: "#07bc0c", color: "white" },
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add to cart", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>{" "}
                 / 
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp /> <p>Filter</p>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div className="sdProductContainer" key={product._id}>
                      <div className="sdProductImages">
                        <Link
                          to={`/product/${product._id}`}
                          onClick={scrollToTop}
                        >
                          <img
                            src={product.imageUrls[0]}
                            alt=""
                            className="sdProduct_front"
                          />
                          <img
                            src={product.imageUrls[1] || product.imageUrls[0]}
                            alt=""
                            className="sdProduct_back"
                          />
                        </Link>
                        <h4
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="sdProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="sdProductInfo">
                        <div className="sdProductCategoryWishlist">
                          <p>{product.categoryID || "Uncategorized"}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(product._id)}
                            style={{
                              color: wishList[product._id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="sdProductNameInfo">
                          <Link
                            to={`/product/${product._id}`}
                            onClick={scrollToTop}
                          >
                            <h5>{product.name}</h5>
                          </Link>
                          <p>${product.price}</p>
                          <div className="sdProductRatingReviews">
                            <div className="sdProductRatingStar">
                              {[...Array(5)].map((_, index) => (
                                <FaStar key={index} color="#FEC78A" size={10} />
                              ))}
                            </div>
                            <span>{product.productReviews || "No Reviews"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                {currentPage > 1 && (
                  <p
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      scrollToTop();
                    }}
                  >
                    <FaAngleLeft /> Prev
                  </p>
                )}
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  {[...Array(totalPages)].map((_, index) => (
                    <p
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => {
                        setCurrentPage(index + 1);
                        scrollToTop();
                      }}
                    >
                      {index + 1}
                    </p>
                  ))}
                </div>
              </div>
              <div className="sdPaginationNext">
                {currentPage < totalPages && (
                  <p
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      scrollToTop();
                    }}
                  >
                    Next <FaAngleRight />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;