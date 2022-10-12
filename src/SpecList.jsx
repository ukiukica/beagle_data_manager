import React, { useState, useEffect } from "react";
import { getSpecList } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  // console.log("specList", specList)

  useEffect(() => {
    if (specType && reload) {
      async function fetchData() {
        const list = await getSpecList(specType);
        setSpecList(list);
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
              setReload={setReload}
              labelOnly={false}
              key={spec[0]}
            />
          ))}
          <Spec
            specType={specType}
            specData={[]}
            setReload={setReload}
            labelOnly={false}
          />
        </>
      )}
    </>
  );
}

export default SpecList;
