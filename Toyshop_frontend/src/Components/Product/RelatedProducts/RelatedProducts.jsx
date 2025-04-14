



// import React, { useState, useEffect } from "react";
// import "./RelatedProducts.css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";

// import { Navigation } from "swiper/modules";

// import { FiHeart } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Link } from "react-router-dom";

// const RelatedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [wishList, setWishList] = useState({});

//   // Fetch related products from the API
//   useEffect(() => {
//     fetch("https://toyshop-sooty.vercel.app/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.slice(0, 8))) // Show only 8 products
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

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

//   return (
//     <div className="relatedProductSection">
//       <div className="relatedProducts">
//         <h2>
//           RELATED <span>PRODUCTS</span>
//         </h2>
//       </div>
//       <div className="relatedProductSlider">
//         <div className="swiper-button image-swiper-button-next">
//           <IoIosArrowForward />
//         </div>
//         <div className="swiper-button image-swiper-button-prev">
//           <IoIosArrowBack />
//         </div>
//         <Swiper
//           slidesPerView={4}
//           slidesPerGroup={4}
//           spaceBetween={30}
//           loop={true}
//           navigation={{
//             nextEl: ".image-swiper-button-next",
//             prevEl: ".image-swiper-button-prev",
//           }}
//           modules={[Navigation]}
//           breakpoints={{
//             320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
//             768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
//             1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
//           }}
//         >
//           {products.map((product) => (
//             <SwiperSlide key={product._id}>
//               <div className="rpContainer">
//                 <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                   <div className="rpImages">
//                     <img
//                       src={product.imageUrls[0]}
//                       alt={product.name}
//                       className="rpFrontImg"
//                     />
//                     <img
//                       src={product.imageUrls[1]}
//                       className="rpBackImg"
//                       alt={product.name}
//                     />
//                     <h4>Add to Cart</h4>
//                   </div>
//                 </Link>

//                 <div className="relatedProductInfo">
//                   <div className="rpCategoryWishlist">
//                     <p>{product.categoryID}</p>
//                     <FiHeart
//                       onClick={() => handleWishlistClick(product._id)}
//                       style={{
//                         color: wishList[product._id] ? "red" : "#767676",
//                         cursor: "pointer",
//                       }}
//                     />
//                   </div>
//                   <div className="productNameInfo">
//                     <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                       <h5>{product.name}</h5>
//                     </Link>
//                     <p>${product.price}</p>
//                     <div className="productRatingReviews">
//                       <div className="productRatingStar">
//                         {[...Array(5)].map((_, index) => (
//                           <FaStar key={index} color="#FEC78A" size={10} />
//                         ))}
//                       </div>
//                       <span>{product.productReviews || "No Reviews"}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;



// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { FiHeart } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Link, useParams } from "react-router-dom";
// import "./RelatedProducts.css";

// const RelatedProducts = () => {
//   const { id } = useParams(); // Get the current product ID
//   const [products, setProducts] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [wishList, setWishList] = useState({});
//   const [categoryID, setCategoryID] = useState(null);

//   // Fetch all products to find related ones
//   useEffect(() => {
//     fetch(`https://toyshop-sooty.vercel.app/api/products`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   // Fetch current product details to get categoryID
//   useEffect(() => {
//     if (!id) return;
    
//     fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCategoryID(data.categoryID); // Store the category ID of the clicked product
//       })
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   // Filter products to show only related ones
//   useEffect(() => {
//     if (!categoryID) return;

//     const filteredProducts = products.filter(
//       (product) => product.categoryID === categoryID && product._id !== id
//     );
//     setRelatedProducts(filteredProducts);
//   }, [categoryID, products, id]);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="relatedProductSection">
//       <div className="relatedProducts">
//         <h2>
//           RELATED <span>PRODUCTS</span>
//         </h2>
//       </div>

//       {relatedProducts.length === 0 ? (
//         <p style={{ textAlign: "center", fontSize: "18px", color: "#767676" }}>
//           No related products found.
//         </p>
//       ) : (
//         <div className="relatedProductSlider">
//           <div className="swiper-button image-swiper-button-next">
//             <IoIosArrowForward />
//           </div>
//           <div className="swiper-button image-swiper-button-prev">
//             <IoIosArrowBack />
//           </div>
//           <Swiper
//             slidesPerView={4}
//             slidesPerGroup={4}
//             spaceBetween={30}
//             loop={true}
//             navigation={{
//               nextEl: ".image-swiper-button-next",
//               prevEl: ".image-swiper-button-prev",
//             }}
//             modules={[Navigation]}
//             breakpoints={{
//               320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
//               768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
//               1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
//             }}
//           >
//             {relatedProducts.map((product) => (
//               <SwiperSlide key={product._id}>
//                 <div className="rpContainer">
//                   <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                     <div className="rpImages">
//                       <img
//                         src={product.imageUrls[0]}
//                         alt={product.name}
//                         className="rpFrontImg"
//                       />
//                       <img
//                         src={product.imageUrls[1]}
//                         className="rpBackImg"
//                         alt={product.name}
//                       />
//                       <h4>Add to Cart</h4>
//                     </div>
//                   </Link>

//                   <div className="relatedProductInfo">
//                     <div className="rpCategoryWishlist">
//                       <p>{product.categoryID}</p>
//                       <FiHeart
//                         onClick={() => handleWishlistClick(product._id)}
//                         style={{
//                           color: wishList[product._id] ? "red" : "#767676",
//                           cursor: "pointer",
//                         }}
//                       />
//                     </div>
//                     <div className="productNameInfo">
//                       <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                         <h5>{product.name}</h5>
//                       </Link>
//                       <p>${product.price}</p>
//                       <div className="productRatingReviews">
//                         <div className="productRatingStar">
//                           {[...Array(5)].map((_, index) => (
//                             <FaStar key={index} color="#FEC78A" size={10} />
//                           ))}
//                         </div>
//                         <span>{product.productReviews || "No Reviews"}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RelatedProducts;


// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { FiHeart } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Link } from "react-router-dom";
// import "./RelatedProducts.css";

// const RelatedProducts = ({ categoryIDs, productID }) => {
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [wishList, setWishList] = useState({});

//   // Fetch products and filter by categoryIDs
//   useEffect(() => {
//     if (!categoryIDs || categoryIDs.length === 0) return;

//     // Fetch all products (optimize later if API supports category filtering)
//     fetch(`https://toyshop-sooty.vercel.app/api/products`)
//       .then((res) => res.json())
//       .then((products) => {
//         // Fetch categories to map products to their categories
//         fetch(`https://toyshop-sooty.vercel.app/api/categories`)
//           .then((res) => res.json())
//           .then((categories) => {
//             // Create a set of product IDs that belong to the given categoryIDs
//             const relatedProductIDs = new Set();

//             for (const category of categories) {
//               if (categoryIDs.includes(category.categoryID)) {
//                 for (const subcategory of category.subcategories) {
//                   subcategory.products.forEach((prodID) => {
//                     if (prodID !== productID) {
//                       relatedProductIDs.add(prodID);
//                     }
//                   });
//                 }
//               }
//             }

//             // Filter products that match the related product IDs
//             const filteredProducts = products.filter((product) =>
//               relatedProductIDs.has(product._id)
//             );
//             setRelatedProducts(filteredProducts);
//           })
//           .catch((err) => console.error("Error fetching categories:", err));
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, [categoryIDs, productID]);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="relatedProductSection">
//       <div className="relatedProducts">
//         <h2>
//           RELATED <span>PRODUCTS</span>
//         </h2>
//       </div>

//       {relatedProducts.length === 0 ? (
//         <p style={{ textAlign: "center", fontSize: "18px", color: "#767676" }}>
//           No related products found.
//         </p>
//       ) : (
//         <div className="relatedProductSlider">
//           <div className="swiper-button image-swiper-button-next">
//             <IoIosArrowForward />
//           </div>
//           <div className="swiper-button image-swiper-button-prev">
//             <IoIosArrowBack />
//           </div>
//           <Swiper
//             slidesPerView={4}
//             slidesPerGroup={4}
//             spaceBetween={30}
//             loop={true}
//             navigation={{
//               nextEl: ".image-swiper-button-next",
//               prevEl: ".image-swiper-button-prev",
//             }}
//             modules={[Navigation]}
//             breakpoints={{
//               320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
//               768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
//               1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
//             }}
//           >
//             {relatedProducts.map((product) => (
//               <SwiperSlide key={product._id}>
//                 <div className="rpContainer">
//                   <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                     <div className="rpImages">
//                       <img
//                         src={product.imageUrls[0]}
//                         alt={product.name}
//                         className="rpFrontImg"
//                       />
//                       <img
//                         src={product.imageUrls[1]}
//                         className="rpBackImg"
//                         alt={product.name}
//                       />
//                       <h4>Add to Cart</h4>
//                     </div>
//                   </Link>

//                   <div className="relatedProductInfo">
//                     <div className="rpCategoryWishlist">
//                       <p>{product.categoryID}</p>
//                       <FiHeart
//                         onClick={() => handleWishlistClick(product._id)}
//                         style={{
//                           color: wishList[product._id] ? "red" : "#767676",
//                           cursor: "pointer",
//                         }}
//                       />
//                     </div>
//                     <div className="productNameInfo">
//                       <Link to={`/product/${product._id}`} onClick={scrollToTop}>
//                         <h5>{product.name}</h5>
//                       </Link>
//                       <p>${product.price}</p>
//                       <div className="productRatingReviews">
//                         <div className="productRatingStar">
//                           {[...Array(5)].map((_, index) => (
//                             <FaStar key={index} color="#FEC78A" size={10} />
//                           ))}
//                         </div>
//                         <span>{product.productReviews || "No Reviews"}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RelatedProducts;

import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const RelatedProducts = ({ categoryIDs, productID }) => {
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState({});

  useEffect(() => {
    if (!categoryIDs || categoryIDs.length === 0) return;

    fetch("https://toyshop-sooty.vercel.app/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        const relatedProductIDs = new Set();
        for (const category of categories) {
          if (categoryIDs.includes(category.categoryID)) {
            for (const subcategory of category.subcategories) {
              subcategory.products.forEach((prodID) => {
                if (prodID !== productID) {
                  relatedProductIDs.add(prodID);
                }
              });
            }
          }
        }

        fetch("https://toyshop-sooty.vercel.app/api/products")
          .then((res) => res.json())
          .then((data) => {
            const filteredProducts = data.filter((product) =>
              relatedProductIDs.has(product._id)
            );
            setProducts(filteredProducts); // No limit on products
          })
          .catch((err) => console.error("Error fetching products:", err));
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [categoryIDs, productID]);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relatedProductSection">
      <div className="relatedProducts">
        <h2>
          RELATED <span>PRODUCTS</span>
        </h2>
      </div>
      {products.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#767676" }}>
          No related products found.
        </p>
      ) : (
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4} // Restored to original UI
            slidesPerGroup={4}
            spaceBetween={30}
            loop={products.length > 4} // Loop if more than 4 products
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="rpContainer">
                  <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                    <div className="rpImages">
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="rpFrontImg"
                      />
                      <img
                        src={product.imageUrls[1]}
                        className="rpBackImg"
                        alt={product.name}
                      />
                      <h4>Add to Cart</h4>
                    </div>
                  </Link>

                  <div className="relatedProductInfo">
                    <div className="rpCategoryWishlist">
                      <p>{product.categoryID}</p>
                      <FiHeart
                        onClick={() => handleWishlistClick(product._id)}
                        style={{
                          color: wishList[product._id] ? "red" : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="productNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.name}</h5>
                      </Link>
                      <p>${product.price}</p>
                      <div className="productRatingReviews">
                        <div className="productRatingStar">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color="#FEC78A" size={10} />
                          ))}
                        </div>
                        <span>{product.productReviews || "No Reviews"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;