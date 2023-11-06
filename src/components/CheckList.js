import React, { useState } from "react";

const CheckList = () => {
  const dataCheckList = [
    { name: "Item 1", id: 1 },
    { name: "Item 2", id: 2 },
    { name: "Item 3", id: 3 },
    { name: "Item 4", id: 4 },
  ];
  const [check, setCheck] = useState(false);
  const [index, setIndex] = useState(1);

  const handleCheck = (item) => {
    setIndex(item);
    if (item === index) {
      setCheck(!check);
    }
  };
  const deleteItem = (e) => {
    e.target.parentElement.remove();
  };

  return (
    <div className="check-list">
      <ul>
        {dataCheckList.map((item) => (
          <li key={item.id}>
            <input
              onChange={() => handleCheck(item.id)}
              type="checkbox"
              id={item.id}
            />
            <label htmlFor={item.id}>{item.name}</label>
            {item.id === index && check && (
              <button onClick={(e) => deleteItem(e)}>Delete Item</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
