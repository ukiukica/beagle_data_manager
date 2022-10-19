import React, { useEffect, useState } from "react";
import { getCollections } from "./firebase";

import SpecList from "./SpecList";
import { formatSpec } from "./utilities";

function Collections() {
  const [collections, setCollections] = useState();
  const [collectionType, setCollectionType] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedCollections = await getCollections();
      setCollections(fetchedCollections);
    }

    fetchData();
  }, []);

  return (
    <>
      <div id="collections">
        {collections &&
          collections.map((collection) => (
            <div
              key={collection}
              className={
                collection === collectionType ? "collection-selected" : "collection"
              }
              onClick={() => setCollectionType(collection)}
            >
              {formatSpec(collection)}
            </div>
          ))}
      </div>

      <div id="spec-list">
        <SpecList collectionType={collectionType} />
      </div>
    </>
  );
}

export default Collections;
