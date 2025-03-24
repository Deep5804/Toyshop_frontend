import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "../../Assets/profilepic.jpg";
import "./AccountPage.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginSignUp"); // Redirect to login if no token
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://toyshop-sooty.vercel.app/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch profile");
        setUser(data);
      } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/loginSignUp");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");  // Remove user data (if stored)
    navigate("/loginSignUp");         // Redirect to login page
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="userProfileSection">
      <div className="userProfileContainer">
        <img src={profilepic} alt="User Profile" className="userProfileImage" />
        <h2>Welcome, {user.name || "User"}!</h2>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;