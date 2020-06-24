import React from "react";
import Exercise from "../exercise/Exercise";
import { ExerciseBtn } from "../exercise/Exercise";
import colors from "../shared_styles/colors.scss";

const Parser = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/CommissionAI/spiff_react_exercises/issues/2"
        title="Parser Exercise"
      />
    </div>
  );
};

export default Parser;

// ----------------------------------------------------------------------------------

class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: "",
      parsedText: "",
      selectedLetter: null,
      letters: {},
    };

    this.updateUserText = this.updateUserText.bind(this);
    this.parseText = this.parseText.bind(this);
    this.clearText = this.clearText.bind(this);
    this.selectLetter = this.selectLetter.bind(this);
    this.alphabet = [];
    for (let i = 0; i < 26; i++) {
      this.alphabet.push(String.fromCharCode(97 + i));
    }
  }

  componentDidMount() {
    this.setState({
      letters: this.initializeLetters(),
    });
  }

  initializeLetters() {
    const letters = {};
    this.alphabet.forEach((letter) => (letters[letter] = 0));
    return letters;
  }

  updateUserText(event) {
    this.setState({ userText: event.target.value });
  }

  parseText() {
    const tmpLetters = this.initializeLetters();
    this.state.userText.split("").forEach((char) => {
      if (/^[A-Z]$/i.test(char) && tmpLetters.hasOwnProperty(char)) {
        tmpLetters[char] += 1;
      }
    });
    this.setState({
      letters: tmpLetters,
      parsedText: this.state.userText,
    });
  }

  selectLetter(letter) {
    this.setState({
      selectedLetter: letter,
    });
  }

  clearText() {
    this.setState({
      userText: "",
      parsedText: "",
      letters: this.initializeLetters(),
      selectLetter: null,
    });
  }

  render() {
    return (
      <div className="grid-container">
        <textarea
          className="parser-text-area"
          value={this.state.userText}
          onChange={this.updateUserText}
        ></textarea>
        <ul className="letter-list">
          {Object.keys(this.state.letters).map((k) => (
            <li
              className={"letter-item"}
              key={k}
              onClick={() => this.selectLetter(k)}
            >
              {k + ": " + this.state.letters[k]}
            </li>
          ))}
        </ul>
        <p>
          {this.state.parsedText.match(/\S+\s*/g)?.map((word) => (
            <span
              className={
                word.includes(this.state.selectedLetter)
                  ? "highlighted-word"
                  : ""
              }
            >
              {word.split("").map((letter) => (
                <span
                  className={
                    letter === this.state.selectedLetter ? "char bold" : "char"
                  }
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </p>
        <ExerciseBtn color={colors.green} onClick={this.parseText}>
          PARSE
        </ExerciseBtn>
        <ExerciseBtn color={colors.red} onClick={this.clearText}>
          RESET
        </ExerciseBtn>
      </div>
    );
  }
}
