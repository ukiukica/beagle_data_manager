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

  function normalizeData() {
    let payload = { ...formValues };
    console.log("payload", payload);
    const phoneNumber = payload["phone_number"];
    // const lastLogin = payload["last_login"];
    // const createdAt = payload["created_at"];
    // const updatedAt = payload["updated_at"];

    payload.phone_number = parsePhoneNumber(phoneNumber).number;
    return payload;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = normalizeData();
    handleSubmit(payload);
    alert("Spec successfully saved!");
    setFormValues({});
  };

  return (
    <>
      {formValues && (
        <form onSubmit={onSubmit}>
          {/* <tr> */}
            {/* <td> */}
              <InputField
                fieldName={"name"}
                type={"text"}
                value={formValues["name"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <InputField
                fieldName={"email"}
                type={"text"}
                value={formValues["email"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <InputField
                fieldName={"password"}
                type={"text"}
                value={formValues["password"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <SelectField
                fieldName={"verified_email"}
                options={["true", "false"]}
                value={formValues["verified_email"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
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
            {/* </td> */}
            {/* <td> */}
              <InputField
                fieldName={"last_login"}
                type={"datetime-local"}
                value={formValues["last_login"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <SelectField
                fieldName={"role"}
                options={["customer", "employee", "admin"]}
                value={formValues["role"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <SelectField
                fieldName={"auth_provider"}
                options={["email", "phone", "apple", "google", "facebook"]}
                value={formValues["auth_provider"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <InputField
                fieldName={"created_at"}
                type={"datetime-local"}
                value={formValues["created_at"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <InputField
                fieldName={"updated_at"}
                type={"datetime-local"}
                value={formValues["updated_at"] || ""}
                setFormValues={setFormValues}
              />
            {/* </td> */}
            {/* <td> */}
              <button type="submit">Save</button>
              {/* </td> */}
              {formValues["id"] && (
                // <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(specType, id);
                  }}
                >
                  Delete
                </button>
                // </td>
              )}
          {/* </tr> */}
        </form>
      )}
    </>
  );
}

export default Spec;
