

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";
import toast from "react-hot-toast";
import RelatedProducts from "../../../Components/Product/RelatedProducts/RelatedProducts"; // Import RelatedProducts
import "./Product.css";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const prevImg = () => {
    setCurrentImg((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
  };

  const nextImg = () => {
    setCurrentImg((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const productInCart = cartItems.find((item) => item._id === product._id);
    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", { duration: 2000, style: { backgroundColor: "#ff4b4b", color: "white" } });
    } else {
      dispatch(addToCart({ ...product, quantity }));
      toast.success("Added to cart!", { duration: 2000, style: { backgroundColor: "#07bc0c", color: "white" } });
    }
  };

  return (
    <div className="productSection">
      <div className="productShowCase">
        <div className="productGallery">
          <div className="productThumb">
            {product.imageUrls.map((img, index) => (
              <img key={index} src={img} onClick={() => setCurrentImg(index)} alt="Product Thumbnail" />
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
            <Link to="/">Home</Link> &nbsp;/&nbsp;
            <Link to="/shop">Shop</Link>
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
            <button onClick={() => setWishlisted(!wishlisted)} className="productWishList">
              <FiHeart color={wishlisted ? "red" : ""} size={17} />
              <p>Add to Wishlist</p>
            </button>
            <div className="productShare">
              <PiShareNetworkLight size={22} />
              <p>Share</p>
            </div>
          </div>

          <div className="productTags">
            <p><span>Category: </span>{product.categoryID}</p>
            <p><span>Tags: </span>{product.tags?.join(", ") || "No Tags"}</p>
          </div>
        </div>
      </div>

      {/* Pass categoryID to RelatedProducts */}
      <RelatedProducts categoryID={product.categoryID} />
    </div>
  );
};

export default Product;
