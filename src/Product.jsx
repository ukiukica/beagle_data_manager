import React, { useEffect, useState } from "react";
import InputField from "./InputField";

function Product({ labelOnly, product, products, setProducts }) {
  const [productDetails, setProductDetails] = useState(product);
  // console.log("productDetails", productDetails);

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
      const newProduct = { ...productDetails };
      newProduct["id"] = Math.floor(Math.random() * 9999);
      updatedProducts.push(newProduct);
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
    alert("Product successfully updated!");
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteProduct();
    alert("Product successfully deleted!");
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <InputField
          labelOnly={labelOnly}
          isDisabled={true}
          fieldName={"id"}
          value={productDetails?.id || ""}
        />

        <InputField
          labelOnly={labelOnly}
          fieldName={"name"}
          value={productDetails?.name || ""}
          setFormValues={setProductDetails}
        />
        <InputField
          labelOnly={labelOnly}
          fieldName={"cost"}
          value={productDetails?.cost || ""}
          setFormValues={setProductDetails}
        />
        <InputField
          labelOnly={labelOnly}
          fieldName={"quantity"}
          value={productDetails?.quantity || ""}
          setFormValues={setProductDetails}
        />
        {!labelOnly && (
          <>
            <button type="submit">Save</button>
            <button
            className={productDetails?.id ? "" : "hidden"}
            onClick={(e) => onDelete(e)}>Delete</button>
          </>
        )}
      </form>
    </>
  );
}

export default Product;