import React, { useState, useEffect, useCallback } from "react";
import { uuidv4 } from "@firebase/util";
// import { Timestamp } from "@firebase/firestore";

import { createSpec, getSpec, updateSpec, deleteSpec } from "./firebase";
import {
  normalizeData,
  fieldTypeSelector,
  fieldOptionsSelector,
  formatFieldName
} from "./utilities";

import InputField from "./InputField";
import SelectField from "./SelectField";

function Spec({ specType, specData, setReload, labelOnly }) {
  const [formValues, setFormValues] = useState();
  const [id, setId] = useState();
  const [fields, setFields] = useState();

  useEffect(() => {
    if (!specData) {
      return;
    }

    setFormValues(specData);
    setId(specData.id);
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

  const validateData = (fields, formValues) => {
    if (fields) {
      const requiredFields = Object.keys(fields);
      const missingFields = [];
      requiredFields.forEach((field) => {
        if (!formValues[field]) missingFields.push(formatFieldName(field));
      });
      return missingFields.join(", ");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("formValues", formValues);
    const  validator = validateData(fields, formValues)
    if (validator) {
     return alert(`Please fill out the following field(s): ${validator}`)
    }
    const payload = normalizeData(formValues);
    handleSubmit(payload);
    alert("Spec successfully saved!");
    setFormValues({});
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
