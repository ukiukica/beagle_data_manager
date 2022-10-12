import parsePhoneNumber from "libphonenumber-js";

export const normalizeData = (formValues) => {
  let payload = { ...formValues };
  // console.log("payload", payload);
  const phoneNumber = payload["phone_number"];
  // const lastLogin = payload["last_login"];
  // const createdAt = payload["created_at"];
  // const updatedAt = payload["updated_at"];

  payload.phone_number = parsePhoneNumber(phoneNumber).number;
  return payload;
};

export const fieldTypeSelector = (fieldName) => {
  const types = {
    name: "text",
    email: "text",
    password: "text",
    verified_email: "select",
    phone_number: "text",
    last_login: "datetime-local",
    role: "select",
    auth_provider: "select",
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
      formatted.push(str[0].toUpperCase() + str.substring(1))
    })
    return formatted.join(" ")
  }
  else return fieldName[0].toUpperCase() + fieldName.substring(1)
}