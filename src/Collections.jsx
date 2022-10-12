import React, { useEffect, useState } from "react";
import SpecList from "./SpecList";

function Collections() {
  const [specs, setSpecs] = useState();
  const [specType, setSpecType] = useState("user");

  console.log("specs", specs)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://beagleschema.demcrepl.repl.co/specs");
      const data = await res.json();
      // console.log("data", data);
      setSpecs(data["specs"]);
    }

    fetchData();
  }, []);

  const formatSpec = (spec) => {
    let formattedSpec = spec;
    if (formattedSpec.includes("_")) {
      formattedSpec = formattedSpec.split("_").join(" ");
    }
    return formattedSpec.toUpperCase()
  }

  return (
    <>
      <div id="collections">
        {specs && specs.map((spec) => (
          <div key={spec} onClick={() => setSpecType(spec)}>{formatSpec(spec)}</div>
        ))}
      </div>

      <div id="spec-list">
        <SpecList specType={specType} />
      </div>
    </>
  );
}

export default Collections;
