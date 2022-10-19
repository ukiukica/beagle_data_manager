import React, { useState } from "react";
import InputField from "./InputField";

function Product({ labelOnly, product, products, setProducts }) {
  const [productDetails, setProductDetails] = useState(product);

  const updateProducts = () => {
    Object.values(productDetails).forEach((value) => {
      if (!value) return;
    });
    let updatedProducts = [...products];
    for (let i = 0; i < updatedProducts.length; i++) {
      if (updatedProducts[i].id === productDetails.id) {
        updatedProducts[i] = { ...productDetails };
        let cost = Number(updatedProducts[i].cost);

        updatedProducts[i].cost = cost.toFixed(2);
        setProducts(updatedProducts);
        return;
      }
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
    alert("Product updated! Please, save the spec.");
  };

  const onDelete = (e) => {
    e.preventDefault();
    if (products.length < 2)
      return alert("At least one item has to be in the shopping cart!");
    deleteProduct();
    return alert("Product deleted! Please, save the spec.");
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div id="product-fields">
          <InputField
            labelOnly={labelOnly}
            fieldName={"name"}
            type="text"
            value={productDetails?.name || ""}
            setFormValues={setProductDetails}
          />
          <InputField
            labelOnly={labelOnly}
            fieldName={"cost"}
            type="number"
            value={productDetails?.cost || ""}
            setFormValues={setProductDetails}
          />
          <InputField
            labelOnly={labelOnly}
            fieldName={"quantity"}
            type="number"
            value={productDetails?.quantity || ""}
            setFormValues={setProductDetails}
          />
        </div>
        {!labelOnly && (
          <div className="buttons">
            <button className="submit" type="submit">
              Update
            </button>
            <button className="delete" onClick={(e) => onDelete(e)}>
              Delete
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default Product;
