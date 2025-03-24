import React, { useState } from "react";
import "./Popup.css";
import popupImg from "../../Assets/newspopup.jpg";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("https://toyshop-sooty.vercel.app/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId: email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 Subscription successful!");
        setEmail(""); // Clear input field
      } else if (data.message === "You are already subscribed!") {
        setMessage("⚠️ You have already subscribed!");
      } else {
        setMessage("❌ Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong!. please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className={`popup-content ${fadeOut ? "fade-out" : ""}`}>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <div className="popup-left">
            <img src={popupImg} alt="Newsletter" />
          </div>
          <div className="popup-right">
            <h2>Sign Up to Our Newsletter</h2>
            <p>Be the first to discover the latest toy trends, exclusive deals, and exciting new arrivals!</p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Joining..." : "JOIN"}
              </button>
            </form>

            {message && <p className={`popup-message ${message.includes("⚠️") ? "warning" : ""}`}>{message}</p>}
          </div>
        </div>
      </div>
    )
  );
};
export default Popup;
