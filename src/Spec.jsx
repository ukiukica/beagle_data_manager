import React, { useState, useEffect, useCallback } from "react";
import { uuidv4 } from "@firebase/util";
import { createSpec, getSpec, updateSpec, deleteSpec } from "./firebase";
import parsePhoneNumber from "libphonenumber-js";
import { AsYouType } from "libphonenumber-js";
// import { Timestamp } from "@firebase/firestore";

import InputField from "./InputField";
import SelectField from "./SelectField";

function Spec({ specType, specData, setReload }) {
  const [formValues, setFormValues] = useState([]);
  const [id, setId] = useState();
  const [test, setTest] = useState(false);
  // console.log("specData", specData)
  // console.log("formValues", formValues);
  // console.log("id", id);
  // if (formValues) console.log("date", formValues["updated_at"]?.toDate().toISOString())

  useEffect(() => {
    if (!specData) {
      return;
    }

    setFormValues(specData);
    setId(specData.id);
  }, [specData]);


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

  const handleSubmit = useCallback(() => {
    handleSave(specType, id || null, formValues);
  }, [specType, formValues, handleSave]);

  const onDelete = useCallback(async (specType, id) => {
    // e.preventDefault();
    // console.log("IN onDelete, path", `${specType}/${id}`);
    if (confirm("Are you sure you want to delete the selected spec?")) {
      await deleteSpec(`${specType}/${id}`);
      setReload(true);
    } else return;
  }, []);

  function normalizeData() {
    // console.log("in normalizeData");
    const phoneNumber = formValues["phone_number"];
    // console.log("phoneNumber", phoneNumber);
    const lastLogin = formValues["last_login"];
    const createdAt = formValues["created_at"];
    const updatedAt = formValues["updated_at"];

   setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ["name"]: "gotcha",
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // normalizeData();
    handleSubmit();
    alert("Spec successfully saved!");
    setFormValues({})
  };

  return (
    <>
      {formValues && (
        <form onSubmit={onSubmit}>
          <div>
            <InputField
              fieldName={"name"}
              type={"text"}
              value={formValues["name"] || ""}
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"email"}
              type={"text"}
              value={formValues["email"] || ""}
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"password"}
              type={"text"}
              value={formValues["password"] || ""}
              setFormValues={setFormValues}
            />
            <SelectField
              fieldName={"verified_email"}
              options={["true", "false"]}
              value={formValues["verified_email"] || ""}
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"phone_number"}
              type={"text"}
              value={
                (formValues["phone_number"] &&
                  new AsYouType().input(formValues["phone_number"])) ||
                ""
              }
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"last_login"}
              type={"datetime-local"}
              value={formValues["last_login"] || ""}
              setFormValues={setFormValues}
            />
            <SelectField
              fieldName={"role"}
              options={["customer", "employee", "admin"]}
              value={formValues["role"] || ""}
              setFormValues={setFormValues}
            />
            <SelectField
              fieldName={"auth_provider"}
              options={["email", "phone", "apple", "google", "facebook"]}
              value={formValues["auth_provider"] || ""}
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"created_at"}
              type={"datetime-local"}
              value={formValues["created_at"] || ""}
              setFormValues={setFormValues}
            />
            <InputField
              fieldName={"updated_at"}
              type={"datetime-local"}
              value={formValues["updated_at"] || ""}
              setFormValues={setFormValues}
            />
          </div>
          <button type="submit">Save</button>
          {formValues["id"] && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(specType, id);
              }}
            >
              Delete
            </button>
          )}
        </form>
      )}
    </>
  );
}

export default Spec;
