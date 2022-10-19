import React, { useState, useEffect } from "react";
import { getSpecList, getFields } from "./firebase";
import Spec from "./Spec";

function SpecList({ collectionType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  const [fields, setFields] = useState();

  useEffect(() => {
    if (collectionType) {
      async function fetchData() {
        const fetchedList = await getSpecList(collectionType);
        setSpecList(fetchedList);
        const fetchedFields = await getFields(collectionType);
        setFields(fetchedFields);
      }

      fetchData();
    }
  }, [collectionType, reload]);

  return (
    <>
      {!collectionType && (
        <p id="spec-list-p">Click on a collection to populate the data</p>
      )}

      {specList && (
        <>
          <Spec specData={[]} fields={fields} labelOnly={true} />

          {specList.map((spec) => (
            <Spec
              collectionType={collectionType}
              specData={spec[1]}
              fields={fields}
              reload={reload}
              setReload={setReload}
              labelOnly={false}
              key={spec[0]}
            />
          ))}
          {collectionType !== "shopping_cart" && (
            <Spec
              collectionType={collectionType}
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
