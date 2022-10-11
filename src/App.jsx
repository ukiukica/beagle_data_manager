import { uuidv4 } from "@firebase/util";
import React, { useState, useCallback } from "react";
import Collections from "./Collections";
import { createSpec, getSpec, updateSpec } from "./firebase";
// import LookupForm from './LookupForm';
// import SpecForm from './SpecForm'

import "./stylesheets/App.css";
import "./stylesheets/global.css";

function App() {
  // const [specName, setSpecName] = useState('user');
  // const [existingSpec, setExistingSpec] = useState();
  // const [errors, setErrors] = useState();

  // console.log("existingSpec", existingSpec)
  // const handleSave = useCallback(async (specName, id, values) => {
  //   if (id === null) {
  //     id = uuidv4();
  //     await createSpec(`${specName}/${id}`, { id, ...values });
  //     return;
  //   }

  //   await updateSpec(`${specName}/${id}`, values);
  // }, []);

  // const handleLoad = useCallback(async (specName, id) => {
  //   const spec = await getSpec(`${specName}/${id}`);
  //   if (!spec) {
  //     return alert(`${specName}/${id} not found!`);
  //   }

  //   setExistingSpec(spec);
  // }, []);

  return (
    <div>
      <h1 id="title">Beagle Data Manager</h1>
      <Collections />
    </div>
  );
}

export default App;
