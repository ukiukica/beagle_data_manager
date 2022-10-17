import parsePhoneNumber from "libphonenumber-js";
import { getSpec } from "./firebase";
// import { Timestamp } from "@firebase/firestore";

export const normalizeData = (formValues) => {
  let payload = { ...formValues };

  if (payload["phone_number"]) {
    const phoneNumber = payload["phone_number"];
    payload.phone_number = parsePhoneNumber(phoneNumber).number;
  }

  const currentTime = new Date().toISOString();
  const formattedTime = currentTime.slice(0, 16);

  payload.updated_at = formattedTime;

  return payload;
};

export const fieldTypeSelector = (fieldName) => {
  const types = {
    verified_email: "select",
    status: "select",
    role: "select",
    auth_provider: "select",
    cost: "number",
    total: "number",
    shipping_cost: "number",
    quantity: "number",
    last_login: "datetime-local",
    time_placed: "datetime-local",
    created_at: "datetime-local",
    updated_at: "datetime-local",
  };

  if (types[fieldName]) return types[fieldName];
  else return "text";
};

export const fieldOptionsSelector = (fields, fieldName) => {
  const type = fields[fieldName]["type"];

  if (type === "Boolean") return ["true", "false"];
  if (type.includes("|")) return type.split(" | ");
  else return [];
};

export const formatSpec = (spec) => {
  let formattedSpec = spec + "s";
  if (formattedSpec.includes("_")) {
    formattedSpec = formattedSpec.split("_").join(" ");
  }
  return formattedSpec.toUpperCase();
};

export const formatFieldName = (fieldName) => {
  if (fieldName.includes("_")) {
    let formatted = [];
    fieldName.split("_").forEach((str) => {
      formatted.push(str[0].toUpperCase() + str.substring(1));
    });
    return formatted.join(" ");
  } else return fieldName[0].toUpperCase() + fieldName.substring(1);
};

export const validateFields = (fields, formValues) => {
  const requiredFields = Object.keys(fields);
  const missingFields = [];
  requiredFields.forEach((field) => {
    if (!formValues[field]) missingFields.push(formatFieldName(field));
  });
  return missingFields.join(", ");
};

export const isCurrent = async (updatedAt, specType, id) => {
  const spec = await getSpec(`${specType}/${id}`);

  if (spec && updatedAt) {
    if (updatedAt.valueOf() < spec.updated_at.valueOf()) {
      return false;
    } else return true;
  }
};

export const validateCurrent = async (updatedAt, specType, id) => {
  const isCurrentSpec = await isCurrent(updatedAt, specType, id);
  if (isCurrentSpec) return true;
  else return false;
};
