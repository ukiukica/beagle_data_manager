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
    <div id="spec">
      {formValues && (
        <form onSubmit={onSubmit}>
          <InputField
            id={"name-input"}
            fieldName={"name"}
            type={"text"}
            value={formValues["name"] || ""}
            setFormValues={setFormValues}
          />

          <InputField
            id={"email-input"}
            fieldName={"email"}
            type={"text"}
            value={formValues["email"] || ""}
            setFormValues={setFormValues}
          />

          <InputField
            id={"pass-input"}
            fieldName={"password"}
            type={"text"}
            value={formValues["password"] || ""}
            setFormValues={setFormValues}
          />

          <SelectField
            id={"verif-select"}
            fieldName={"verified_email"}
            options={["true", "false"]}
            value={formValues["verified_email"] || ""}
            setFormValues={setFormValues}
          />

          <InputField
            id={"phone-input"}
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
            id={"login-input"}
            fieldName={"last_login"}
            type={"datetime-local"}
            value={formValues["last_login"] || ""}
            setFormValues={setFormValues}
          />

          <SelectField
            id={"role-select"}
            fieldName={"role"}
            options={["customer", "employee", "admin"]}
            value={formValues["role"] || ""}
            setFormValues={setFormValues}
          />

          <SelectField
            id={"auth-select"}
            fieldName={"auth_provider"}
            options={["email", "phone", "apple", "google", "facebook"]}
            value={formValues["auth_provider"] || ""}
            setFormValues={setFormValues}
          />

          <InputField
            id={"create-input"}
            fieldName={"created_at"}
            type={"datetime-local"}
            value={formValues["created_at"] || ""}
            setFormValues={setFormValues}
          />

          <InputField
            id={"update-input"}
            fieldName={"updated_at"}
            type={"datetime-local"}
            value={formValues["updated_at"] || ""}
            setFormValues={setFormValues}
          />

          <button id="sub-btn" type="submit">
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
