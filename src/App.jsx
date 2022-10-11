import { uuidv4 } from '@firebase/util';
import React, { useState, useEffect, useCallback } from 'react';
import Collections from './Collections';
import { createSpec, getSpec, updateSpec } from './firebase';
import LookupForm from './LookupForm';
import SpecForm from './SpecForm'

function App() {
  const [specName, setSpecName] = useState('user');
  const [existingSpec, setExistingSpec] = useState();
  const [errors, setErrors] = useState();

  // console.log("existingSpec", existingSpec)
  const handleSave = useCallback(async (specName, id, values) => {
    if (id === null) {
      id = uuidv4();
      await createSpec(`${specName}/${id}`, { id, ...values });
      return;
    }

    await updateSpec(`${specName}/${id}`, values);
  }, []);

  const handleLoad = useCallback(async (specName, id) => {
    const spec = await getSpec(`${specName}/${id}`);
    if (!spec) {
      return alert(`${specName}/${id} not found!`);
    }

    setExistingSpec(spec);
  }, []);

  return (
    <div>
      <h1>Beagle Data Manager</h1>
      {/* <div>
        <LookupForm onLoad={handleLoad} />
      </div>
      <hr/>
      <div>
        {existingSpec
        ?
          <SpecForm
            specName={specName}
            id={existingSpec.id}
            existingFieldValues={existingSpec}
            onSave={handleSave}         />
        :
          <SpecForm
            specName={specName}
            onSave={handleSave}
          />
        }
      </div> */}
      <div>
        {/* <h2>New Stuff</h2> */}
        <Collections />
      </div>
    </div>
  )
}

export default App
