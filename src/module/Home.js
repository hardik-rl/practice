import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Link to={"/product"}>Product &gt;</Link> <br />
        <br />
        <Link to={"/users"}>Users &gt;</Link>
      </div>
    </>
  );
};

export default Home;
