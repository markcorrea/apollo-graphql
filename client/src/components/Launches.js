import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import { graphql, compose } from "react-apollo";
import getCurrentGame from "./getCurrentGame";
import updateGame from "./updateGame";

const PIZZA_SIZES_QUERY = gql`
  query PizzaSizesQuery {
    pizzaSizes {
      name
      basePrice
      maxToppings
      toppings {
        topping {
          name
        }
        defaultSelected
      }
    }
  }
`;

class Launches extends Component {
  render() {
    const {
      updateGame,
      currentGame: { teamAScore, teamBScore, teamAName, teamBName }
    } = this.props;
    return (
      <Fragment>
        <h1 className="display-4 my-3"> Launches</h1>
        <ul>
          <li>teamAScore: {teamAScore}</li>
          <li>teamBScore: {teamBScore}</li>
          <li>teamAName: {teamAName}</li>
          <li>teamBName: {teamBName}</li>
        </ul>
        <button
          onClick={() =>
            updateGame({
              variables: {
                index: "teamAScore",
                value: parseInt(teamAScore) + 1
              }
            })
          }
        >
          Add to Team A
        </button>
        <button
          onClick={() =>
            updateGame({
              variables: {
                index: "teamBScore",
                value: parseInt(teamBScore) + 1
              }
            })
          }
        >
          Add to Team B
        </button>
        <Query query={PIZZA_SIZES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            return (
              <Fragment>
                {data.pizzaSizes.map((size, index) => (
                  <LaunchItem key={index} size={size} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default compose(
  graphql(updateGame, { name: "updateGame" }),
  graphql(getCurrentGame, {
    props: ({ data: { currentGame } }) => ({
      currentGame
    })
  })
)(Launches);
