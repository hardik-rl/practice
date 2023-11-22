import "../src/style.css";
import React from "react";
import Table from "./module/products/Table";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 40 }}>
        <Table />
      </div>
    </QueryClientProvider>
  );
};

export default App;
