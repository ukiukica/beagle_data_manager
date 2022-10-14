import React, { useEffect, useState } from "react";
import { getCollections } from "./firebase";

import SpecList from "./SpecList";
import { formatSpec } from "./utilities";

function Collections() {
  const [specs, setSpecs] = useState();
  const [specType, setSpecType] = useState();
  // console.log("specType", specType)

  useEffect(() => {
    async function fetchData() {
      const fetchedSpecs = await getCollections();
      // console.log("fetchedSpecs", fetchedSpecs)
      setSpecs(fetchedSpecs);
    }

    fetchData();
  }, []);

  return (
    <>
      <div id="collections">
        {specs &&
          specs.map((spec) => (
            <div key={spec} onClick={() => setSpecType(spec)}>
              {formatSpec(spec)}
            </div>
          ))}
      </div>

      <div id="spec-list">
        <SpecList specType={specType} />
      </div>
    </>
  );
}

export default Collections;
