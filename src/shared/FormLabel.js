import React from "react";

const FormLabel = ({ name }) => {
  return (
    <label
      htmlFor="first-name"
      className="block text-sm font-medium leading-6 text-gray-900 form-label"
    >
      {name}
    </label>
  );
};

export default FormLabel;
