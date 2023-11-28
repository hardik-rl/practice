import React from "react";
import SelectFilter from "./SelectFilter";

const Filter = ({ table, column }) => {
  const { type } = column.columnDef.meta || {};
  const columnFilterValue = column.getFilterValue();

  if (!type) {
    return null;
  }

  if (type === "select") {
    return <SelectFilter column={column} />;
  }

  return (
    <div>
      <input
        value={columnFilterValue ?? ""}
        placeholder="Search"
        className="form-control max-w-[153px]"
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  );
};

export default Filter;
