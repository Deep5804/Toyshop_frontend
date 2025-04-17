

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "../../Assets/profilepic.jpg";
import "./AccountPage.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginSignUp");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://toyshop-sooty.vercel.app/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("Profile API Response:", data);
        if (!response.ok) throw new Error(data.error || "Failed to fetch profile");

        const userData = {
          id: data.id || "",
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          phone: data.phone || "",
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          pincode: data.pincode || "",
        };
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        localStorage.removeItem("token");
        navigate("/loginSignUp");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/loginSignUp");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({});
    setApiError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (formData.pincode && !/^\d{5,6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 5-6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const payload = { ...formData };
      delete payload.id;
      console.log("PUT Payload:", payload);

      const response = await fetch(`https://toyshop-sooty.vercel.app/api/users/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("PUT Response:", data);
      if (!response.ok) throw new Error(data.error || "Failed to update profile");

      const updatedUserData = {
        id: formData.id,
        name: data.updatedUser.name || "",
        email: data.updatedUser.email || "",
        address: data.updatedUser.address || "",
        phone: data.updatedUser.phone || "",
        firstname: data.updatedUser.firstname || "",
        lastname: data.updatedUser.lastname || "",
        city: data.updatedUser.city || "",
        state: data.updatedUser.state || "",
        country: data.updatedUser.country || "",
        pincode: data.updatedUser.pincode || "",
      };
      console.log("Updating UI with:", updatedUserData);
      setUser(updatedUserData);
      setFormData(updatedUserData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error.message);
      setApiError(error.message);
    }
  };

  if (!user) {
    return <p className="loading">Loading user data...</p>;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <img src={profilepic} alt="Profile" className="account-image" />
          <h2>My Account</h2>
        </div>

        {!isEditing ? (
          <div className="account-details">
            <div className="details-grid">
              <div className="detail-item full-width">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{user.name || "-"}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">First Name:</span>
                <span className="detail-value">{user.firstname || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">Last Name:</span>
                <span className="detail-value">{user.lastname || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">Pincode:</span>
                <span className="detail-value">{user.pincode || "-"}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{user.address || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">City:</span>
                <span className="detail-value">{user.city || "-"}</span>
              </div>
              <div className="detail-item half-width">
                <span className="detail-label">State:</span>
                <span className="detail-value">{user.state || "-"}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Country:</span>
                <span className="detail-value">{user.country || "-"}</span>
              </div>
            </div>
            <div className="account-actions">
              <button className="edit-button" onClick={handleEditToggle}>
                Edit Profile
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="edit-form">
            {apiError && <p className="error-message">{apiError}</p>}
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <span className="error">{errors.firstname}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <span className="error">{errors.lastname}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                {errors.pincode && <span className="error">{errors.pincode}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <span className="error">{errors.state}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && <span className="error">{errors.country}</span>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Save Changes
              </button>
              <button type="button" className="cancel-button" onClick={handleEditToggle}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountPage;