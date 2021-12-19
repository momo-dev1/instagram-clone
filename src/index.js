import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "auth/auth";
import { UserProvider } from "auth/userContext";

import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 className="text-3xl text-center text-red-primary">
          Something went wrong.
        </h1>
      );
    }

    return this.props.children;
  }
}

const wsLink = new WebSocketLink({
  uri: "wss://momo-instagram-clone.herokuapp.com/v1/graphql",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
