import React, { useEffect, useState } from "react";
import { getCollections } from "./firebase";

import SpecList from "./SpecList";
import { formatSpec } from "./utilities";

function Collections() {
  const [specs, setSpecs] = useState();
  const [specType, setSpecType] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedSpecs = await getCollections();
      setSpecs(fetchedSpecs);
    }

    fetchData();
  }, []);

  return (
    <>
      <div id="collections">
        {specs &&
          specs.map((spec) => (
            <div
              key={spec}
              className="collection"
              onClick={() => setSpecType(spec)}
            >
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
