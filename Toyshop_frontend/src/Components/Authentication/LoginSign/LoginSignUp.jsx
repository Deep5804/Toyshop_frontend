// // LoginSignUp.jsx
// import React, { useState } from "react";
// import "./LoginSignUp.css";
// import { Link, useNavigate } from "react-router-dom";

// const LoginSignUp = () => {
//   const [activeTab, setActiveTab] = useState("tabButton1");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleTab = (tab) => {
//     setActiveTab(tab);
//     setError("");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await fetch("https://toyshop-sooty.vercel.app/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Signup failed");

//       alert("Registration Successful! Please Login.");
//       setActiveTab("tabButton1");
//     } catch (error) {
//       console.error("Signup Error:", error.message);
//       setError(error.message);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await fetch("https://toyshop-sooty.vercel.app/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email, password: formData.password }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Login failed");

//       // Store token and user data in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       alert(data.message);
//       navigate("/account"); // Redirect to profile page
//     } catch (error) {
//       console.error("Login Error:", error.message);
//       setError(error.message);
//     }
//   };

  

//   return (
//     <div className="loginSignUpSection">
//       <div className="loginSignUpContainer">
//         <div className="loginSignUpTabs">
//           <p
//             onClick={() => handleTab("tabButton1")}
//             className={activeTab === "tabButton1" ? "active" : ""}
//           >
//             Login
//           </p>
//           <p
//             onClick={() => handleTab("tabButton2")}
//             className={activeTab === "tabButton2" ? "active" : ""}
//           >
//             Register
//           </p>
//         </div>

//         <div className="loginSignUpTabsContent">
//           {/* Login Form */}
//           {activeTab === "tabButton1" && (
//             <div className="loginSignUpTabsContentLogin">
//               <form onSubmit={handleLogin}>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email address *"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password *"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <div className="loginSignUpForgetPass">
//                   <label>
//                     <input type="checkbox" className="brandRadio" />
//                     <p>Remember me</p>
//                   </label>
//                   <p>
//                     <Link to="/resetPassword">Lost password?</Link>
//                   </p>
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Log In</button>
//               </form>
//               <div className="loginSignUpTabsContentLoginText">
//                 <p>
//                   No account yet?{" "}
//                   <span onClick={() => handleTab("tabButton2")}>
//                     Create Account
//                   </span>
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Signup Form */}
//           {activeTab === "tabButton2" && (
//             <div className="loginSignUpTabsContentRegister">
//               <form onSubmit={handleSignup}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Username *"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email address *"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password *"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address *"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Mobile Number *"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//                 <p>
//                   Your personal data will be used to support your experience
//                   throughout this website, to manage access to your account, and
//                   for other purposes described in our
//                   <Link
//                     to="/terms"
//                     style={{ textDecoration: "none", color: "#c32929" }}
//                   >
//                     {" "}
//                     privacy policy
//                   </Link>
//                   .
//                 </p>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Register</button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignUp;
import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://toyshop-sooty.vercel.app/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");

      toast.success("Registration Successful! Please Login.", {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
      });
      setActiveTab("tabButton1");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://toyshop-sooty.vercel.app/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      // Store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show toast with "Hi, Username!" message
      toast.success(`Hi, ${data.user.name}!`, {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
      });
      navigate("/account"); // Redirect to profile page
    } catch (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            onClick={() => handleTab("tabButton1")}
            className={activeTab === "tabButton1" ? "active" : ""}
          >
            Login
          </p>
          <p
            onClick={() => handleTab("tabButton2")}
            className={activeTab === "tabButton2" ? "active" : ""}
          >
            Register
          </p>
        </div>

        <div className="loginSignUpTabsContent">
          {/* Login Form */}
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Remember me</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Lost password?</Link>
                  </p>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Log In</button>
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  No account yet?{" "}
                  <span onClick={() => handleTab("tabButton2")}>
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Signup Form */}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Username *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our
                  <Link
                    to="/terms"
                    style={{ textDecoration: "none", color: "#c32929" }}
                  >
                    {" "}
                    privacy policy
                  </Link>
                  .
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Register</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;