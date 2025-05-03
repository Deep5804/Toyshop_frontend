import React, { useState, useEffect } from "react";
import "./AdditionalInfo.css";
import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const AdditionalInfo = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const [images, setImages] = useState([]); // For user-uploaded images
  const [reviews, setReviews] = useState([]); // For fetched reviews
  const navigate = useNavigate();

  // Validate ObjectId format (24-character hex string)
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Fetch reviews when productId changes
  useEffect(() => {
    if (productId && isValidObjectId(productId)) {
      axios
        .get(`https://toyshop-sooty.vercel.app/api/reviews/product/${productId}`)
        .then((response) => {
          const approvedReviews = response.data.filter(
            (review) => review.status === "approved"
          );
          setReviews(approvedReviews);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          toast.error("Failed to load reviews", {
            duration: 2000,
            style: { backgroundColor: "#ff4b4b", color: "white" },
          });
        });
    }
  }, [productId]);

  // Handle file selection and compression
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxImages = 2;
    const maxSize = 5 * 1024 * 1024; // 5MB before compression

    if (files.length > maxImages) {
      toast.error(`You can upload up to ${maxImages} images`, {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }

    const validFiles = files.filter((file) => {
      if (!validImageTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid image (JPEG, PNG, GIF only)`, {
          duration: 2000,
          style: { backgroundColor: "#ff4b4b", color: "white" },
        });
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB limit`, {
          duration: 2000,
          style: { backgroundColor: "#ff4b4b", color: "white" },
        });
        return false;
      }
      return true;
    });

    try {
      const compressedFiles = await Promise.all(
        validFiles.map(async (file) => {
          const options = {
            maxSizeMB: 0.3, // Compress to ~0.3MB to stay under Vercel limit
            maxWidthOrHeight: 1280,
            useWebWorker: true,
          };
          return await imageCompression(file, options);
        })
      );

      setImages(compressedFiles); // Store compressed File objects
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Failed to process images", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Please login first", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      navigate("/loginSignUp");
      return;
    }

    console.log("Product ID in AdditionalInfo:", productId);

    // Validate IDs
    if (!isValidObjectId(productId)) {
      console.error("Invalid productId format:", productId);
      toast.error("Invalid product ID format", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }
    if (!isValidObjectId(userId)) {
      console.error("Invalid userId format:", userId);
      toast.error("Invalid user ID format", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }

    // Check if the user has already submitted a review for this product
    const userHasReviewed = reviews.some(
      (review) => review.userId._id === userId
    );
    if (userHasReviewed) {
      toast.error("You have already given a review for this product", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }

    // Validate form
    if (rating === 0) {
      toast.error("Please select a rating", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }
    if (!comment.trim()) {
      toast.error("Please provide a comment", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
      return;
    }

    console.log("Submitting review with:", {
      productId,
      userId,
      rating,
      comment,
      images: images.length,
    });

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("userId", userId);
    formData.append("rating", rating);
    formData.append("comment", comment);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "https://toyshop-sooty.vercel.app/api/reviews",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Review submitted successfully", {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
      });

      console.log("Submitted review with images:", response.data.review.images);

      setRating(0);
      setComment("");
      setSaveDetails(false);
      setImages([]);

      // Refresh reviews after submission
      axios
        .get(`https://toyshop-sooty.vercel.app/api/reviews/product/${productId}`)
        .then((response) => {
          const approvedReviews = response.data.filter(
            (review) => review.status === "approved"
          );
          setReviews(approvedReviews);
        })
        .catch((error) => {
          console.error("Error refreshing reviews:", error);
        });
    } catch (error) {
      console.error("Error submitting review:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit review";
      toast.error(errorMessage, {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
      });
    }
  };

  // Format date from createdAt
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="productAdditionalInfo">
      <div className="productAdditionalInfoContainer">
        <div className="productAdditionalInfoTabs">
          <div className="aiTabs">
            <p className="aiActive">Reviews ({reviews.length})</p>
          </div>
        </div>
        <div className="productAdditionalInfoContent">
          <div className="aiTabReview">
            <div className="aiTabReviewContainer">
              <h3>Reviews</h3>
              <div className="userReviews">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="userReview">
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>{review.userId.name}</h6>
                            <div className="userRating">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  color={
                                    index < review.rating ? "#FEC78A" : "#ccc"
                                  }
                                  size={10}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="userDate">
                            <p>{formatDate(review.createdAt)}</p>
                          </div>
                        </div>
                        <div className="userReviewBottomContent">
                          <p>{review.comment}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="reviewImages">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Review Image ${index + 1}`}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    margin: "5px",
                                    borderRadius: "5px",
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No approved reviews yet.</p>
                )}
              </div>
              <div className="userNewReview">
                <div className="userNewReviewMessage">
                  <h5>Write a review for this product</h5>
                  <p>
                    Your email address will not be published. Required fields are
                    marked *
                  </p>
                </div>
                <div className="userNewReviewRating">
                  <label htmlFor="rating">Your rating *</label>
                  <Rating
                    id="rating"
                    name="simple-controlled"
                    size="small"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue || 0)}
                    precision={1}
                  />
                </div>
                <div className="userNewReviewForm">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      cols={30}
                      rows={8}
                      placeholder="Your Review *"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      aria-label="Your Review"
                    />
                    <div className="userNewReviewImage">
                      <label htmlFor="images">
                        Upload Images (optional, max 2)
                      </label>
                      <input
                        type="file"
                        id="images"
                        accept="image/jpeg,image/png,image/gif"
                        multiple
                        onChange={handleImageChange}
                        aria-label="Upload Images"
                      />
                      {/* Display image previews */}
                      <div className="userNewReviewImagePreviews">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              margin: "5px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="userNewReviewFormCheck">
                      <label>
                        <input
                          type="checkbox"
                          checked={saveDetails}
                          onChange={(e) => setSaveDetails(e.target.checked)}
                          aria-label="Save my details"
                        />
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </div>
                    <button type="submit">Submit Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
// import React, { useState } from "react";
// import "./AdditionalInfo.css";
// import user1 from "../../../Assets/Users/user1.jpeg";
// import user2 from "../../../Assets/Users/user2.jpeg";
// import { FaStar } from "react-icons/fa";
// import Rating from "@mui/material/Rating";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import imageCompression from "browser-image-compression";

// const AdditionalInfo = ({ productId }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [saveDetails, setSaveDetails] = useState(false);
//   const [images, setImages] = useState([]); // Store File objects
//   const navigate = useNavigate();

//   // Validate ObjectId format (24-character hex string)
//   const isValidObjectId = (id) => {
//     return /^[0-9a-fA-F]{24}$/.test(id);
//   };

//   // Handle file selection and compression
//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//     const maxImages = 2;
//     const maxSize = 5 * 1024 * 1024; // 5MB before compression

//     if (files.length > maxImages) {
//       toast.error(`You can upload up to ${maxImages} images`, {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       return;
//     }

//     const validFiles = files.filter((file) => {
//       if (!validImageTypes.includes(file.type)) {
//         toast.error(`${file.name} is not a valid image (JPEG, PNG, GIF only)`, {
//           duration: 2000,
//           style: { backgroundColor: "#ff4b4b", color: "white" },
//         });
//         return false;
//       }
//       if (file.size > maxSize) {
//         toast.error(`${file.name} exceeds 5MB limit`, {
//           duration: 2000,
//           style: { backgroundColor: "#ff4b4b", color: "white" },
//         });
//         return false;
//       }
//       return true;
//     });

//     // Compress files
//     try {
//       const compressedFiles = await Promise.all(
//         validFiles.map(async (file) => {
//           const options = {
//             maxSizeMB: 0.3, // Compress to ~0.3MB to stay under Vercel limit
//             maxWidthOrHeight: 1280,
//             useWebWorker: true,
//           };
//           return await imageCompression(file, options);
//         })
//       );

//       setImages(compressedFiles); // Store compressed File objects
//     } catch (error) {
//       console.error("Error processing images:", error);
//       toast.error("Failed to process images", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if user is logged in
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       toast.error("Please login first", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       navigate("/loginSignUp");
//       return;
//     }

//     // Log productId for debugging
//     console.log("Product ID in AdditionalInfo:", productId);

//     // Validate IDs
//     if (!isValidObjectId(productId)) {
//       console.error("Invalid productId format:", productId);
//       toast.error("Invalid product ID format", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       return;
//     }
//     if (!isValidObjectId(userId)) {
//       console.error("Invalid userId format:", userId);
//       toast.error("Invalid user ID format", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       return;
//     }

//     // Validate form
//     if (rating === 0) {
//       toast.error("Please select a rating", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error("Please provide a comment", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//       return;
//     }

//     // Log submission data for debugging
//     console.log("Submitting review with:", {
//       productId,
//       userId,
//       rating,
//       comment,
//       images: images.length,
//     });

//     // Prepare form data
//     const formData = new FormData();
//     formData.append("productId", productId);
//     formData.append("userId", userId);
//     formData.append("rating", rating);
//     formData.append("comment", comment);
//     images.forEach((image) => {
//       formData.append("images", image); // Append each image file
//     });

//     try {
//       const response = await axios.post(
//         "https://toyshop-sooty.vercel.app/api/reviews",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Review submitted successfully", {
//         duration: 2000,
//         style: { backgroundColor: "#07bc0c", color: "white" },
//       });

//       // Log response for debugging
//       console.log("Submitted review with images:", response.data.review.images);

//       // Reset form
//       setRating(0);
//       setComment("");
//       setSaveDetails(false);
//       setImages([]);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to submit review";
//       toast.error(errorMessage, {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//       });
//     }
//   };

//   return (
//     <div className="productAdditionalInfo">
//       <div className="productAdditionalInfoContainer">
//         <div className="productAdditionalInfoTabs">
//           <div className="aiTabs">
//             <p className="aiActive">Reviews (2)</p>
//           </div>
//         </div>
//         <div className="productAdditionalInfoContent">
//           <div className="aiTabReview">
//             <div className="aiTabReviewContainer">
//               <h3>Reviews</h3>
//               <div className="userReviews">
//                 <div
//                   className="userReview"
//                   style={{ borderBottom: "1px solid #e4e4e4" }}
//                 >
//                   <div className="userReviewImg">
//                     <img src={user1} alt="Janice Miller" />
//                   </div>
//                   <div className="userReviewContent">
//                     <div className="userReviewTopContent">
//                       <div className="userNameRating">
//                         <h6>Janice Miller</h6>
//                         <div className="userRating">
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                         </div>
//                       </div>
//                       <div className="userDate">
//                         <p>April 06, 2023</p>
//                       </div>
//                     </div>
//                     <div
//                       className="userReviewBottomContent"
//                       style={{ marginBottom: "30px" }}
//                     >
//                       <p>
//                         Great product, very comfortable and well-made. Highly
//                         recommend!
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="userReview">
//                   <div className="userReviewImg">
//                     <img src={user2} alt="Benjam Porter" />
//                   </div>
//                   <div className="userReviewContent">
//                     <div className="userReviewTopContent">
//                       <div className="userNameRating">
//                         <h6>Benjam Porter</h6>
//                         <div className="userRating">
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                           <FaStar color="#FEC78A" size={10} />
//                         </div>
//                       </div>
//                       <div className="userDate">
//                         <p>April 12, 2023</p>
//                       </div>
//                     </div>
//                     <div className="userReviewBottomContent">
//                       <p>Excellent quality, fast shipping. Will buy again!</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="userNewReview">
//                 <div className="userNewReviewMessage">
//                   <h5>Write a review for this product</h5>
//                   <p>
//                     Your email address will not be published. Required fields are
//                     marked *
//                   </p>
//                 </div>
//                 <div className="userNewReviewRating">
//                   <label htmlFor="rating">Your rating *</label>
//                   <Rating
//                     id="rating"
//                     name="simple-controlled"
//                     size="small"
//                     value={rating}
//                     onChange={(event, newValue) => setRating(newValue || 0)}
//                     precision={1}
//                   />
//                 </div>
//                 <div className="userNewReviewForm">
//                   <form onSubmit={handleSubmit}>
//                     <textarea
//                       cols={30}
//                       rows={8}
//                       placeholder="Your Review *"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       required
//                       aria-label="Your Review"
//                     />
//                     <div className="userNewReviewImage">
//                       <label htmlFor="images">
//                         Upload Images (optional, max 2)
//                       </label>
//                       <input
//                         type="file"
//                         id="images"
//                         accept="image/jpeg,image/png,image/gif"
//                         multiple
//                         onChange={handleImageChange}
//                         aria-label="Upload Images"
//                       />
//                       {/* Display image previews */}
//                       <div className="userNewReviewImagePreviews">
//                         {images.map((image, index) => (
//                           <img
//                             key={index}
//                             src={URL.createObjectURL(image)}
//                             alt={`Preview ${index + 1}`}
//                             style={{
//                               width: "100px",
//                               height: "100px",
//                               objectFit: "cover",
//                               margin: "5px",
//                             }}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <div className="userNewReviewFormCheck">
//                       <label>
//                         <input
//                           type="checkbox"
//                           checked={saveDetails}
//                           onChange={(e) => setSaveDetails(e.target.checked)}
//                           aria-label="Save my details"
//                         />
//                         Save my name, email, and website in this browser for the
//                         next time I comment.
//                       </label>
//                     </div>
//                     <button type="submit">Submit Review</button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdditionalInfo;