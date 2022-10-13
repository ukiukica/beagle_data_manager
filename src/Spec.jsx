import React, { useState, useEffect, useCallback } from "react";
import { uuidv4 } from "@firebase/util";
// import { Timestamp } from "@firebase/firestore";
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

function Spec({ specType, specData, setReload, labelOnly }) {
  const [formValues, setFormValues] = useState();
  const [id, setId] = useState();
  const [fields, setFields] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  // console.log("id", id)
  useEffect(() => {
    if (!specData) {
      return;
    }

    setFormValues(specData);
    setId(specData.id);
    setUpdatedAt(specData.updated_at);
  }, [specData]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://beagleschema.demcrepl.repl.co/specs/user/schema"
      );
      const data = await res.json();
      setFields(data["fields"]);
    }

    fetchData();
  }, []);

  const handleSave = useCallback(async (specType, id, values) => {
    if (id === null) {
      id = uuidv4();
      await createSpec(`${specType}/${id}`, { id, ...values });
      setReload(true);
      return;
    }

    await updateSpec(`${specType}/${id}`, values);
    setReload(true);
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
      setReload(true);
    } else return;
  }, []);

  const onSubmit = async (e) => {
    if (formValues && fields) {
      e.preventDefault();
      // console.log("formValues", formValues);

      const fieldValidator = validateFields(fields, formValues);
      if (fieldValidator)
        return alert(
          `Please fill out the following field(s): ${fieldValidator}`
        );
      if (!validate(formValues["email"]))
        return alert("Email is invalid. Please try again.");
      if (!isValidPhoneNumber(formValues["phone_number"]))
        return alert("Phone Number is invalid. Please try again.");
      if (id) {
        const isCurrentSpec = await validateCurrent(updatedAt, specType, id);
        if (!isCurrentSpec) {
          setReload(true);
          return alert(
            "There is a new version of this spec. Data will be reloaded."
          );
        }
      }

      const payload = normalizeData(formValues);
      // console.log("payload", payload)
      handleSubmit(payload);
      alert("Spec successfully saved!");
      setFormValues({});
    }
  };

  return (
    <div id="spec">
      {formValues && (
        <form onSubmit={onSubmit}>
          {fields &&
            Object.keys(fields).map((field) =>
              fieldTypeSelector(field) === "select" ? (
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
  );
}

export default Spec;
