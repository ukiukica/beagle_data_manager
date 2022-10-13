import React, { useEffect, useState } from "react";

import SpecList from "./SpecList";
import { formatSpec } from "./utilities";

function Collections() {
  const [specs, setSpecs] = useState();
  const [specType, setSpecType] = useState("user");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://beagleschema.demcrepl.repl.co/specs");
      const data = await res.json();
      setSpecs(data["specs"]);
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
