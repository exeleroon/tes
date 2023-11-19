import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import TableGrid from "./table/TableGrid";

const queryClient = new QueryClient();

function App() {


  return (
      <QueryClientProvider client={queryClient}>
        <TableGrid />
      </QueryClientProvider>
  );
}

export default App;
