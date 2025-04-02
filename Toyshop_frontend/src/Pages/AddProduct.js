import { useState } from "react";
import axios from "axios";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryID: "",
    materialType: "",
    productType: [],
    images: [],
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/avif", "image/gif", "image/bmp", "image/tiff", "image/x-icon", "image/svg+xml"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productType") {
      setFormData({ ...formData, productType: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(file => !allowedFileTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError(`Invalid file type detected. Only JPG, PNG, JPEG, WebP, AVIF, GIF, BMP, TIFF, ICO, and SVG are allowed.`);
      return;
    }

    setError(null);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) => formDataObj.append("images", image));
        } else if (key === "productType") {
          formData.productType.forEach((type) => formDataObj.append("productType", type));
        } else {
          formDataObj.append(key, formData[key]);
        }
      });

      console.log("Submitting form data:", formData);
      
      const response = await axios.post(
        "https://toyshop-sooty.vercel.app/api/products",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response from API:", response.data);
      setSuccessMessage("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryID: "",
        materialType: "",
        productType: [],
        images: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <input type="text" name="categoryID" placeholder="Category ID" value={formData.categoryID} onChange={handleChange} required />
        <input type="text" name="materialType" placeholder="Material Type" value={formData.materialType} onChange={handleChange} required />
        <input type="text" name="productType" placeholder="Product Types (comma-separated)" value={formData.productType.join(",")} onChange={handleChange} required />
        <input type="file" multiple accept="image/jpeg, image/png, image/jpg, image/webp, image/avif, image/gif, image/bmp, image/tiff, image/x-icon, image/svg+xml" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
