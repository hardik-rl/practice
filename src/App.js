import "../src/style.css";
import React from "react";
import Select from "./components/Select";
import Table from "./module/users/Table";

const App = () => {
  return (
    <div style={{ padding: 40 }}>
      <br />
      <Select />
      <Table />
    </div>
  );
};

export default App;
