import React, { useState, useEffect, useCallback } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

function Spec({ specData, setFormValues }) {
  return (
    <>
      <InputField
        fieldName={"name"}
        type={"text"}
        value={specData["name"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"email"}
        type={"text"}
        value={specData["email"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"password"}
        type={"text"}
        value={specData["password"]}
        setFormValues={setFormValues}
      />
      <SelectField
        fieldName={"verified_email"}
        options={["true", "false"]}
        value={specData["verified_email"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"phone_number"}
        type={"number"}
        value={specData["phone_number"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"last_login"}
        type={"date"}
        value={specData["last_login"]}
        setFormValues={setFormValues}
      />
      <SelectField
        fieldName={"role"}
        options={["customer", "employee", "admin"]}
        value={specData["role"]}
        setFormValues={setFormValues}
      />
      <SelectField
        fieldName={"auth_provider"}
        options={["email", "phone", "apple", "google", "facebook"]}
        value={specData["auth_provider"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"created_at"}
        type={"date"}
        value={specData["created_at"]}
        setFormValues={setFormValues}
      />
      <InputField
        fieldName={"updated_at"}
        type={"date"}
        value={specData["updated_at"]}
        setFormValues={setFormValues}
      />
    </>
  );
}

export default Spec;
