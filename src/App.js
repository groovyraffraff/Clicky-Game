//Main game logic

import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Header/navBar";
import GameCard from "./components/GameCard";
import cardInfo from "./cardInfo.json";

class App extends Component {
  // state with the cardInfo json array, score, top score, user message and 'shake' state
  state = {
    cardInfo,
    score: 0,
    topScore: 0,
    userMsg: "Click away! Don't click anything twice!",
    shake: false
  };

  handleIncrement = () => {
    // Use the setState method to update a component's state
    this.setState({ clicked: true });
  };

  //if you guess all cards correctly, give user a Win message and reset the game
  gameWin = () => {
    let newCardReset = this.state.cardInfo.map(card => {
      card.clicked = false;
      return card;
    });
    this.setState({
      cardInfo: [...newCardReset],
      score: 0,
      topScore: 0,
      userMsg: "You won! Click again to restart",
      shake: false
    });
  };

  //guess wrong and game ends
  //reset clicked values to false
  //reset shake value to false
  //reset score to zero
  //update top score
  //shake
  //shuffle
  gameReset = () => {
    // reset all card "clicked" properties to false
    let newCardReset = this.state.cardInfo.map(card => {
      card.clicked = false;
      return card;
    });

    // resort entire array of cards
    newCardReset.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    this.setState(
      {
        cardInfo: [...newCardReset],
        score: 0,
        topScore: this.state.topScore,
        userMsg: "Incorrect Guess. Game Over.",
        shake: true
      },
      () => {
        // see latest state changes in console
        console.log("reset", this.state);
      }
    );
  };

  //correct guesses are unpicked cards
  //state changes to true
  //shuffle
  //add to score
  //correct message
  //shake false

  increment = (isClicked, id) => {
    console.log("entering increment function ", isClicked, id);
    if (isClicked === false) {
      // update element in card array with "clicked property as true"
      let newCardInfo = this.state.cardInfo;
      newCardInfo[id].clicked = true;

      // resort entire array of cards
      newCardInfo.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      //add one point to the score
      let newScore = this.state.score + 1;

      // update react state
      // 1) sorted newCardInfo with item clicked as true
      // 2) show user message, "That's correct!"
      // 3) score with addition of 1 point
      // 4) shake set to false

      this.setState(
        {
          cardInfo: [...newCardInfo],
          userMsg: "Correct!",
          score: newScore,
          shake: false
        },
        () => {
          // see latest state changes in console
          console.log("guessed correctly", this.state);
        }
      );

      //if all cards guessed correctly, run gameWin function
      if (newScore === cardInfo.length) {
        this.gameWin();
      }

      //if user guesses correctly add one point to the score
      else if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }
    }
    //if user guesses incorrectly, run gameReset function
    else {
      this.gameReset();
    }
  };

  //still learning react - eric showed me how to do this and helped me get it working but the wrappers are still sketchy to me
  // i basically understand but its a little funky.
  render() {
    return (
      <Wrapper>
        <Nav
          userMsg={this.state.userMsg}
          score={this.state.score}
          topScore={this.state.topScore}
        />
        {this.state.cardInfo.map((cardInfo, index) => (
          <GameCard
            clicked={this.increment}
            id={index}
            key={index}
            image={cardInfo.image}
            isClicked={cardInfo.clicked}
            shake={this.state.shake}
          />
        ))}
      </Wrapper>
    );
  }
}
export default App;
