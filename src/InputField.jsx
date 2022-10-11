import React, { useState, useEffect, useCallback } from "react";

function InputField({ fieldName, type, value, setFormValues }) {
  return (
    <>
      {/* <label>{fieldName}</label> */}
      <input
      type={type}
      name={fieldName}
      value={value}
      onChange={(e) => {
        setFormValues(prevFormValues =>({
          ...prevFormValues,
          [e.target.name]: e.target.value
        }))
      }}
      />
    </>
  );
};

export default InputField;
