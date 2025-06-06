
// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addToCart } from "../../../Features/Cart/cartSlice";
// // import { Link } from "react-router-dom";
// // import { GoChevronLeft, GoChevronRight } from "react-icons/go";
// // import { FaStar } from "react-icons/fa";
// // import { FiHeart } from "react-icons/fi";
// // import { PiShareNetworkLight } from "react-icons/pi";
// // import toast from "react-hot-toast";
// // import "./Product.css";

// // const Product = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const cartItems = useSelector((state) => state.cart.items);

// //   const [product, setProduct] = useState(null);
// //   const [currentImg, setCurrentImg] = useState(0);
// //   const [quantity, setQuantity] = useState(1);
// //   const [wishlisted, setWishlisted] = useState(false);
// //   const [categoryData, setCategoryData] = useState([]);

// //   useEffect(() => {
// //     fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
// //       .then((res) => res.json())
// //       .then((data) => setProduct(data))
// //       .catch((err) => console.error("Error fetching product:", err));
// //   }, [id]);

// //   useEffect(() => {
// //     if (product) {
// //       fetch("https://toyshop-sooty.vercel.app/api/categories")
// //         .then((res) => res.json())
// //         .then((categories) => {
// //           const matches = [];

// //           for (const category of categories) {
// //             for (const subcategory of category.subcategories) {
// //               if (subcategory.products.includes(product._id)) {
// //                 matches.push({
// //                   categoryID: category.categoryID,
// //                   subcategoryID: subcategory.subcategoryID,
// //                 });
// //               }
// //             }
// //           }

// //           setCategoryData(matches);
// //         })
// //         .catch((err) => console.error("Error fetching categories:", err));
// //     }
// //   }, [product]);

// //   if (!product) return <p>Loading...</p>;

// //   const prevImg = () => {
// //     setCurrentImg((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
// //   };

// //   const nextImg = () => {
// //     setCurrentImg((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
// //   };

// //   const increment = () => setQuantity((prev) => prev + 1);
// //   const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

// //   const handleAddToCart = () => {
// //     const productInCart = cartItems.find((item) => item._id === product._id);
// //     if (productInCart && productInCart.quantity + quantity > 20) {
// //       toast.error("Product limit reached", { duration: 2000, style: { backgroundColor: "#ff4b4b", color: "white" } });
// //     } else {
// //       dispatch(addToCart({ ...product, quantity }));
// //       toast.success("Added to cart!", { duration: 2000, style: { backgroundColor: "#07bc0c", color: "white" } });
// //     }
// //   };

// //   return (
// //     <div className="productSection">
// //       <div className="productShowCase">
// //         <div className="productGallery">
// //           <div className="productThumb">
// //             {product.imageUrls.map((img, index) => (
// //               <img key={index} src={img} onClick={() => setCurrentImg(index)} alt="Product Thumbnail" />
// //             ))}
// //           </div>
// //           <div className="productFullImg">
// //             <img src={product.imageUrls[currentImg]} alt="Product" />
// //             <div className="buttonsGroup">
// //               <button onClick={prevImg} className="directionBtn">
// //                 <GoChevronLeft size={18} />
// //               </button>
// //               <button onClick={nextImg} className="directionBtn">
// //                 <GoChevronRight size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="productDetails">
// //           <div className="productBreadcrumb">
// //             <Link to="/">Home</Link>  / 
// //             <Link to="/shop">Shop</Link>
// //           </div>

// //           <h1>{product.name}</h1>

// //           <div className="productRating">
// //             {[...Array(5)].map((_, index) => (
// //               <FaStar key={index} color="#FEC78A" size={10} />
// //             ))}
// //             <p>{product.productReviews || "No Reviews"}</p>
// //           </div>

// //           <h3>${product.price}</h3>

// //           <p>{product.description}</p>

// //           <div className="productCartQuantity">
// //             <div className="productQuantity">
// //               <button onClick={decrement}>-</button>
// //               <input type="text" value={quantity} readOnly />
// //               <button onClick={increment}>+</button>
// //             </div>
// //             <button onClick={handleAddToCart} className="productCartBtn">
// //               Add to Cart
// //             </button>
// //           </div>

// //           <div className="productWishShare">
// //             <button onClick={() => setWishlisted(!wishlisted)} className="productWishList">
// //               <FiHeart color={wishlisted ? "red" : ""} size={17} />
// //               <p>Add to Wishlist</p>
// //             </button>
// //             <div className="productShare">
// //               <PiShareNetworkLight size={22} />
// //               <p>Share</p>
// //             </div>
// //           </div>

// //           <div className="productTags">
// //             <p><span>Categories:</span></p>
// //             {categoryData.length > 0 ? (
// //               <ul>
// //                 {categoryData.map((entry, index) => (
// //                   <li key={index}>
// //                     {entry.categoryID} / {entry.subcategoryID}
// //                   </li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>Loading...</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       {/* Removed <RelatedProducts /> from here */}
// //     </div>
// //   );
// // };

// // export default Product;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";
// import { Link } from "react-router-dom";
// import { GoChevronLeft, GoChevronRight } from "react-icons/go";
// import { FaStar } from "react-icons/fa";
// import { FiHeart } from "react-icons/fi";
// import { PiShareNetworkLight } from "react-icons/pi";
// import toast from "react-hot-toast";
// import "./Product.css";

// const Product = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.items);

//   const [product, setProduct] = useState(null);
//   const [currentImg, setCurrentImg] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [categoryData, setCategoryData] = useState([]);

//   useEffect(() => {
//     fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   useEffect(() => {
//     if (product) {
//       fetch("https://toyshop-sooty.vercel.app/api/categories")
//         .then((res) => res.json())
//         .then((categories) => {
//           const matches = [];

//           for (const category of categories) {
//             for (const subcategory of category.subcategories) {
//               if (subcategory.products.includes(product._id)) {
//                 matches.push({
//                   categoryID: category.categoryID,
//                   subcategoryID: subcategory.subcategoryID,
//                 });
//               }
//             }
//           }

//           setCategoryData(matches);
//         })
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [product]);

//   if (!product) return <p>Loading...</p>;

//   const prevImg = () => {
//     setCurrentImg((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
//   };

//   const nextImg = () => {
//     setCurrentImg((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
//   };

//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     // Check if user is logged in by verifying token in localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to add items to your cart", {
//         duration: 2000,
//         style: { backgroundColor: "#07bc0c", color: "white" },
//       });
//       navigate("/loginSignUp");
//       return;
//     }

//     const productInCart = cartItems.find((item) => item.productID === product._id);
//     if (productInCart && productInCart.quantity + quantity > 20) {
//       toast.error("Product limit reached", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     } else {
//       dispatch(
//         addToCart({
//           productID: product._id,
//           frontImg: product.imageUrls[0],
//           productName: product.name,
//           productPrice: product.price,
//           quantity,
//           productReviews: product.productReviews || "No Reviews",
//         })
//       );
//       toast.success("Added to cart!", {
//         duration: 2000,
//         style: { backgroundColor: "#07bc0c", color: "white" },
//       });
//     }
//   };

//   return (
//     <div className="productSection">
//       <div className="productShowCase">
//         <div className="productGallery">
//           <div className="productThumb">
//             {product.imageUrls.map((img, index) => (
//               <img key={index} src={img} onClick={() => setCurrentImg(index)} alt="Product Thumbnail" />
//             ))}
//           </div>
//           <div className="productFullImg">
//             <img src={product.imageUrls[currentImg]} alt="Product" />
//             <div className="buttonsGroup">
//               <button onClick={prevImg} className="directionBtn">
//                 <GoChevronLeft size={18} />
//               </button>
//               <button onClick={nextImg} className="directionBtn">
//                 <GoChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="productDetails">
//           <div className="productBreadcrumb">
//             <Link to="/">Home</Link>  / 
//             <Link to="/shop">Shop</Link>
//           </div>

//           <h1>{product.name}</h1>

//           <div className="productRating">
//             {[...Array(5)].map((_, index) => (
//               <FaStar key={index} color="#FEC78A" size={10} />
//             ))}
//             <p>{product.productReviews || "No Reviews"}</p>
//           </div>

//           <h3>${product.price}</h3>

//           <p>{product.description}</p>

//           <div className="productCartQuantity">
//             <div className="productQuantity">
//               <button onClick={decrement}>-</button>
//               <input type="text" value={quantity} readOnly />
//               <button onClick={increment}>+</button>
//             </div>
//             <button onClick={handleAddToCart} className="productCartBtn">
//               Add to Cart
//             </button>
//           </div>

//           <div className="productWishShare">
//             <button onClick={() => setWishlisted(!wishlisted)} className="productWishList">
//               <FiHeart color={wishlisted ? "red" : ""} size={17} />
//               <p>Add to Wishlist</p>
//             </button>
//             <div className="productShare">
//               <PiShareNetworkLight size={22} />
//               <p>Share</p>
//             </div>
//           </div>

//           <div className="productTags">
//             <p><span>Categories:</span></p>
//             {categoryData.length > 0 ? (
//               <ul>
//                 {categoryData.map((entry, index) => (
//                   <li key={index}>
//                     {entry.categoryID} / {entry.subcategoryID}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";
// import { Link } from "react-router-dom";
// import { GoChevronLeft, GoChevronRight } from "react-icons/go";
// import { FaStar } from "react-icons/fa";
// import { FiHeart } from "react-icons/fi";
// import { PiShareNetworkLight } from "react-icons/pi";
// import toast from "react-hot-toast";
// import "./Product.css";

// const Product = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.items);

//   const [product, setProduct] = useState(null);
//   const [currentImg, setCurrentImg] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [categoryData, setCategoryData] = useState([]);
//   const [error, setError] = useState(null);

//   // Validate ObjectId format
//   const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

//   useEffect(() => {
//     if (!isValidObjectId(id)) {
//       setError("Invalid product ID");
//       toast.error("Invalid product ID", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       navigate("/shop"); // Redirect to shop if ID is invalid
//       return;
//     }

//     fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Product not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched product:", data); // Log product data
//         setProduct(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product");
//         toast.error("Product not found", {
//           duration: 2000,
//           style: { backgroundColor: "#ff4b4b", color: "white" },
//         });
//         navigate("/shop");
//       });
//   }, [id, navigate]);

//   useEffect(() => {
//     if (product) {
//       fetch("https://toyshop-sooty.vercel.app/api/categories")
//         .then((res) => res.json())
//         .then((categories) => {
//           const matches = [];

//           for (const category of categories) {
//             for (const subcategory of category.subcategories) {
//               if (subcategory.products.includes(product._id)) {
//                 matches.push({
//                   categoryID: category.categoryID,
//                   subcategoryID: subcategory.subcategoryID,
//                 });
//               }
//             }
//           }

//           setCategoryData(matches);
//         })
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [product]);

//   if (error) return <p>{error}</p>;
//   if (!product) return <p>Loading...</p>;

//   const prevImg = () => {
//     setCurrentImg((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
//   };

//   const nextImg = () => {
//     setCurrentImg((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
//   };

//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to add items to your cart", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       navigate("/loginSignUp");
//       return;
//     }

//     const productInCart = cartItems.find((item) => item.productID === product._id);
//     if (productInCart && productInCart.quantity + quantity > 20) {
//       toast.error("Product limit reached", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     } else {
//       dispatch(
//         addToCart({
//           productID: product._id,
//           frontImg: product.imageUrls[0],
//           productName: product.name,
//           productPrice: product.price,
//           quantity,
//           productReviews: product.productReviews || "No Reviews",
//         })
//       );
//       toast.success("Added to cart!", {
//         duration: 2000,
//         style: { backgroundColor: "#07bc0c", color: "white" },
//       });
//     }
//   };

//   return (
//     <div className="productSection">
//       <div className="productShowCase">
//         <div className="productGallery">
//           <div className="productThumb">
//             {product.imageUrls.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 onClick={() => setCurrentImg(index)}
//                 alt="Product Thumbnail"
//               />
//             ))}
//           </div>
//           <div className="productFullImg">
//             <img src={product.imageUrls[currentImg]} alt="Product" />
//             <div className="buttonsGroup">
//               <button onClick={prevImg} className="directionBtn">
//                 <GoChevronLeft size={18} />
//               </button>
//               <button onClick={nextImg} className="directionBtn">
//                 <GoChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="productDetails">
//           <div className="productBreadcrumb">
//             <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
//           </div>

//           <h1>{product.name}</h1>

//           <div className="productRating">
//             {[...Array(5)].map((_, index) => (
//               <FaStar key={index} color="#FEC78A" size={10} />
//             ))}
//             <p>{product.productReviews || "No Reviews"}</p>
//           </div>

//           <h3>${product.price}</h3>

//           <p>{product.description}</p>

//           <div className="productCartQuantity">
//             <div className="productQuantity">
//               <button onClick={decrement}>-</button>
//               <input type="text" value={quantity} readOnly />
//               <button onClick={increment}>+</button>
//             </div>
//             <button onClick={handleAddToCart} className="productCartBtn">
//               Add to Cart
//             </button>
//           </div>

//           <div className="productWishShare">
//             <button
//               onClick={() => setWishlisted(!wishlisted)}
//               className="productWishList"
//             >
//               <FiHeart color={wishlisted ? "red" : ""} size={17} />
//               <p>Add to Wishlist</p>
//             </button>
//             <div className="productShare">
//               <PiShareNetworkLight size={22} />
//               <p>Share</p>
//             </div>
//           </div>

//           <div className="productTags">
//             <p>
//               <span>Categories:</span>
//             </p>
//             {categoryData.length > 0 ? (
//               <ul>
//                 {categoryData.map((entry, index) => (
//                   <li key={index}>
//                     {entry.categoryID} / {entry.subcategoryID}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";
import toast from "react-hot-toast";
import AdditionalInfo from "../AdditonInfo/AdditionalInfo";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [error, setError] = useState(null);

  // Validate ObjectId format
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    console.log("Product ID from useParams:", id); // Debug product ID
    if (!isValidObjectId(id)) {
      setError("Invalid product ID");
      toast.error("Invalid product ID", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      navigate("/shop");
      return;
    }

    fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched product:", data); // Log product data
        setProduct(data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        toast.error("Product not found", {
          duration: 2000,
          style: { backgroundColor: "#ff4b4b", color: "white" },
        });
        navigate("/shop");
      });
  }, [id, navigate]);

  useEffect(() => {
    if (product) {
      fetch("https://toyshop-sooty.vercel.app/api/categories")
        .then((res) => res.json())
        .then((categories) => {
          const matches = [];

          for (const category of categories) {
            for (const subcategory of category.subcategories) {
              if (subcategory.products.includes(product._id)) {
                matches.push({
                  categoryID: category.categoryID,
                  subcategoryID: subcategory.subcategoryID,
                });
              }
            }
          }

          setCategoryData(matches);
        })
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [product]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const prevImg = () => {
    setCurrentImg((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
  };

  const nextImg = () => {
    setCurrentImg((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to your cart", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      navigate("/loginSignUp");
      return;
    }

    const productInCart = cartItems.find((item) => item.productID === product._id);
    if (productInCart && productInCart.quantity + quantity > 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
    } else {
      dispatch(
        addToCart({
          productID: product._id,
          frontImg: product.imageUrls[0],
          productName: product.name,
          productPrice: product.price,
          quantity,
          productReviews: product.productReviews || "No Reviews",
        })
      );
      toast.success("Added to cart!", {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
      });
    }
  };

  return (
    <div className="productSection">
      <div className="productShowCase">
        <div className="productGallery">
          <div className="productThumb">
            {product.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImg(index)}
                alt="Product Thumbnail"
              />
            ))}
          </div>
          <div className="productFullImg">
            <img src={product.imageUrls[currentImg]} alt="Product" />
            <div className="buttonsGroup">
              <button onClick={prevImg} className="directionBtn">
                <GoChevronLeft size={18} />
              </button>
              <button onClick={nextImg} className="directionBtn">
                <GoChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="productDetails">
          <div className="productBreadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
          </div>

          <h1>{product.name}</h1>

          <div className="productRating">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color="#FEC78A" size={10} />
            ))}
            <p>{product.productReviews || "No Reviews"}</p>
          </div>

          <h3>${product.price}</h3>

          <p>{product.description}</p>

          <div className="productCartQuantity">
            <div className="productQuantity">
              <button onClick={decrement}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increment}>+</button>
            </div>
            <button onClick={handleAddToCart} className="productCartBtn">
              Add to Cart
            </button>
          </div>

          <div className="productWishShare">
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="productWishList"
            >
              <FiHeart color={wishlisted ? "red" : ""} size={17} />
              <p>Add to Wishlist</p>
            </button>
            <div className="productShare">
              <PiShareNetworkLight size={22} />
              <p>Share</p>
            </div>
          </div>

          <div className="productTags">
            <p>
              <span>Categories:</span>
            </p>
            {categoryData.length > 0 ? (
              <ul>
                {categoryData.map((entry, index) => (
                  <li key={index}>
                    {entry.categoryID} / {entry.subcategoryID}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      {/* Render AdditionalInfo and pass the product ID */}
      <AdditionalInfo productId={id} />
    </div>
  );
};

export default Product;