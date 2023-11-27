import React from "react";

const FormInput = ({ value, name, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    />
  );
};

export default FormInput;
