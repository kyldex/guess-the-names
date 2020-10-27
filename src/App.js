import React from 'react';
import './App.css';

const NAMES_TO_FIND = [
  'DAVID BOWIE',
  'DEPECHE MODE',
  'HERBIE HANCOCK',
  'IGGY POP',
  'LED ZEPPELIN',
  'MILES DAVIS',
  'NINE INCH NAILS',
  'PRINCE',
  'RADIOHEAD',
  'SERGE GAINSBOURG',
  'THE CURE',
  'THE WHO'
];

function RemainingAttempts(props) {
  return (
    <p>{`Remaining attempts : ${props.remainingAttempts}`}</p>
  );
}

function Name(props) {
  return (
    <div className="name">
      <p>{props.computedDisplay}</p>
    </div>
  );
}

function RestartButton(props) {
  return (
    <button
      type="button"
      className="restart-button"
      onClick={() => props.onClick('restart')}
    >
      Restart
    </button>
  );
}

function GameRestart(props) {
  return(
    <>
      {props.gameIsOver === "won" ? (
        <div className="game-restart">
          <p>
            Well Done! 👏<br/>
            Why not trying to find another one?
          </p>
          <RestartButton onClick={(restart) => props.onClick(restart)} />
        </div>
      ) : (
        <div className="game-restart">
          <p>
            Not this time...<br/>
            Why not trying to find another one?
          </p>
          <RestartButton onClick={(restart) => props.onClick(restart)} />
        </div>
      )}
    </>
  );
}

function KeyboardLetter(props) {
  return (
    <button
      type="button"
      className="letter-button"
      onClick={() => props.onClick()}
    >
      {props.letter}
    </button>
  );
}

function Keyboard(props) {
  return (
    <div className="keyboard">
      {props.gameIsOver ? (
        <GameRestart
          gameIsOver={props.gameIsOver}
          onClick={(restart) => props.onClick(restart)}
        />
      ) : (
        <div className="keyboard-inner">
          <div className="keyboard-row">
            {['A', 'B', 'C'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
          <div className="keyboard-row">
            {['D', 'E', 'F', 'G', 'H'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
          <div className="keyboard-row">
            {['I', 'J', 'K', 'L', 'M'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
          <div className="keyboard-row">
            {['N', 'O', 'P', 'Q', 'R'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
          <div className="keyboard-row">
            {['S', 'T', 'U', 'V', 'W'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
          <div className="keyboard-row">
            {['X', 'Y', 'Z'].map((letter) => {
              return (
                <KeyboardLetter
                  key={letter}
                  letter={letter}
                  onClick={() => props.onClick(letter)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameToFind: '',
      usedLetters: new Set(),
      computedDisplay: '',
      remainingAttempts: 15,
      gameIsOver: null
    };
  }

  getRandomName(namesToFind) {
    const lastIndex = namesToFind.length - 1;
    const randomIndex = Math.floor(Math.random() * lastIndex);
  
    return namesToFind[randomIndex];
  }

  // Returns the string with hidden letters
  computeDisplay(nameToFind, usedLetters) {
    return nameToFind.replace(/\w/g, (currentLetter) => (usedLetters.has(currentLetter) ? currentLetter : '_'));
  }

  handleClick(letter) {

    if (letter === 'restart') {

      this.setState(() => (
        {
          nameToFind: '',
          usedLetters: new Set(),
          computedDisplay: '',
          remainingAttempts: 15,
          gameIsOver: null
        }
      ));
      this.setState(() => (
        { nameToFind: this.getRandomName(NAMES_TO_FIND) }
      ));
      this.setState((prevState) => (
        { computedDisplay: this.computeDisplay(prevState.nameToFind, prevState.usedLetters) }
      ));

    } else if (!this.state.nameToFind.includes(letter)) {

      if (this.state.usedLetters.has(letter)) {
        return;

      } else {
        this.setState((prevState) => (
          { 
            usedLetters: prevState.usedLetters.add(letter),
            remainingAttempts: prevState.remainingAttempts - 1
          }
        ));
        this.setState((prevState) => {
          // Player has lost the game
          if (prevState.remainingAttempts === 0) {
            return { gameIsOver: 'lost' };
          }
        });
      }

    } else {

      if (this.state.usedLetters.has(letter)) {
        return;

      } else {
        this.setState((prevState) => (
          { usedLetters: prevState.usedLetters.add(letter) }
        ));
        this.setState((prevState) => (
          { computedDisplay: this.computeDisplay(this.state.nameToFind, prevState.usedLetters) }
        ));
        this.setState((prevState) => {
          // Player has won the game
          if (prevState.computedDisplay === prevState.nameToFind) {
            return { gameIsOver: 'won' };
          }
        });
      }
    }
  }

  componentWillMount() {
    this.setState(() => (
      { nameToFind: this.getRandomName(NAMES_TO_FIND) }
    ));
    this.setState((prevState) => (
      { computedDisplay: this.computeDisplay(prevState.nameToFind, prevState.usedLetters) }
    ));
  }

  render() {
    return (
      <div className="app">
        <div>
          <h1>Guess The Names</h1>
          <div className="description">Find the name of the musical artist or the name of the band 🎸</div>
        </div>
        <Name computedDisplay={this.state.computedDisplay}/>
        <div className="remaining-attempts">
          <RemainingAttempts remainingAttempts={this.state.remainingAttempts}/>
        </div>
        <Keyboard
          gameIsOver={this.state.gameIsOver}
          onClick={(letter) => this.handleClick(letter)}
        />
      </div>
    );
  }
}
