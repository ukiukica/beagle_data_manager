import React, { useState, useEffect } from "react";
import { getSpecList, getFields } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  const [fields, setFields] = useState();
  // console.log("specType", specType)
  // console.log("reload", reload)

  useEffect(() => {
    // console.log("top of useEffect", specType)
    if (specType) {
      // console.log("top of if statement in useEffect", specType)
      async function fetchData() {
        // console.log("specType in useEffect", specType)
        const fetchedList = await getSpecList(specType);
        setSpecList(fetchedList);
        console.log("fetchedList", fetchedList)
        const fetchedFields = await getFields(specType);
        setFields(fetchedFields);
      }
      fetchData();
      // setReload(false);
    }
  }, [specType, reload]);

  return (
    <>
      {specList && (
        <>
          <Spec specData={[]} fields={fields} labelOnly={true} />

          {specList.map((spec) => (
            <Spec
              specType={specType}
              specData={spec[1]}
              fields={fields}
              reload={reload}
              setReload={setReload}
              labelOnly={false}
              key={spec[0]}
            />
          ))}
          <Spec
            specType={specType}
            specData={[]}
            fields={fields}
            reload={reload}
            setReload={setReload}
            labelOnly={false}
          />
        </>
      )}
    </>
  );
}

export default SpecList;
