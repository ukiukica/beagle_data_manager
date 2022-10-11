import React, { useState, useEffect, useCallback } from "react";
import { createSpec, getSpecList, getSpec, updateSpec } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);
  // console.log("specList", specList);

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
          {/* <table>
            <thead> */}
              {/* <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Verified Email</th>
                <th>Phone Number</th>
                <th>Last Login</th>
                <th>Role</th>
                <th>Auth Provider</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr> */}
            {/* </thead>
            </table> */}
              {specList.map((spec) => (
                      <Spec
                        specType={specType}
                        specData={spec[1]}
                        setReload={setReload}
                        key={spec[0]}
                      />
              ))}
              <Spec specType={specType} setReload={setReload} />

        </>
      )}
    </>
  );
}

export default SpecList;
