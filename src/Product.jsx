import React, { useEffect, useState } from "react";
import InputField from "./InputField";

function Product({ product, products, setProducts }) {
  const [productDetails, setProductDetails] = useState(product);
  // console.log("productDetails", productDetails);

  const updateProducts = () => {
    let updatedProducts = [...products];
    // console.log("products", products)
    // console.log("updatedProducts", updatedProducts)
    for (let i = 0; i < updatedProducts.length; i++) {
      if (updatedProducts[i].id === productDetails.id) {
        // console.log("updatedProducts[i]", updatedProducts[i])
        updatedProducts[i] = {...productDetails};
        // console.log("updatedProducts", updatedProducts)
        setProducts(updatedProducts);
        return;
      }
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    updateProducts();
    alert("Product successfully updated");
  };

  return (
    <>
      <div id="product-id">{product.id}</div>
      <InputField
        fieldName={"name"}
        value={productDetails.name}
        setFormValues={setProductDetails}
      />
      <InputField
        fieldName={"cost"}
        value={productDetails.cost}
        setFormValues={setProductDetails}
      />
      <InputField
        fieldName={"quantity"}
        value={productDetails.quantity}
        setFormValues={setProductDetails}
      />
      <button onClick={(e) => onClick(e)}>Save</button>
    </>
  );
}

export default Product;
