import "../src/style.css";
import React from "react";
import Table from "./module/products/Table";
import UsersTable from "./module/users/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Home from "./module/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 40 }}>
        <br />
        {/* <Select /> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product" element={<Table />} />
          <Route path="/users" element={<UsersTable />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
