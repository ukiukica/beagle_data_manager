import React from 'react';

const LookupForm = ({ onLoad }) => {
    return (
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          const specName = formData.get('spec_name');
          const id = formData.get('id');
          if (!specName || !id) {
            return alert('Select a spec and enter an id!');
          }

          onLoad(specName, id);
        }}>
          <label>spec type:
            <select name="spec_name">
              <option>user</option>
            </select>
          </label>
          <label>Existing spec id:
            <input name="id" type="text" />
          </label>
          <button type="submit">Load</button>
        </form>
      );
};

export default LookupForm;
