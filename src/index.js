import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// apollo-client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// setup client connecting the server
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
