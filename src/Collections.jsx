import React, { useState } from "react";
import SpecList from "./SpecList";

function Collections() {
  const [specType, setSpecType] = useState("user");

  return (
    <>
      <div id="collections">
        <div onClick={() => setSpecType("user")}>Users</div>
        <div onClick={() => setSpecType("customer")}>Customers</div>
        <div onClick={() => setSpecType("order")}>Orders</div>
        <div onClick={() => setSpecType("shopping_cart")}>Shopping Carts</div>
      </div>
      <br />

      <div id="spec-list">
        <SpecList specType={specType} />
      </div>
    </>
  );
}

export default Collections;
