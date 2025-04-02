// import React, { useState } from "react";
// import "./ShopDetails.css";

// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";

// import Filter from "../Filters/Filter";
// import { Link } from "react-router-dom";
// import StoreData from "../../../Data/StoreData";
// import { FiHeart } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { IoFilterSharp, IoClose } from "react-icons/io5";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import { FaCartPlus } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ShopDetails = () => {
//   const dispatch = useDispatch();

//   const [wishList, setWishList] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   const cartItems = useSelector((state) => state.cart.items);

//   const handleAddToCart = (product) => {
//     const productInCart = cartItems.find(
//       (item) => item.productID === product.productID
//     );

//     if (productInCart && productInCart.quantity >= 20) {
//       toast.error("Product limit reached", {
//         duration: 2000,
//         style: {
//           backgroundColor: "#ff4b4b",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#ff4b4b",
//         },
//       });
//     } else {
//       dispatch(addToCart(product));
//       toast.success(`Added to cart!`, {
//         duration: 2000,
//         style: {
//           backgroundColor: "#07bc0c",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#07bc0c",
//         },
//       });
//     }
//   };

//   return (
//     <>
//       <div className="shopDetails">
//         <div className="shopDetailMain">
//           <div className="shopDetails__left">
//             <Filter />
//           </div>
//           <div className="shopDetails__right">
//             <div className="shopDetailsSorting">
//               <div className="shopDetailsBreadcrumbLink">
//                 <Link to="/" onClick={scrollToTop}>
//                   Home
//                 </Link>
//                 &nbsp;/&nbsp;
//                 <Link to="/shop">The Shop</Link>
//               </div>
//               <div className="filterLeft" onClick={toggleDrawer}>
//                 <IoFilterSharp />
//                 <p>Filter</p>
//               </div>
//               <div className="shopDetailsSort">
//                 <select name="sort" id="sort">
//                   <option value="default">Default Sorting</option>
//                   <option value="Featured">Featured</option>
//                   <option value="bestSelling">Best Selling</option>
//                   <option value="a-z">Alphabetically, A-Z</option>
//                   <option value="z-a">Alphabetically, Z-A</option>
//                   <option value="lowToHigh">Price, Low to high</option>
//                   <option value="highToLow">Price, high to low</option>
//                   <option value="oldToNew">Date, old to new</option>
//                   <option value="newToOld">Date, new to old</option>
//                 </select>
//                 <div className="filterRight" onClick={toggleDrawer}>
//                   <div className="filterSeprator"></div>
//                   <IoFilterSharp />
//                   <p>Filter</p>
//                 </div>
//               </div>
//             </div>
//             <div className="shopDetailsProducts">
//               <div className="shopDetailsProductsContainer">
//                 {StoreData.slice(0, 6).map((product) => (
//                   <div className="sdProductContainer" key={product.productID}>
//                     <div className="sdProductImages">
//                       <Link to="/Product" onClick={scrollToTop}>
//                         <img
//                           src={product.frontImg}
//                           alt=""
//                           className="sdProduct_front"
//                         />
//                         <img
//                           src={product.backImg}
//                           alt=""
//                           className="sdProduct_back"
//                         />
//                       </Link>
//                       <h4 onClick={() => handleAddToCart(product)}>
//                         Add to Cart
//                       </h4>
//                     </div>
//                     <div
//                       className="sdProductImagesCart"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       <FaCartPlus />
//                     </div>
//                     <div className="sdProductInfo">
//                       <div className="sdProductCategoryWishlist">
//                         <p>Dresses</p>
//                         <FiHeart
//                           onClick={() => handleWishlistClick(product.productID)}
//                           style={{
//                             color: wishList[product.productID]
//                               ? "red"
//                               : "#767676",
//                             cursor: "pointer",
//                           }}
//                         />
//                       </div>
//                       <div className="sdProductNameInfo">
//                         <Link to="/product" onClick={scrollToTop}>
//                           <h5>{product.productName}</h5>
//                         </Link>

//                         <p>${product.productPrice}</p>
//                         <div className="sdProductRatingReviews">
//                           <div className="sdProductRatingStar">
//                             <FaStar color="#FEC78A" size={10} />
//                             <FaStar color="#FEC78A" size={10} />
//                             <FaStar color="#FEC78A" size={10} />
//                             <FaStar color="#FEC78A" size={10} />
//                             <FaStar color="#FEC78A" size={10} />
//                           </div>
//                           <span>{product.productReviews}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="shopDetailsPagination">
//               <div className="sdPaginationPrev">
//                 <p onClick={scrollToTop}>
//                   <FaAngleLeft />
//                   Prev
//                 </p>
//               </div>
//               <div className="sdPaginationNumber">
//                 <div className="paginationNum">
//                   <p onClick={scrollToTop}>1</p>
//                   <p onClick={scrollToTop}>2</p>
//                   <p onClick={scrollToTop}>3</p>
//                   <p onClick={scrollToTop}>4</p>
//                 </div>
//               </div>
//               <div className="sdPaginationNext">
//                 <p onClick={scrollToTop}>
//                   Next
//                   <FaAngleRight />
//                 </p>
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
//           <Filter />
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

const ShopDetails = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch(`https://toyshop-sooty.vercel.app/api/products?page=${currentPage}&limit=${productsPerPage}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [currentPage]);

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

  // const handleAddToCart = (product) => {
  //   const productInCart = cartItems.find((item) => item._id === product._id);
  //   if (productInCart && productInCart.quantity >= 20) {
  //     toast.error("Product limit reached", { duration: 2000, style: { backgroundColor: "#ff4b4b", color: "white" } });
  //   } else {
  //     dispatch(addToCart(product));
  //     toast.success("Added to cart!", { duration: 2000, style: { backgroundColor: "#07bc0c", color: "white" } });
  //   }
  // };

  const handleAddToCart = async (product) => {
    try {
      // Fetch product details from the API using the product ID
      const response = await fetch(`https://toyshop-sooty.vercel.app/api/products/${product._id}`);
      const productData = await response.json();
  
      // Structure the product object to match what the cart expects
      const cartProduct = {
        productID: productData._id,
        frontImg: productData.imageUrls[0], // Use the first image
        productName: productData.name,
        productPrice: productData.price,
        quantity: 1, // Default quantity
        productReviews: productData.productReviews || "No Reviews", // Optional
      };
  
      // Check if the product is already in the cart and limit quantity
      const productInCart = cartItems.find((item) => item.productID === cartProduct.productID);
      if (productInCart && productInCart.quantity >= 20) {
        toast.error("Product limit reached", {
          duration: 2000,
          style: { backgroundColor: "#ff4b4b", color: "white" },
        });
      } else {
        // Dispatch the product to the Redux store
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
  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>Home</Link> &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp /> <p>Filter</p>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {products.map((product) => (
                  <div className="sdProductContainer" key={product._id}>
                  <div className="sdProductImages">
  <Link to={`/product/${product._id}`} onClick={scrollToTop}>
    <img src={product.imageUrls[0]} alt="" className="sdProduct_front" />
    <img src={product.imageUrls[1]} alt="" className="sdProduct_back" />
  </Link>
  <h4 onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Add to Cart</h4>
</div>

                    <div className="sdProductImagesCart" onClick={() => handleAddToCart(product)}>
                      <FaCartPlus />
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{product.categoryID}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{ color: wishList[product._id] ? "red" : "#767676", cursor: "pointer" }}
                        />
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
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
                ))}
              </div>
            </div>
            {/* Pagination */}
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                {currentPage > 1 && (
                  <p onClick={() => { setCurrentPage(currentPage - 1); scrollToTop(); }}>
                    <FaAngleLeft /> Prev
                  </p>
                )}
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  <p className={currentPage === 1 ? "active" : ""} onClick={() => { setCurrentPage(1); scrollToTop(); }}>1</p>
                  <p className={currentPage === 2 ? "active" : ""} onClick={() => { setCurrentPage(2); scrollToTop(); }}>2</p>
                  <p className={currentPage === 3 ? "active" : ""} onClick={() => { setCurrentPage(3); scrollToTop(); }}>3</p>
                  <p className={currentPage === 4 ? "active" : ""} onClick={() => { setCurrentPage(4); scrollToTop(); }}>4</p>
                </div>
              </div>
              <div className="sdPaginationNext">
                <p onClick={() => { setCurrentPage(currentPage + 1); scrollToTop(); }}>
                  Next <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
