import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import Launches from "./components/Launches";
import gql from "graphql-tag";
import "./App.css";
import logo from "./logo.png";

const cache = new InMemoryCache();

const defaultState = {
  currentGame: {
    __typename: "currentGame",
    teamAScore: 0,
    teamBScore: 0,
    teamAName: "Team A",
    teamBName: "Team B"
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateGame: (_, { index, value }, { cache }) => {
        const query = gql`
          query GetCurrentGame {
            currentGame @client {
              __typename
              teamAScore
              teamBScore
              teamAName
              teamBName
            }
          }
        `;
        const previousState = cache.readQuery({ query });

        const data = {
          ...previousState,
          currentGame: {
            ...previousState.currentGame,
            [index]: value
          }
        };

        console.log('DATA', data)

        cache.writeData({query, data})
        return data
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
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
