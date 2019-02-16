
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

const defaultState = {
  currentGame: {
    __typename: "currentGame",
    teamAScore: 0,
    teamBScore: 0,
    teamAName: "Team A",
    teamBName: "Team B"
  }
};

const stateLink = (cache) => {
  return withClientState({
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
  
          cache.writeData({query, data})
          return data
        }
      }
    }
  });
}

export default stateLink