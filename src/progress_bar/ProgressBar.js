import React from "react";
import Exercise from "../exercise/Exercise";
import colors from "../shared_styles/colors.scss";
import PropTypes from "prop-types";

const ProgressBarPage = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarPage;

// ----------------------------------------------------------------------------------

export class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentHidden: 100,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percentage !== this.props.percentage) {
      this.updatePercentHidden();
    }
  }

  updatePercentHidden() {
    if (this.props.breakpoints) {
      const breakpoint = this.props.breakpoints
        .sort((a, b) => a - b)
        .find((bp) => bp >= this.props.percentage);
      this.setState({ percentHidden: 100 - breakpoint });
    } else {
      this.setState({ percentHidden: 100 - this.props.percentage });
    }
  }

  render() {
    return (
      <div className="progress-bar" style={{ opacity: this.props.barOpacity }}>
        <div
          className="progress-cover"
          style={{
            width: `${this.state.percentHidden}%`,
          }}
        ></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  barOpacity: PropTypes.number.isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.number),
};

export class RequestBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class: "request-btn normal",
    };
  }

  render() {
    return (
      <button
        className={this.state.class}
        style={{
          color: this.props.color,
          borderColor: this.props.color,
        }}
        onMouseEnter={() => this.setState({ class: "request-btn hovered" })}
        onMouseLeave={() => this.setState({ class: "request-btn normal" })}
        onMouseDown={() => this.setState({ class: "request-btn clicked" })}
        onMouseUp={() => this.setState({ class: "request-btn hovered" })}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

RequestBtn.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      blockLoad: false,
      time: 0,
      start: 0,
      barOpacity: 1.0,
      timerOn: false,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      timerOn: true,
      start: Date.now(),
      barOpacity: 1,
      percentage: 0,
    });
    this.timer = setInterval(() => {
      if (this.state.time <= 15000) {
        this.setState({
          time: Date.now() - this.state.start,
          percentage: ((Date.now() - this.state.start) / 10 / 15) * 0.9,
        });
      } else {
        clearInterval(this.timer);
      }
    }, 100);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      timerOn: false,
      start: Date.now(),
      percentage: 100,
    });
    this.timer = setInterval(() => {
      if (this.state.time <= 3000) {
        this.setState({
          barOpacity: this.state.barOpacity - 0.034,
          time: Date.now() - this.state.start,
        });
      } else {
        this.resetTimer();
      }
    }, 100);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({ percentage: 0 });
  }

  toggleLoadStyle() {
    this.setState({
      blockLoad: !this.state.blockLoad,
    });
  }

  render() {
    return (
      <div>
        <ProgressBar
          breakpoints={this.state.blockLoad ? [10, 50, 80, 90] : null}
          percentage={this.state.percentage}
          barOpacity={this.state.barOpacity}
        ></ProgressBar>
        <div className="request-btn-row">
          <RequestBtn
            color={colors.green}
            onClick={this.state.timerOn ? () => {} : this.startTimer}
          >
            {this.state.timerOn ? "Loading..." : "Start Request"}
          </RequestBtn>
          <div className="percent-switch">
            <input
              type="checkbox"
              value={this.state.blockLoad}
              onChange={() => this.toggleLoadStyle()}
            ></input>
            <span>Block Load</span>
          </div>
          <RequestBtn color={colors.red} onClick={this.stopTimer}>
            FINISH REQUEST
          </RequestBtn>
        </div>
      </div>
    );
  }
}
