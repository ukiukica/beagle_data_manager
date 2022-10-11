import React, { useState, useEffect, useCallback } from "react";

function SelectField({ fieldName, options, value, setFormValues }) {
  return (
    <>
      <select
        name={fieldName}
        value={value}
        onChange={(e) => {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [e.target.name]: e.target.value,
          }));
        }}
      >
        <option value="">--Choose--</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectField;
