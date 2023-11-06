import "../src/style.css";
import React from "react";
import Select from "./components/Select";
import Table from "./module/products/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 40 }}>
        <br />
        {/* <Select /> */}
        <Table />
      </div>
    </QueryClientProvider>
  );
};

export default App;
