// // // import React, { useState } from "react";
// // // import "./Filter.css";

// // // import Accordion from "@mui/material/Accordion";
// // // import AccordionSummary from "@mui/material/AccordionSummary";
// // // import AccordionDetails from "@mui/material/AccordionDetails";
// // // import { IoIosArrowDown } from "react-icons/io";
// // // import { BiSearch } from "react-icons/bi";
// // // import Slider from "@mui/material/Slider";

// // // const Filter = () => {
// // //   const [value, setValue] = useState([20, 69]);

// // //   const [selectedColors, setSelectedColors] = useState([]);
// // //   const [selectedSizes, setSelectedSizes] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [brandsData] = useState([
// // //     { name: "KinderKraft", count: 2 },
// // //     { name: "Lego", count: 7 },
// // //     { name: "Open Ended", count: 10 },
// // //     { name: "Mangna Tiles", count: 39 },
// // //     { name: "Jarmelo", count: 95 },
// // //     { name: "Step2", count: 1092 },
// // //     { name: "Doodle Hog", count: 48 },
// // //     { name: "Barbie", count: 25 },
// // //     { name: "Air Fix", count: 75 },
// // //   ]);

// // //   const handleColorChange = (color) => {
// // //     setSelectedColors((prevColors) =>
// // //       prevColors.includes(color)
// // //         ? prevColors.filter((c) => c !== color)
// // //         : [...prevColors, color]
// // //     );
// // //   };

// // //   const handleSizeChange = (size) => {
// // //     setSelectedSizes((prevSizes) =>
// // //       prevSizes.includes(size)
// // //         ? prevSizes.filter((s) => s !== size)
// // //         : [...prevSizes, size]
// // //     );
// // //   };

// // //   const handleChange = (event, newValue) => {
// // //     setValue(newValue);
// // //   };

// // //   const filteredBrands = brandsData.filter((brand) =>
// // //     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const filterCategories = [
// // //     "All Toys",
// // //     "Educational Toys",
// // //     "Puzzles",
// // //     "Constructional Toys",
// // //     "Funplay Toys",
// // //     "Pretend Play",
// // //     "Open Ended Toys",
// // //     "Rainbow Stackers",
// // //     "Mangnetiles",
// // //     "Keychains",
// // //     "School Supplies",
// // //     "Warehouse clearance",
// // //     "Vehicles",
// // //     "Active Plays",
// // //     "Wooden Toys",
// // //     "Metal Toys",
// // //     "Soft Toys",
// // //     "Dolls",
// // //     "Action Figures",
// // //     "Outdoors Play",
// // //     "Novelty Toys"

// // //   ];

  

// // //   const filterSizes = ["0 To 2", "2 To 5", "5 To 10", "10 To 15", "15+",];

// // //   return (
// // //     <div>
// // //       <div className="filterSection">
// // //         <div className="filterCategories">
// // //           <Accordion defaultExpanded disableGutters elevation={0}>
// // //             <AccordionSummary
// // //               expandIcon={<IoIosArrowDown size={20} />}
// // //               aria-controls="panel1-content"
// // //               id="panel1-header"
// // //               sx={{ padding: 0, marginBottom: 2 }}
// // //             >
// // //               <h5 className="filterHeading">Product Categories</h5>
// // //             </AccordionSummary>
// // //             <AccordionDetails sx={{ padding: 0 }}>
// // //               {filterCategories.map((category, index) => (
// // //                 <p key={index}>{category}</p>
// // //               ))}
// // //             </AccordionDetails>
// // //           </Accordion>
// // //         </div>
        
// // //         <div className="filterSizes">
// // //           <Accordion defaultExpanded disableGutters elevation={0}>
// // //             <AccordionSummary
// // //               expandIcon={<IoIosArrowDown size={20} />}
// // //               aria-controls="panel1-content"
// // //               id="panel1-header"
// // //               sx={{ padding: 0, marginBottom: 2 }}
// // //             >
// // //               <h5 className="filterHeading">Agewise</h5>
// // //             </AccordionSummary>
// // //             <AccordionDetails sx={{ padding: 0 }}>
// // //               <div className="sizeButtons">
// // //                 {filterSizes.map((size, index) => (
// // //                   <button
// // //                     key={index}
// // //                     className={`sizeButton ${
// // //                       selectedSizes.includes(size) ? "selected" : ""
// // //                     }`}
// // //                     onClick={() => handleSizeChange(size)}
// // //                   >
// // //                     {size}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </AccordionDetails>
// // //           </Accordion>
// // //         </div>
// // //         <div className="filterBrands">
// // //           <Accordion defaultExpanded disableGutters elevation={0}>
// // //             <AccordionSummary
// // //               expandIcon={<IoIosArrowDown size={20} />}
// // //               aria-controls="panel1-content"
// // //               id="panel1-header"
// // //               sx={{ padding: 0, marginBottom: 2 }}
// // //             >
// // //               <h5 className="filterHeading">Brands</h5>
// // //             </AccordionSummary>
// // //             <AccordionDetails sx={{ padding: 0 }}>
// // //               {/* Search bar */}
// // //               <div className="searchBar">
// // //                 <BiSearch className="searchIcon" size={20} color={"#767676"} />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search"
// // //                   value={searchTerm}
// // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // //                 />
// // //               </div>

// // //               {/* Brand list */}
// // //               <div className="brandList">
// // //                 {filteredBrands.length > 0 ? (
// // //                   filteredBrands.map((brand, index) => (
// // //                     <div className="brandItem" key={index}>
// // //                       {/* Radio button */}
// // //                       <input
// // //                         type="checkbox"
// // //                         name="brand"
// // //                         id={`brand-${index}`}
// // //                         className="brandRadio"
// // //                       />
// // //                       {/* Brand name */}
// // //                       <label htmlFor={`brand-${index}`} className="brandLabel">
// // //                         {brand.name}
// // //                       </label>
// // //                       {/* Brand count */}
// // //                       <span className="brandCount">{brand.count}</span>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <div className="notFoundMessage">Not found</div>
// // //                 )}
// // //               </div>
// // //             </AccordionDetails>
// // //           </Accordion>
// // //         </div>
// // //         <div className="filterPrice">
// // //           <Accordion defaultExpanded disableGutters elevation={0}>
// // //             <AccordionSummary
// // //               expandIcon={<IoIosArrowDown size={20} />}
// // //               aria-controls="panel1-content"
// // //               id="panel1-header"
// // //               sx={{ padding: 0, marginBottom: 2 }}
// // //             >
// // //               <h5 className="filterHeading">Price</h5>
// // //             </AccordionSummary>
// // //             <AccordionDetails sx={{ padding: 0 }}>
// // //               <Slider
// // //                 getAriaLabel={() => "Temperature range"}
// // //                 value={value}
// // //                 onChange={handleChange}
// // //                 valueLabelDisplay="auto"
// // //                 valueLabelFormat={(value) => `$${value}`}
// // //                 sx={{
// // //                   color: "black",
// // //                   "& .MuiSlider-thumb": {
// // //                     backgroundColor: "white",
// // //                     border: "2px solid black",
// // //                     width: 18,
// // //                     height: 18,
// // //                   },
// // //                 }}
// // //               />

// // //               <div className="filterSliderPrice">
// // //                 <div className="priceRange">
// // //                   <p>
// // //                     Min Price: <span>${value[0]}</span>
// // //                   </p>
// // //                   <p>
// // //                     Max Price: <span>${value[1]}</span>
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </AccordionDetails>
// // //           </Accordion>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Filter;

// // import React, { useState, useEffect } from "react";
// // import "./Filter.css";
// // import Accordion from "@mui/material/Accordion";
// // import AccordionSummary from "@mui/material/AccordionSummary";
// // import AccordionDetails from "@mui/material/AccordionDetails";
// // import { IoIosArrowDown } from "react-icons/io";
// // import { BiSearch } from "react-icons/bi";
// // import Slider from "@mui/material/Slider";
// // import axios from "axios";

// // const Filter = ({ onFilterChange }) => {
// //   const [priceRange, setPriceRange] = useState([0, 1000]);
// //   const [categories, setCategories] = useState([]);
// //   const [materialTypes, setMaterialTypes] = useState([]);
// //   const [productTypes, setProductTypes] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
// //   const [expandedCategory, setExpandedCategory] = useState(null);
// //   const [selectedMaterialTypes, setSelectedMaterialTypes] = useState([]);
// //   const [selectedProductTypes, setSelectedProductTypes] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [brandsData] = useState([
// //     { name: "KinderKraft", count: 2 },
// //     { name: "Lego", count: 7 },
// //     { name: "Open Ended", count: 10 },
// //     { name: "Mangna Tiles", count: 39 },
// //     { name: "Jarmelo", count: 95 },
// //     { name: "Step2", count: 1092 },
// //     { name: "Doodle Hog", count: 48 },
// //     { name: "Barbie", count: 25 },
// //     { name: "Air Fix", count: 75 },
// //   ]);

// //   useEffect(() => {
// //     // Fetch categories
// //     axios
// //       .get("https://toyshop-sooty.vercel.app/api/categories")
// //       .then((response) => {
// //         setCategories(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching categories:", error);
// //       });

// //     // Fetch products for materialType, productType, and price range
// //     axios
// //       .get("https://toyshop-sooty.vercel.app/api/products")
// //       .then((response) => {
// //         const products = response.data;
// //         // Extract unique materialTypes
// //         const uniqueMaterialTypes = [
// //           ...new Set(products.map((p) => p.materialType).filter(Boolean)),
// //         ];
// //         setMaterialTypes(uniqueMaterialTypes);
// //         // Extract unique productTypes
// //         const uniqueProductTypes = [
// //           ...new Set(products.map((p) => p.productType).filter(Boolean)),
// //         ];
// //         setProductTypes(uniqueProductTypes);
// //         // Set dynamic price range
// //         const prices = products.map((p) => p.price).filter((p) => p != null);
// //         const minPrice = Math.floor(Math.min(...prices)) || 0;
// //         const maxPrice = Math.ceil(Math.max(...prices)) || 1000;
// //         setPriceRange([minPrice, maxPrice]);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching products:", error);
// //       });
// //   }, []);

// //   const handleMaterialTypeChange = (material) => {
// //     setSelectedMaterialTypes((prev) =>
// //       prev.includes(material)
// //         ? prev.filter((m) => m !== material)
// //         : [...prev, material]
// //     );
// //     onFilterChange({
// //       categoryID: selectedCategory,
// //       subcategoryID: selectedSubcategory,
// //       minPrice: priceRange[0],
// //       maxPrice: priceRange[1],
// //       materialTypes: selectedMaterialTypes.includes(material)
// //         ? selectedMaterialTypes.filter((m) => m !== material)
// //         : [...selectedMaterialTypes, material],
// //       productTypes: selectedProductTypes,
// //     });
// //   };

// //   const handleProductTypeChange = (product) => {
// //     setSelectedProductTypes((prev) =>
// //       prev.includes(product)
// //         ? prev.filter((p) => p !== product)
// //         : [...prev, product]
// //     );
// //     onFilterChange({
// //       categoryID: selectedCategory,
// //       subcategoryID: selectedSubcategory,
// //       minPrice: priceRange[0],
// //       maxPrice: priceRange[1],
// //       materialTypes: selectedMaterialTypes,
// //       productTypes: selectedProductTypes.includes(product)
// //         ? selectedProductTypes.filter((p) => p !== product)
// //         : [...selectedProductTypes, product],
// //     });
// //   };

// //   const handlePriceChange = (event, newValue) => {
// //     setPriceRange(newValue);
// //     onFilterChange({
// //       categoryID: selectedCategory,
// //       subcategoryID: selectedSubcategory,
// //       minPrice: newValue[0],
// //       maxPrice: newValue[1],
// //       materialTypes: selectedMaterialTypes,
// //       productTypes: selectedProductTypes,
// //     });
// //   };

// //   const handleCategoryClick = (categoryID) => {
// //     if (expandedCategory === categoryID) {
// //       setSelectedCategory(categoryID);
// //       setSelectedSubcategory(null);
// //       setExpandedCategory(null);
// //       onFilterChange({
// //         categoryID,
// //         subcategoryID: null,
// //         minPrice: priceRange[0],
// //         maxPrice: priceRange[1],
// //         materialTypes: selectedMaterialTypes,
// //         productTypes: selectedProductTypes,
// //       });
// //     } else {
// //       setExpandedCategory(categoryID);
// //       setSelectedCategory(null);
// //       setSelectedSubcategory(null);
// //     }
// //   };

// //   const handleSubcategoryClick = (categoryID, subcategoryID) => {
// //     setSelectedCategory(categoryID);
// //     setSelectedSubcategory(subcategoryID);
// //     setExpandedCategory(null);
// //     onFilterChange({
// //       categoryID,
// //       subcategoryID,
// //       minPrice: priceRange[0],
// //       maxPrice: priceRange[1],
// //       materialTypes: selectedMaterialTypes,
// //       productTypes: selectedProductTypes,
// //     });
// //   };

// //   const handleAllToysClick = () => {
// //     setSelectedCategory(null);
// //     setSelectedSubcategory(null);
// //     setExpandedCategory(null);
// //     onFilterChange({
// //       categoryID: null,
// //       subcategoryID: null,
// //       minPrice: priceRange[0],
// //       maxPrice: priceRange[1],
// //       materialTypes: selectedMaterialTypes,
// //       productTypes: selectedProductTypes,
// //     });
// //   };

// //   const filteredBrands = brandsData.filter((brand) =>
// //     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div>
// //       <div className="filterSection">
// //         <div className="filterCategories">
// //           <Accordion defaultExpanded disableGutters elevation={0}>
// //             <AccordionSummary
// //               expandIcon={<IoIosArrowDown size={20} />}
// //               aria-controls="panel1-content"
// //               id="panel1-header"
// //               sx={{ padding: 0, marginBottom: 2 }}
// //             >
// //               <h5 className="filterHeading">Product Categories</h5>
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ padding: 0 }}>
// //               <p
// //                 onClick={handleAllToysClick}
// //                 style={{ cursor: "pointer", padding: "8px 0" }}
// //                 className={selectedCategory === null ? "selected" : ""}
// //               >
// //                 All Toys
// //               </p>
// //               {categories.map((category) => (
// //                 <div key={category._id}>
// //                   <p
// //                     onClick={() => handleCategoryClick(category.categoryID)}
// //                     style={{ cursor: "pointer", padding: "8px 0" }}
// //                     className={
// //                       selectedCategory === category.categoryID ? "selected" : ""
// //                     }
// //                   >
// //                     {category.categoryName}
// //                   </p>
// //                   {expandedCategory === category.categoryID && (
// //                     <div style={{ paddingLeft: "16px" }}>
// //                       {category.subcategories.map((subcategory) => (
// //                         <p
// //                           key={subcategory._id}
// //                           onClick={() =>
// //                             handleSubcategoryClick(
// //                               category.categoryID,
// //                               subcategory.subcategoryID
// //                             )
// //                           }
// //                           style={{ cursor: "pointer", padding: "4px 0" }}
// //                           className={
// //                             selectedSubcategory === subcategory.subcategoryID
// //                               ? "selected"
// //                               : ""
// //                           }
// //                         >
// //                           {subcategory.subcategoryName}
// //                         </p>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </AccordionDetails>
// //           </Accordion>
// //         </div>

// //         <div className="filterMaterialTypes">
// //           <Accordion defaultExpanded disableGutters elevation={0}>
// //             <AccordionSummary
// //               expandIcon={<IoIosArrowDown size={20} />}
// //               aria-controls="panel2-content"
// //               id="panel2-header"
// //               sx={{ padding: 0, marginBottom: 2 }}
// //             >
// //               <h5 className="filterHeading">Material Type</h5>
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ padding: 0 }}>
// //               <div className="materialTypeList">
// //                 {materialTypes.length > 0 ? (
// //                   materialTypes.map((material, index) => (
// //                     <div className="materialTypeItem" key={index}>
// //                       <input
// //                         type="checkbox"
// //                         name="materialType"
// //                         id={`material-${index}`}
// //                         className="materialTypeCheckbox"
// //                         checked={selectedMaterialTypes.includes(material)}
// //                         onChange={() => handleMaterialTypeChange(material)}
// //                       />
// //                       <label
// //                         htmlFor={`material-${index}`}
// //                         className="materialTypeLabel"
// //                       >
// //                         {material}
// //                       </label>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="notFoundMessage">No materials found</div>
// //                 )}
// //               </div>
// //             </AccordionDetails>
// //           </Accordion>
// //         </div>

// //         <div className="filterProductTypes">
// //           <Accordion defaultExpanded disableGutters elevation={0}>
// //             <AccordionSummary
// //               expandIcon={<IoIosArrowDown size={20} />}
// //               aria-controls="panel3-content"
// //               id="panel3-header"
// //               sx={{ padding: 0, marginBottom: 2 }}
// //             >
// //               <h5 className="filterHeading">Product Type</h5>
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ padding: 0 }}>
// //               <div className="productTypeList">
// //                 {productTypes.length > 0 ? (
// //                   productTypes.map((product, index) => (
// //                     <div className="productTypeItem" key={index}>
// //                       <input
// //                         type="checkbox"
// //                         name="productType"
// //                         id={`product-${index}`}
// //                         className="productTypeCheckbox"
// //                         checked={selectedProductTypes.includes(product)}
// //                         onChange={() => handleProductTypeChange(product)}
// //                       />
// //                       <label
// //                         htmlFor={`product-${index}`}
// //                         className="productTypeLabel"
// //                       >
// //                         {product}
// //                       </label>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="notFoundMessage">No product types found</div>
// //                 )}
// //               </div>
// //             </AccordionDetails>
// //           </Accordion>
// //         </div>

// //         <div className="filterBrands">
// //           <Accordion defaultExpanded disableGutters elevation={0}>
// //             <AccordionSummary
// //               expandIcon={<IoIosArrowDown size={20} />}
// //               aria-controls="panel4-content"
// //               id="panel4-header"
// //               sx={{ padding: 0, marginBottom: 2 }}
// //             >
// //               <h5 className="filterHeading">Brands</h5>
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ padding: 0 }}>
// //               <div className="searchBar">
// //                 <BiSearch className="searchIcon" size={20} color={"#767676"} />
// //                 <input
// //                   type="text"
// //                   placeholder="Search"
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //               </div>
// //               <div className="brandList">
// //                 {filteredBrands.length > 0 ? (
// //                   filteredBrands.map((brand, index) => (
// //                     <div className="brandItem" key={index}>
// //                       <input
// //                         type="checkbox"
// //                         name="brand"
// //                         id={`brand-${index}`}
// //                         className="brandRadio"
// //                       />
// //                       <label htmlFor={`brand-${index}`} className="brandLabel">
// //                         {brand.name}
// //                       </label>
// //                       <span className="brandCount">{brand.count}</span>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="notFoundMessage">Not found</div>
// //                 )}
// //               </div>
// //             </AccordionDetails>
// //           </Accordion>
// //         </div>

// //         <div className="filterPrice">
// //           <Accordion defaultExpanded disableGutters elevation={0}>
// //             <AccordionSummary
// //               expandIcon={<IoIosArrowDown size={20} />}
// //               aria-controls="panel5-content"
// //               id="panel5-header"
// //               sx={{ padding: 0, marginBottom: 2 }}
// //             >
// //               <h5 className="filterHeading">Price</h5>
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ padding: 0 }}>
// //               <Slider
// //                 getAriaLabel={() => "Price range"}
// //                 value={priceRange}
// //                 onChange={handlePriceChange}
// //                 valueLabelDisplay="auto"
// //                 valueLabelFormat={(value) => `$${value}`}
// //                 min={Math.floor(priceRange[0])}
// //                 max={Math.ceil(priceRange[1])}
// //                 sx={{
// //                   color: "black",
// //                   "& .MuiSlider-thumb": {
// //                     backgroundColor: "white",
// //                     border: "2px solid black",
// //                     width: 18,
// //                     height: 18,
// //                   },
// //                 }}
// //               />
// //               <div className="filterSliderPrice">
// //                 <div className="priceRange">
// //                   <p>
// //                     Min Price: <span>${priceRange[0]}</span>
// //                   </p>
// //                   <p>
// //                     Max Price: <span>${priceRange[1]}</span>
// //                   </p>
// //                 </div>
// //               </div>
// //             </AccordionDetails>
// //           </Accordion>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Filter;

// import React, { useState, useEffect } from "react";
// import "./Filter.css";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import { IoIosArrowDown } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import Slider from "@mui/material/Slider";
// import axios from "axios";

// const Filter = ({ onFilterChange }) => {
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [categories, setCategories] = useState([]);
//   const [materialTypes, setMaterialTypes] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [selectedMaterialTypes, setSelectedMaterialTypes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [brandsData] = useState([
//     { name: "KinderKraft", count: 2 },
//     { name: "Lego", count: 7 },
//     { name: "Open Ended", count: 10 },
//     { name: "Mangna Tiles", count: 39 },
//     { name: "Jarmelo", count: 95 },
//     { name: "Step2", count: 1092 },
//     { name: "Doodle Hog", count: 48 },
//     { name: "Barbie", count: 25 },
//     { name: "Air Fix", count: 75 },
//   ]);

//   useEffect(() => {
//     // Fetch categories
//     axios
//       .get("https://toyshop-sooty.vercel.app/api/categories")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });

//     // Fetch products for materialType and price range
//     axios
//       .get("https://toyshop-sooty.vercel.app/api/products")
//       .then((response) => {
//         const products = response.data;
//         // Extract unique materialTypes
//         const uniqueMaterialTypes = [
//           ...new Set(products.map((p) => p.materialType).filter(Boolean)),
//         ];
//         setMaterialTypes(uniqueMaterialTypes);
//         // Set dynamic price range
//         const prices = products.map((p) => p.price).filter((p) => p != null);
//         const minPrice = Math.floor(Math.min(...prices)) || 0;
//         const maxPrice = Math.ceil(Math.max(...prices)) || 1000;
//         setPriceRange([minPrice, maxPrice]);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const handleMaterialTypeChange = (material) => {
//     setSelectedMaterialTypes((prev) =>
//       prev.includes(material)
//         ? prev.filter((m) => m !== material)
//         : [...prev, material]
//     );
//     onFilterChange({
//       categoryID: selectedCategory,
//       subcategoryID: selectedSubcategory,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//       materialTypes: selectedMaterialTypes.includes(material)
//         ? selectedMaterialTypes.filter((m) => m !== material)
//         : [...selectedMaterialTypes, material],
//     });
//   };

//   const handlePriceChange = (event, newValue) => {
//     setPriceRange(newValue);
//     onFilterChange({
//       categoryID: selectedCategory,
//       subcategoryID: selectedSubcategory,
//       minPrice: newValue[0],
//       maxPrice: newValue[1],
//       materialTypes: selectedMaterialTypes,
//     });
//   };

//   const handleCategoryClick = (categoryID) => {
//     if (expandedCategory === categoryID) {
//       setSelectedCategory(categoryID);
//       setSelectedSubcategory(null);
//       setExpandedCategory(null);
//       onFilterChange({
//         categoryID,
//         subcategoryID: null,
//         minPrice: priceRange[0],
//         maxPrice: priceRange[1],
//         materialTypes: selectedMaterialTypes,
//       });
//     } else {
//       setExpandedCategory(categoryID);
//       setSelectedCategory(null);
//       setSelectedSubcategory(null);
//     }
//   };

//   const handleSubcategoryClick = (categoryID, subcategoryID) => {
//     setSelectedCategory(categoryID);
//     setSelectedSubcategory(subcategoryID);
//     setExpandedCategory(null);
//     onFilterChange({
//       categoryID,
//       subcategoryID,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//       materialTypes: selectedMaterialTypes,
//     });
//   };

//   const handleAllToysClick = () => {
//     setSelectedCategory(null);
//     setSelectedSubcategory(null);
//     setExpandedCategory(null);
//     onFilterChange({
//       categoryID: null,
//       subcategoryID: null,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//       materialTypes: selectedMaterialTypes,
//     });
//   };

//   const filteredBrands = brandsData.filter((brand) =>
//     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="filterSection">
//         <div className="filterCategories">
//           <Accordion defaultExpanded disableGutters elevation={0}>
//             <AccordionSummary
//               expandIcon={<IoIosArrowDown size={20} />}
//               aria-controls="panel1-content"
//               id="panel1-header"
//               sx={{ padding: 0, marginBottom: 2 }}
//             >
//               <h5 className="filterHeading">Product Categories</h5>
//             </AccordionSummary>
//             <AccordionDetails sx={{ padding: 0 }}>
//               <p
//                 onClick={handleAllToysClick}
//                 style={{ cursor: "pointer", padding: "8px 0" }}
//                 className={selectedCategory === null ? "selected" : ""}
//               >
//                 All Toys
//               </p>
//               {categories.map((category) => (
//                 <div key={category._id}>
//                   <p
//                     onClick={() => handleCategoryClick(category.categoryID)}
//                     style={{ cursor: "pointer", padding: "8px 0" }}
//                     className={
//                       selectedCategory === category.categoryID ? "selected" : ""
//                     }
//                   >
//                     {category.categoryName}
//                   </p>
//                   {expandedCategory === category.categoryID && (
//                     <div style={{ paddingLeft: "16px" }}>
//                       {category.subcategories.map((subcategory) => (
//                         <p
//                           key={subcategory._id}
//                           onClick={() =>
//                             handleSubcategoryClick(
//                               category.categoryID,
//                               subcategory.subcategoryID
//                             )
//                           }
//                           style={{ cursor: "pointer", padding: "4px 0" }}
//                           className={
//                             selectedSubcategory === subcategory.subcategoryID
//                               ? "selected"
//                               : ""
//                           }
//                         >
//                           {subcategory.subcategoryName}
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </AccordionDetails>
//           </Accordion>
//         </div>

//         <div className="filterMaterialTypes">
//           <Accordion defaultExpanded disableGutters elevation={0}>
//             <AccordionSummary
//               expandIcon={<IoIosArrowDown size={20} />}
//               aria-controls="panel2-content"
//               id="panel2-header"
//               sx={{ padding: 0, marginBottom: 2 }}
//             >
//               <h5 className="filterHeading">Material Type</h5>
//             </AccordionSummary>
//             <AccordionDetails sx={{ padding: 0 }}>
//               <div className="materialTypeList">
//                 {materialTypes.length > 0 ? (
//                   materialTypes.map((material, index) => (
//                     <div className="materialTypeItem" key={index}>
//                       <input
//                         type="checkbox"
//                         name="materialType"
//                         id={`material-${index}`}
//                         className="materialTypeCheckbox"
//                         checked={selectedMaterialTypes.includes(material)}
//                         onChange={() => handleMaterialTypeChange(material)}
//                       />
//                       <label
//                         htmlFor={`material-${index}`}
//                         className="materialTypeLabel"
//                       >
//                         {material}
//                       </label>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="notFoundMessage">No materials found</div>
//                 )}
//               </div>
//             </AccordionDetails>
//           </Accordion>
//         </div>

//         <div className="filterBrands">
//           <Accordion defaultExpanded disableGutters elevation={0}>
//             <AccordionSummary
//               expandIcon={<IoIosArrowDown size={20} />}
//               aria-controls="panel4-content"
//               id="panel4-header"
//               sx={{ padding: 0, marginBottom: 2 }}
//             >
//               <h5 className="filterHeading">Brands</h5>
//             </AccordionSummary>
//             <AccordionDetails sx={{ padding: 0 }}>
//               <div className="searchBar">
//                 <BiSearch className="searchIcon" size={20} color={"#767676"} />
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="brandList">
//                 {filteredBrands.length > 0 ? (
//                   filteredBrands.map((brand, index) => (
//                     <div className="brandItem" key={index}>
//                       <input
//                         type="checkbox"
//                         name="brand"
//                         id={`brand-${index}`}
//                         className="brandRadio"
//                       />
//                       <label htmlFor={`brand-${index}`} className="brandLabel">
//                         {brand.name}
//                       </label>
//                       <span className="brandCount">{brand.count}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="notFoundMessage">Not found</div>
//                 )}
//               </div>
//             </AccordionDetails>
//           </Accordion>
//         </div>

//         <div className="filterPrice">
//           <Accordion defaultExpanded disableGutters elevation={0}>
//             <AccordionSummary
//               expandIcon={<IoIosArrowDown size={20} />}
//               aria-controls="panel5-content"
//               id="panel5-header"
//               sx={{ padding: 0, marginBottom: 2 }}
//             >
//               <h5 className="filterHeading">Price</h5>
//             </AccordionSummary>
//             <AccordionDetails sx={{ padding: 0 }}>
//               <Slider
//                 getAriaLabel={() => "Price range"}
//                 value={priceRange}
//                 onChange={handlePriceChange}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `$${value}`}
//                 min={Math.floor(priceRange[0])}
//                 max={Math.ceil(priceRange[1])}
//                 sx={{
//                   color: "black",
//                   "& .MuiSlider-thumb": {
//                     backgroundColor: "white",
//                     border: "2px solid black",
//                     width: 18,
//                     height: 18,
//                   },
//                 }}
//               />
//               <div className="filterSliderPrice">
//                 <div className="priceRange">
//                   <p>
//                     Min Price: <span>${priceRange[0]}</span>
//                   </p>
//                   <p>
//                     Max Price: <span>${priceRange[1]}</span>
//                   </p>
//                 </div>
//               </div>
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

import React, { useState, useEffect } from "react";
import "./Filter.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import Slider from "@mui/material/Slider";
import axios from "axios";

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [priceBounds, setPriceBounds] = useState([0, 1000]); // Store min/max bounds separately
  const [categories, setCategories] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedMaterialTypes, setSelectedMaterialTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandsData] = useState([
    { name: "KinderKraft", count: 2 },
    { name: "Lego", count: 7 },
    { name: "Open Ended", count: 10 },
    { name: "Mangna Tiles", count: 39 },
    { name: "Jarmelo", count: 95 },
    { name: "Step2", count: 1092 },
    { name: "Doodle Hog", count: 48 },
    { name: "Barbie", count: 25 },
    { name: "Air Fix", count: 75 },
  ]);

  useEffect(() => {
    // Fetch categories
    axios
      .get("https://toyshop-sooty.vercel.app/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch products for materialType and price range
    axios
      .get("https://toyshop-sooty.vercel.app/api/products")
      .then((response) => {
        const products = response.data;
        // Extract unique materialTypes
        const uniqueMaterialTypes = [
          ...new Set(products.map((p) => p.materialType).filter(Boolean)),
        ];
        setMaterialTypes(uniqueMaterialTypes);
        // Set dynamic price bounds
        const prices = products
          .map((p) => p.price)
          .filter((p) => p != null && !isNaN(p));
        if (prices.length > 0) {
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceBounds([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]); // Initialize range to bounds
        } else {
          // Fallback if no valid prices
          setPriceBounds([0, 1000]);
          setPriceRange([0, 1000]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setPriceBounds([0, 1000]);
        setPriceRange([0, 1000]);
      });
  }, []);

  const handleMaterialTypeChange = (material) => {
    setSelectedMaterialTypes((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
    onFilterChange({
      categoryID: selectedCategory,
      subcategoryID: selectedSubcategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      materialTypes: selectedMaterialTypes.includes(material)
        ? selectedMaterialTypes.filter((m) => m !== material)
        : [...selectedMaterialTypes, material],
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    // Only trigger filter change after user finishes sliding
    onFilterChange({
      categoryID: selectedCategory,
      subcategoryID: selectedSubcategory,
      minPrice: newValue[0],
      maxPrice: newValue[1],
      materialTypes: selectedMaterialTypes,
    });
  };

  const handleCategoryClick = (categoryID) => {
    if (expandedCategory === categoryID) {
      setSelectedCategory(categoryID);
      setSelectedSubcategory(null);
      setExpandedCategory(null);
      onFilterChange({
        categoryID,
        subcategoryID: null,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        materialTypes: selectedMaterialTypes,
      });
    } else {
      setExpandedCategory(categoryID);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (categoryID, subcategoryID) => {
    setSelectedCategory(categoryID);
    setSelectedSubcategory(subcategoryID);
    setExpandedCategory(null);
    onFilterChange({
      categoryID,
      subcategoryID,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      materialTypes: selectedMaterialTypes,
    });
  };

  const handleAllToysClick = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setExpandedCategory(null);
    onFilterChange({
      categoryID: null,
      subcategoryID: null,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      materialTypes: selectedMaterialTypes,
    });
  };

  const filteredBrands = brandsData.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="filterSection">
        <div className="filterCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Product Categories</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <p
                onClick={handleAllToysClick}
                style={{ cursor: "pointer", padding: "8px 0" }}
                className={selectedCategory === null ? "selected" : ""}
              >
                All Toys
              </p>
              {categories.map((category) => (
                <div key={category._id}>
                  <p
                    onClick={() => handleCategoryClick(category.categoryID)}
                    style={{ cursor: "pointer", padding: "8px 0" }}
                    className={
                      selectedCategory === category.categoryID ? "selected" : ""
                    }
                  >
                    {category.categoryName}
                  </p>
                  {expandedCategory === category.categoryID && (
                    <div style={{ paddingLeft: "16px" }}>
                      {category.subcategories.map((subcategory) => (
                        <p
                          key={subcategory._id}
                          onClick={() =>
                            handleSubcategoryClick(
                              category.categoryID,
                              subcategory.subcategoryID
                            )
                          }
                          style={{ cursor: "pointer", padding: "4px 0" }}
                          className={
                            selectedSubcategory === subcategory.subcategoryID
                              ? "selected"
                              : ""
                          }
                        >
                          {subcategory.subcategoryName}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="filterMaterialTypes">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Material Type</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="materialTypeList">
                {materialTypes.length > 0 ? (
                  materialTypes.map((material, index) => (
                    <div className="materialTypeItem" key={index}>
                      <input
                        type="checkbox"
                        name="materialType"
                        id={`material-${index}`}
                        className="materialTypeCheckbox"
                        checked={selectedMaterialTypes.includes(material)}
                        onChange={() => handleMaterialTypeChange(material)}
                      />
                      <label
                        htmlFor={`material-${index}`}
                        className="materialTypeLabel"
                      >
                        {material}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="notFoundMessage">No materials found</div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="filterBrands">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel4-content"
              id="panel4-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Brands</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="searchBar">
                <BiSearch className="searchIcon" size={20} color={"#767676"} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="brandList">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <div className="brandItem" key={index}>
                      <input
                        type="checkbox"
                        name="brand"
                        id={`brand-${index}`}
                        className="brandRadio"
                      />
                      <label htmlFor={`brand-${index}`} className="brandLabel">
                        {brand.name}
                      </label>
                      <span className="brandCount">{brand.count}</span>
                    </div>
                  ))
                ) : (
                  <div className="notFoundMessage">Not found</div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="filterPrice">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel5-content"
              id="panel5-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Price</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={priceRange}
                onChange={handlePriceChange}
                onChangeCommitted={handlePriceChangeCommitted}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={priceBounds[0]}
                max={priceBounds[1]}
                sx={{
                  color: "black",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                    border: "2px solid black",
                    width: 18,
                    height: 18,
                  },
                }}
              />
              <div className="filterSliderPrice">
                <div className="priceRange">
                  <p>
                    Min Price: <span>${priceRange[0]}</span>
                  </p>
                  <p>
                    Max Price: <span>${priceRange[1]}</span>
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Filter;