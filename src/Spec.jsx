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

function Spec({ specType, specData, fields, reload, setReload, labelOnly }) {
  const [formValues, setFormValues] = useState();
  const [id, setId] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  // console.log("labelOnly", labelOnly)
  // console.log("formValues", formValues)
  // console.log("fields", fields)
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

    }

    fetchData();
  }, []);

  const handleSave = useCallback(async (specType, id, values) => {
    if (id === null) {
      id = uuidv4();
      await createSpec(`${specType}/${id}`, { id, ...values });
      // (() => reload ? setReload(false) : setReload(true));
      return;
    }

    await updateSpec(`${specType}/${id}`, values);
    // console.log("after updateSpec", reload);
    // reload ? setReload(false) : setReload(true);
    // console.log("after reload change", reload);
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
      // (() => reload ? setReload(false) : setReload(true));
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
      if (!validate(formValues["email"]))
        return alert("Email is invalid. Please try again.");
      if (!isValidPhoneNumber(formValues["phone_number"]))
        return alert("Phone Number is invalid. Please try again.");
      if (id) {
        const isCurrentSpec = await validateCurrent(updatedAt, specType, id);
        if (!isCurrentSpec) {
          (() => reload ? setReload(false) : setReload(true));
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
