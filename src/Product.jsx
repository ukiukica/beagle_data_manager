import React, { useEffect, useState } from "react";
import InputField from "./InputField";

function Product({ product, products, setProducts }) {
  const [productDetails, setProductDetails] = useState(product);
  console.log("productDetails", productDetails);

  const updateProducts = () => {
    Object.values(productDetails).forEach((value) => {
      if (!value) return;
    });
    let updatedProducts = [...products];
    for (let i = 0; i < updatedProducts.length; i++) {
      if (updatedProducts[i].id === productDetails.id) {
        updatedProducts[i] = { ...productDetails };
        setProducts(updatedProducts);
        return;
      }
      // const newProduct =
      updatedProducts.push(productDetails);
      setProducts(updatedProducts);
      setProductDetails({});
      return;
    }
  };

  const deleteProduct = () => {
    let updatedProducts = [...products];
    for (let i = 0; i < updatedProducts.length; i++) {
      if (updatedProducts[i].id === productDetails.id) {
        updatedProducts.splice(i, 1);
        setProducts(updatedProducts);
        return;
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProducts();
    alert("Product successfully updated");
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteProduct();
    alert("Product successfully deleted");
  };

  return (
    <>
      <form
      onSubmit={(e) => onSubmit(e)}
      >
        <div id="product-id">{product?.id || ""}</div>
        <InputField
          fieldName={"name"}
          value={productDetails?.name || ""}
          setFormValues={setProductDetails}
        />
        <InputField
          fieldName={"cost"}
          value={productDetails?.cost || ""}
          setFormValues={setProductDetails}
        />
        <InputField
          fieldName={"quantity"}
          value={productDetails?.quantity || ""}
          setFormValues={setProductDetails}
        />
        <button type="submit">Save</button>
        <button onClick={(e) => onDelete(e)}>Delete</button>
      </form>
    </>
  );
}

export default Product;
