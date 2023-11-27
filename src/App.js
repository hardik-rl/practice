import "../src/css/global.css";
import React from "react";
import Home from "./module/Home";
import Table from "./module/products/Table";
import UsersTable from "./module/users/Table";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
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
