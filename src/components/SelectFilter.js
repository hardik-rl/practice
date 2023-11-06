import React from "react";

const SelectFilter = ({ column }) => {
  const { filters } = column.columnDef.meta;
  const columnFilterValue = column.getFilterValue();

  const handleSelectChange = (e) => {
    let selectedValue = e.target.value;
    column.setFilterValue(selectedValue);
    if (selectedValue === "select") {
      column.setFilterValue("");
    }
  };

  return (
    <>
      <select onChange={handleSelectChange} value={columnFilterValue}>
        {filters.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectFilter;
