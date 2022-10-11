import React, { useState, useEffect, useCallback } from "react";
import SpecList from "./SpecList";

function Collections() {
  const [specType, setSpecType] = useState();

  return (
    <>
      <div>
        <div onClick={() => setSpecType("user")}>Users</div>
        <div onClick={() => setSpecType("customer")}>Customers</div>
        <div onClick={() => setSpecType("order")}>Orders</div>
        <div onClick={() => setSpecType("shopping_cart")}>Shopping Carts</div>
      </div>
      <br />

      <SpecList specType={specType} />
    </>
  );
}

export default Collections;
