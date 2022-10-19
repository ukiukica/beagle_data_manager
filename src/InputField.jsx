import React from "react";
import { AsYouType } from "libphonenumber-js";

import { formatFieldName } from "./utilities";

function InputField({
  labelOnly,
  id,
  isDisabled,
  fieldName,
  type,
  value,
  setFormValues,
}) {
  
  return (
    <div className="field-div">
      <label className={labelOnly ? "" : "no-display"} id="field-label">
        {formatFieldName(fieldName)}
      </label>
      <input
        className={labelOnly ? "no-display" : ""}
        id={id}
        disabled={isDisabled}
        required={true}
        type={type}
        name={fieldName}
        value={
          fieldName === "phone_number" ? new AsYouType().input(value) : value
        }
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
