import React, { useState, useEffect, useCallback } from "react";

import {formatFieldName} from "./utilities";

function SelectField({ labelOnly, fieldName, options, value, setFormValues }) {
  return (
    <div className="field-div">
      <label className={labelOnly ? "" : "no-display"}>{formatFieldName(fieldName)}</label>
      <select
        className={labelOnly ? "no-display" : ""}
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
    </div>
  );
}

export default SelectField;
