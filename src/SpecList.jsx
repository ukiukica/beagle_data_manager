import React, { useState, useEffect } from "react";
import { getSpecList, getFields } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  const [fields, setFields] = useState();

  useEffect(() => {
    if (specType) {
      async function fetchData() {
        const fetchedList = await getSpecList(specType);
        setSpecList(fetchedList);
        const fetchedFields = await getFields(specType);
        setFields(fetchedFields);
      }

      fetchData();
    }
  }, [specType, reload]);

  return (
    <>
      {!specType && (
        <p id="spec-list-p">Click on a collection to populate the data</p>
      )}

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
          {specType !== "shopping_cart" && (
            <Spec
              specType={specType}
              specData={[]}
              fields={fields}
              reload={reload}
              setReload={setReload}
              labelOnly={false}
            />
          )}
        </>
      )}
    </>
  );
}

export default SpecList;
