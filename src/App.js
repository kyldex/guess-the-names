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

function RestartButton() {
  return (
    <button type="button">Restart</button>
  )
}

function Name(props) {
  return (
    <div className="name">
      <p>{props.computedDisplay}</p>
    </div>
  );
}

function Keyboard(props) {
  return (
    <div className="keyboard">
      {props.gameIsOver ? (
        <RestartButton />
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
      gameIsOver: false
    };
  }

  getRandomName(namesToFind) {
    const lastIndex = namesToFind.length - 1;
    const randomIndex = Math.floor(Math.random() * lastIndex);
  
    return namesToFind[randomIndex];
  }

  // Returns the string with hidden letters
  computeDisplay(nameToFind, usedLetters) {
    return nameToFind.replace(/\w/g, (letter) => (usedLetters.has(letter) ? letter : '_'));
  }

  handleLetterClick(letter) {
    this.setState({ usedLetters: this.state.usedLetters.add(letter) });
    this.setState({ computedDisplay: this.computeDisplay(this.state.nameToFind, this.state.usedLetters)});
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
        <Name computedDisplay={this.state.computedDisplay}/>
        <Keyboard
          gameIsOver={this.state.gameIsOver}
          onClick={(letter) => this.handleLetterClick(letter)}
        />
      </div>
    );
  }
}
