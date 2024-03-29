import React, { useState, useEffect, useCallback } from "react";

const SpecForm = ({ specName, id, existingFieldValues, onSave }) => {
  const [formValues, setFormValues] = useState({});

  const formValuesArr = Object.entries(formValues);

  useEffect(() => {
    if (!existingFieldValues) {
      return;
    }

    setFormValues(existingFieldValues);
  }, [existingFieldValues]);

  const handleSubmit = useCallback(() => {
    onSave(specName, id || null, formValues);
  }, [specName, id, formValues, onSave]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setFormValues({});
      }}
    >
      {formValuesArr.map((pair) => (
        <div key={pair[0]}>
          <label>
            {pair[0]}
            <input
              type="text"
              name={pair[0]}
              value={pair[1]}
              onChange={(e) => {
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
        </div>
      ))}
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default SpecForm;
