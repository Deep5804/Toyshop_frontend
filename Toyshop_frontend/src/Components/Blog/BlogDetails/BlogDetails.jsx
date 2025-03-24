import React from "react";

import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/blogDetail1.jpg";
import blogimage1 from "../../../Assets/Blog/blogDetail2.jpg";
import blogimage2 from "../../../Assets/Blog/blogDetail3.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="blogDetailsSection">
        <div className="blogDetailsSectionContainer">
          <div className="blogDetailsHeading">
            <h2>Educational Toys Buying Guide</h2>
            <div className="blogDetailsMetaData">
              <span>by admin</span>
              <span>May 19, 2023</span>
              <span>Trends</span>
            </div>
          </div>
          <div className="blogDetailsFeaturedImg">
            <img src={blogdetail1} alt="" />
          </div>
          <div className="blogDetailsContent">
            <p>
            Choosing the right educational toys for children can be overwhelming, given the countless options available in the market. At ToyShop, parents and educators can find a diverse range of learning toys designed to foster creativity, problem-solving skills, and cognitive development. This guide for buying educational toys will help you make informed choices based on your child's age, interests, and developmental needs.
            </p>
           
            <div className="blogDetailsContentBullets">
              <div className="blogDetailsContentBulletscontent">
                <h5>Why Educational Toys Matter?</h5>
                <p>
                  <ul>
                    <li>Cognitive skills: Enhancing memory, problem-solving, and logical thinking.</li>
                    <li>
                    Motor skills: Improving hand-eye coordination and fine motor abilities.
                    </li>
                    <li>Creativity & imagination: encouraging storytelling and artistic expression.</li>
                    <li>Social skills: teaching teamwork, communication, and emotional intelligence. </li>
                  </ul>
                </p>
              </div>
              <div className="blogDetailsContentBulletscontent">
                <h5>Factors to Consider When Buying Educational Toys</h5>
                <p>
                  <ol>
                    <li>Age-Appropriate Selection</li>
                    <li>
                    Safety Standards
                    </li>
                    <li> Learning Objectives</li>
                    <li> Engagement & Fun Factor</li>
                  </ol>
                </p>
              </div>
            </div>
            <p>
            Educational toys are essential tools for a child’s cognitive and motor skill development. By selecting age-appropriate, safe, and engaging options, you can ensure your child enjoys learning through play. Explore ToyShop collection of high-quality educational toys to find the perfect fit for your little learner.
            </p>
          </div>
          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="" />
            <img src={blogimage2} alt="" />
          </div>
          <div className="blogDetailsContent">
          <h4>Best Types of Educational Toys Available at ToyShop</h4>
          <h5>Building & Construction Toys</h5>
                <p>
                  <ul>
                    <li>LEGO sets</li>
                    <li>
                    Magnetic tiles
                    </li>
                    <li>Wooden building blocks</li>
                
                  </ul>
                </p>
                <h5>STEM & Robotics Kits</h5>
                <p>
                  <ul>
                    <li>Coding robots</li>
                    <li>
                    DIY science experiment kits
                    </li>
                    <li>Circuit-building games</li>
                
                  </ul>
                </p>
                <h5>Board Games & Puzzles</h5>
                <p>
                  <ul>
                    <li>Chess and strategy games</li>
                    <li>
                    Jigsaw puzzles
                    </li>
                    <li>Memory and matching games</li>
                
                  </ul>
                </p>
         
          </div>
          <div className="share-buttons">
            <button className="share-button facebook">
              <FaFacebookF /> Share on Facebook
            </button>
            <button className="share-button twitter">
              <FaXTwitter />
              Share on Twitter
            </button>
            <button className="share-button pinterest">
              <FaPinterest /> Share on Pinterest
            </button>
            <button className="share-button more">
              <FaPlus size={20} />
            </button>
          </div>
          <div className="blogDetailsNextPrev">
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon"
                onClick={scrollToTop}
              >
                <GoChevronLeft size={20} />
                <p>PREVIOUS POST</p>
              </div>
              <p>Given Set was without from god divide rule Hath</p>
            </div>
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon2"
                onClick={scrollToTop}
              >
                <p>NEXT POST</p>
                <GoChevronRight size={20} />
              </div>
              <p style={{ textAlign: "right" }}>
                Tree earth fowl given moveth deep lesser after
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
