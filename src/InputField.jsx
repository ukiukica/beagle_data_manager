import React, { useState, useEffect, useCallback } from "react";

function InputField({ id, fieldName, type, value, setFormValues }) {
  return (
        <input
          id={id}
          // className="input-field"
          type={type}
          name={fieldName}
          value={value}
          onChange={(e) => {
            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              [e.target.name]: e.target.value,
            }));
          }}
        />
  );
}

export default InputField;
