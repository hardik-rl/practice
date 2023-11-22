import React from "react";

const Spinner = ({clasName}) => {
  return <div className={`loader + ${clasName}`}>
    <p></p>
  </div>;
};

export default Spinner;