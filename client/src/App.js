import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import Launches from "./components/Launches";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./App.css";
import logo from "./logo.png";
import stateLink from './stateLink'

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink(cache),
    new HttpLink({
      uri: "https://core-graphql.dev.waldo.photos/pizza"
    })
  ]),
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Launches />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
