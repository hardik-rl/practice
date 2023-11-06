import React, { useState } from "react";

const Select = () => {
  const country_list = {
    countries: [
      {
        name: "United States",
        cities: ["New York", "Los Angeles", "Chicago"],
      },
      {
        name: "United Kingdom",
        cities: ["London", "Manchester", "Birmingham"],
      },
      {
        name: "France",
        cities: ["Paris", "Marseille", "Lyon"],
      },
    ],
  };

  const [country, setCountry] = useState(country_list.countries[0].name);
  const handleOnChange = (e) => {
    setCountry(e.target.value);
  };

  const filterValue = () => {
    let foodNames = country_list.countries.filter((names) => {
      return names.name === country;
    });
    return foodNames;
  };

  return (
    <div className="d-flex">
      <div>
        <h3 style={{marginBottom: 10}}>Select Country</h3>
        <select onChange={(e) => handleOnChange(e)} style={{ padding: 6 }}>
          {country_list.countries.map((item, i) => (
            <option key={i}>{item.name}</option>
          ))}
        </select>
      </div>
      <div style={{marginLeft: 20 }}>
        <h5 style={{marginBottom: 10}}>Country's Cities</h5>
        <select style={{ padding: 6}}>
          {filterValue()[0].cities.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
