import React, { useState, useEffect } from "react";
import { getSpecList } from "./firebase";
import Spec from "./Spec";

function SpecList({ specType }) {
  const [specList, setSpecList] = useState();
  const [reload, setReload] = useState(true);

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
          {/* <div id="list-header">
            <h4 id="name-input">Name</h4>
            <h4 id="email-input">Email</h4>
            <h4 id="pass-input">Password</h4>
            <h4 id="verif-select">Verified Email</h4>
            <h4 id="phone-input">Phone Number</h4>
            <h4 id="login-input">Last Login</h4>
            <h4 id="role-select">Role</h4>
            <h4 id="auth-select">Auth Provider</h4>
            <h4 id="create-input">Created At</h4>
            <h4 id="update-input">Updated At</h4>
          </div> */}

          <Spec labelOnly={true} />

          {specList.map((spec) => (
            <Spec
              specType={specType}
              specData={spec[1]}
              setReload={setReload}
              labelOnly={false}
              key={spec[0]}
            />
          ))}
          <Spec specType={specType} setReload={setReload} labelOnly={false} />
        </>
      )}
    </>
  );
}

export default SpecList;
