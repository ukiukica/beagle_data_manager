import React, { useState, useEffect, useCallback } from "react";

function InputField({ labelOnly, id, fieldName, type, value, setFormValues }) {
  return (
    <div className="field-div">
      <label className={labelOnly ? "" : "no-display"} id="field-label">{fieldName}</label>
      <input
        className={labelOnly ? "no-display" : ""}
        id={id}
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
    </div>
  );
}

export default InputField;
