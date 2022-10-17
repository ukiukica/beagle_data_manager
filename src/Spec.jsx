import React, { useState, useEffect, useCallback } from "react";
import { uuidv4 } from "@firebase/util";
import { validate } from "email-validator";
import { isValidPhoneNumber } from "libphonenumber-js";

import { createSpec, getSpec, updateSpec, deleteSpec } from "./firebase";
import {
  normalizeData,
  fieldTypeSelector,
  fieldOptionsSelector,
  validateFields,
  validateCurrent,
} from "./utilities";

import InputField from "./InputField";
import SelectField from "./SelectField";
import Product from "./Product";

function Spec({ specType, specData, fields, reload, setReload, labelOnly }) {
  const [formValues, setFormValues] = useState();
  const [id, setId] = useState();
  const [products, setProducts] = useState();
  const [productNames, setProductNames] = useState();
  const [showProducts, setShowProducts] = useState(false);
  const [updatedAt, setUpdatedAt] = useState();
  // console.log("formValues", formValues);


  useEffect(() => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ["products"]: products,
    }));
  }, [products])


  useEffect(() => {
    if (!specData) {
      return;
    }

    setFormValues(specData);
    setId(specData.id);
    setUpdatedAt(specData.updated_at);
  }, [specData]);

  useEffect(() => {
    if (specData && specData["products"]) {
      setProducts(specData["products"]);
    }
  }, []);

  useEffect(() => {
    if (products) {
      const names = products.map((product) => product.name);
      setProductNames(names);
    }
  }, [products])


  const handleSave = useCallback(async (specType, id, values) => {
    if (id === null) {
      id = uuidv4();
      await createSpec(`${specType}/${id}`, { id, ...values });
      return;
    }

    await updateSpec(`${specType}/${id}`, values);
  }, []);

  const handleSubmit = useCallback(
    (payload) => {
      handleSave(specType, id || null, payload);
    },
    [specType, formValues, handleSave]
  );

  const onDelete = useCallback(async (specType, id) => {
    if (confirm("Are you sure you want to delete the selected spec?")) {
      await deleteSpec(`${specType}/${id}`);
      reload ? setReload(false) : setReload(true);
    } else return;
  }, []);

  const onSubmit = async (e) => {
    if (formValues && fields) {
      e.preventDefault();

      const fieldValidator = validateFields(fields, formValues);
      if (fieldValidator)
        return alert(
          `Please fill out the following field(s): ${fieldValidator}`
        );
      if (formValues["email"] && !validate(formValues["email"]))
        return alert("Email is invalid. Please try again.");
      if (formValues["phone_number"] && !isValidPhoneNumber(formValues["phone_number"]))
        return alert("Phone Number is invalid. Please try again.");
      if (id) {
        const isCurrentSpec = await validateCurrent(updatedAt, specType, id);
        if (!isCurrentSpec) {
          () => (reload ? setReload(false) : setReload(true));
          return alert(
            "There is a new version of this spec. Data will be reloaded."
          );
        }
      }

      const payload = normalizeData(formValues);
      handleSubmit(payload);
      alert("Spec successfully saved!");
      reload ? setReload(false) : setReload(true);
      setFormValues({});
    }
  };

  return (
    <>
      <div id="spec">
        {formValues && (
          <form onSubmit={onSubmit}>
            {fields &&
              Object.keys(fields).map((field) =>
                field === "products" ? (
                  <div
                    key={field}
                    onClick={() =>
                      showProducts
                        ? setShowProducts(false)
                        : setShowProducts(true)
                    }
                  >
                    <InputField
                      key={field}
                      fieldName={field}
                      isDisabled={true}
                      type={fieldTypeSelector(field)}
                      value={productNames?.join(", ") || ""}
                      setFormValues={setFormValues}
                      labelOnly={labelOnly}
                    />
                  </div>
                ) : fieldTypeSelector(field) === "select" ? (
                  <SelectField
                    key={field}
                    fieldName={field}
                    options={fieldOptionsSelector(fields, field)}
                    value={formValues[field] || ""}
                    setFormValues={setFormValues}
                    labelOnly={labelOnly}
                  />
                ) : (
                  <InputField
                    key={field}
                    fieldName={field}
                    type={fieldTypeSelector(field)}
                    value={formValues[field] || ""}
                    setFormValues={setFormValues}
                    labelOnly={labelOnly}
                  />
                )
              )}

            <button
              className={labelOnly ? "no-display" : ""}
              id="sub-btn"
              type="submit"
            >
              Save
            </button>

            <button
              id="del-btn"
              className={formValues["id"] ? "" : "hidden"}
              onClick={(e) => {
                e.preventDefault();
                onDelete(specType, id);
              }}
            >
              Delete
            </button>
          </form>
        )}
      </div>

      {products &&
        showProducts && (
          <>
          <Product labelOnly={true}/>
            {products.map((product) => (
          <div id="product-list" key={product.name}>
            <Product product={product} products={products} setProducts={setProducts}/>
          </div>
        ))}
        <Product products={products} setProducts={setProducts}/>
          </>
        )
        }
    </>
  );
}

export default Spec;
