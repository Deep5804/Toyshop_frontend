import React, { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toyshop from "../../Assets/toyshop.png";
import { RiMenu2Line } from "react-icons/ri";
import { FiSearch, FiHeart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { SiXiaomi } from "react-icons/si";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  // Redux state for cart
  const cart = useSelector((state) => state.cart);
  
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu and control body overflow
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  // Scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if user is logged in by checking for token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");
  
  // Determine profile link based on login status
  const handleProfileClick = () => {
    return isLoggedIn ? "/account" : "/loginSignUp";
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={toyshop} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li><Link to="/" onClick={scrollToTop}>HOME</Link></li>
              <li><Link to="/shop" onClick={scrollToTop}>SHOP</Link></li>
              <li><Link to="/blog" onClick={scrollToTop}>BLOG</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>ABOUT</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>CONTACT</Link></li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          <Link to={handleProfileClick()} onClick={scrollToTop}>
            <FaRegUser size={22} />
          </Link>
          <Link to="/cart" onClick={scrollToTop}>
            <Badge badgeContent={cart?.items?.length || 0} color="primary">
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} onClick={scrollToTop} />
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={toyshop} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart" onClick={scrollToTop}>
            <Badge badgeContent={cart?.items?.length || 0} color="primary">
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <Link to="/shop" onClick={toggleMobileMenu}>
                  <FiSearch size={22} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li><Link to="/" onClick={toggleMobileMenu}>HOME</Link></li>
                <li><Link to="/shop" onClick={toggleMobileMenu}>SHOP</Link></li>
                <li><Link to="/blog" onClick={toggleMobileMenu}>BLOG</Link></li>
                <li><Link to="/about" onClick={toggleMobileMenu}>ABOUT</Link></li>
                <li><Link to="/contact" onClick={toggleMobileMenu}>CONTACT</Link></li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <Link to={handleProfileClick()} onClick={toggleMobileMenu}>
                <FaRegUser />
                <p>My Account</p>
              </Link>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <SiXiaomi />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;