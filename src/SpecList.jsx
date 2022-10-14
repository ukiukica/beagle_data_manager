import React, { useState, useEffect } from "react";
import { getSpecList, getFields } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  const [fields, setFields] = useState();

  useEffect(() => {
    if (specType && reload) {
      async function fetchData() {
        const fetchedList = await getSpecList(specType);
        setSpecList(fetchedList);
        const fetchedFields = await getFields(specType);
        setFields(fetchedFields);
      }

      fetchData();
      setReload(false);
    }
  }, [specType, reload]);

  return (
    <>
      {specList && (
        <>
          <Spec specData={[]} labelOnly={true} />

          {specList.map((spec) => (
            <Spec
              specType={specType}
              specData={spec[1]}
              fields={fields}
              setReload={setReload}
              labelOnly={false}
              key={spec[0]}
            />
          ))}
          <Spec
            specType={specType}
            specData={[]}
            fields={fields}
            setReload={setReload}
            labelOnly={false}
          />
        </>
      )}
    </>
  );
}

export default SpecList;
