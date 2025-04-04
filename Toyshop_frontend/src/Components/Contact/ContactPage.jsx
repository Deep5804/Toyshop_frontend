import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://toyshop-sooty.vercel.app/api/contact/", {
        name,
        emailId, // Matches the backend key
        message,
      });

      if (response.status === 201) {
        setSuccess("✅ Your message has been successfully sent. Please wait, our team will contact you very soon!");
        setName("");
        setEmailId("");
        setMessage("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contactSection">
        <h2>Contact Us</h2>

        {/* Map Section */}
        <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49206.16593395236!2d2.5776979486328124!3d39.57346430000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129793280de39c05%3A0x85d5f5ea839d6c2a!2sUOMO!5e0!3m2!1sen!2sin!4v1708798894132!5m2!1sen!2sin"
            width="800"
            height="600"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="uomomap"
          ></iframe>
        </div>

        {/* Contact Information */}
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Store in London</h3>
              <p>
                1418 River Drive, Suite 35 Cottonhall, CA 9622
                <br /> United Kingdom
              </p>
              <p>
                admin@dummymail.com
                <br />
                +44 20 7123 4567
              </p>
            </div>
            <div className="address">
              <h3>Store in India</h3>
              <p>
                A-791, Bandra Reclamation Rd, Mumbai
                <br /> Maharashtra
              </p>
              <p>
                contact@dummymail.com
                <br />
                +44 20 7123 4567
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contactForm">
            <h3>Get In Touch</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name *"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                value={emailId}
                placeholder="Email address *"
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
              <textarea
                rows={10}
                cols={40}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              {/* Success/Error Message Before Submit Button */}
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
