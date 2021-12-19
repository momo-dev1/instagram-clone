import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { AuthProvider } from "auth/auth";

const wsLink = new WebSocketLink({
  uri: "ws://momo-instagram-clone.herokuapp.com/v1/graphql",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
