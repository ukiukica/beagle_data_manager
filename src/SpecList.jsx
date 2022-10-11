import React, { useState, useEffect, useCallback } from "react";
import { createSpec, getSpecList, getSpec, updateSpec } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(false)
  // console.log("specList", specList);

  useEffect(() => {
    if (specType) {
      async function fetchData() {
        const list = await getSpecList(specType);
        setSpecList(list);
      }
      fetchData();
    }
  }, [specType, reload]);

  return (
    <>
      {specList &&
        specList.map((spec) => (
          <div key={spec[0]}>
            <Spec
              specType={specType}
              specData={spec[1]}
              setReload={setReload}
            />
            <br />
            <br />
          </div>
        ))}
    </>
  );
}

export default SpecList;
