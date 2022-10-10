import React, { useState, useEffect, useCallback } from "react";
import { createSpec, getSpecList, getSpec, updateSpec } from "./firebase";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  console.log("specList", specList);

  useEffect(() => {
    if (specType) {
      async function fetchData() {
        const list = await getSpecList(specType);
        setSpecList(list);
      }
      fetchData();
    }
  }, [specType]);

  return <div>{specList && <div>Spec List goes here</div>}</div>;
}

export default SpecList;
