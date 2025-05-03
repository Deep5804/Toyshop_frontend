// import React from "react";
// import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
// import Product from "../Components/Product/ProductMain/Product";
// import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";

// const ProductDetails = () => {
//   return (
//     <>
//       <Product />
//       <AdditionalInfo />
//       <RelatedProducts />
//     </>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch(`https://toyshop-sooty.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        fetch("https://toyshop-sooty.vercel.app/api/categories")
          .then((res) => res.json())
          .then((categories) => {
            const matches = [];
            for (const category of categories) {
              for (const subcategory of category.subcategories) {
                if (subcategory.products.includes(product._id)) {
                  matches.push({
                    categoryID: category.categoryID,
                    subcategoryID: subcategory.subcategoryID,
                  });
                }
              }
            }
            setCategoryData(matches);
          })
          .catch((err) => console.error("Error fetching categories:", err));
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const categoryIDs = categoryData.map((entry) => entry.categoryID);

  return (
    <>
      <Product />
      
      <RelatedProducts categoryIDs={categoryIDs} productID={id} />
    </>
  );
};

export default ProductDetails;
