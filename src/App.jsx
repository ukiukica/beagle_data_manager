import React from "react";
import Collections from "./Collections";

import "./stylesheets/App.css";
import "./stylesheets/global.css";

function App() {
  return (
    <div>
      <h1 id="title">Beagle Data Manager</h1>
      <Collections />
    </div>
  );
}

export default App;
