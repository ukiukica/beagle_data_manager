import React, { useState, useEffect, useCallback } from "react";
import { uuidv4 } from "@firebase/util";
import { createSpec, getSpec, updateSpec } from "./firebase";

import InputField from "./InputField";
import SelectField from "./SelectField";

function Spec({ specType, specData }) {
  const [formValues, setFormValues] = useState();
  const [id, setId] = useState();
  // console.log("specData", specData)
  console.log("formValues", formValues)
  console.log("id", id)
  // if (formValues) console.log("date", formValues["updated_at"]?.toDate().toISOString())

  useEffect(() => {
    if (!specData) {
      return;
    }

    setFormValues(specData);
    setId(specData.id)
  }, [specData]);

  const handleSave = useCallback(async (specType, id, values) => {
    if (id === null) {
      id = uuidv4();
      await createSpec(`${specType}/${id}`, { id, ...values });
      return;
    }

    await updateSpec(`${specType}/${id}`, values);
  }, []);


  const handleSubmit = useCallback(() => {
    handleSave(specType, id || null, formValues);
  }, [specType, formValues, handleSave]);


  return (
    <>
    {formValues && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          alert("Spec successfully saved!")
          // setFormValues({});
        }}
      >
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
          value={formValues["phone_number"] || ""}
          setFormValues={setFormValues}
        />
        <InputField
          fieldName={"last_login"}
          type={"text"}
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
          type={"text"}
          value={formValues["created_at"] || ""}
          setFormValues={setFormValues}
        />
        <InputField
          fieldName={"updated_at"}
          type={"text"}
          value={formValues["updated_at"] || ""}
          setFormValues={setFormValues}
        />
        </div>
        <button type="submit">Save</button>
      </form>
    )}

    </>
  );
}

export default Spec;
