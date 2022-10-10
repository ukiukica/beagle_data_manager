import React from 'react';

const SpecForm = ({specName, id, existingFieldValues, onSave}) => {
    const [formValues, setFormValues] = React.useState({});

    React.useEffect(() => {
      if (!existingFieldValues) {
        return;
      }

      setFormValues(existingFieldValues);
    }, [existingFieldValues]);

    const handleSubmit = React.useCallback(() => {
      onSave(specName, id || null, formValues);
    }, [specName, id, formValues, onSave]);

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setFormValues({});
      }}>
        <div>
          <label>example field
            <input
              type="text"
              name="example_field"
              value={formValues['example_field'] || ''}
              onChange={(e) => {
                setFormValues({
                  [e.target.name]: e.target.value,
                  ...setFormValues,
                });
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  };

  export default SpecForm;
