import React from "react";
import Exercise from "../exercise/Exercise";
import colors from "../shared_styles/colors.scss";

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

class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progress-bar" style={{ opacity: this.props.barOpacity }}>
        <div
          className="progress-cover"
          style={{
            width: `${100 - this.props.percentage}%`,
          }}
        ></div>
      </div>
    );
  }
}

class RequestBtn extends React.Component {
  setBorderWidth = (event, width) => {
    event.target.style.borderWidth = width;
  };

  render() {
    return (
      <button
        className="request-btn"
        style={{
          color: this.props.color,
          borderColor: this.props.color,
        }}
        onMouseEnter={(e) => this.setBorderWidth(e, "2px")}
        onMouseLeave={(e) => this.setBorderWidth(e, "1px")}
        onMouseDown={(e) => this.setBorderWidth(e, "3px")}
        onMouseUp={(e) => this.setBorderWidth(e, "2px")}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      blockLoad: false,
      time: 0,
      start: 0,
      timeInterval: 100,
      barOpacity: 1.0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      start: Date.now(),
      barOpacity: 1,
      percentage: this.state.blockLoad ? 10 : 0
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
    }, this.state.timeInterval);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({ time: 0, start: Date.now(), percentage: 100});
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
    clearInterval(this.timer)
    this.setState({ time: 0, percentage: 0 });
  }

  toggleLoadStyle() {
    this.setState({
      blockLoad: !this.state.blockLoad,
    });
    if (this.state.blockLoad) {
      this.setState({
        timeInterval: 100,
      });
    } else {
      this.setState({
        timeInterval: 0.25 * 15000,
      });
    }
  }

  render() {
    return (
      <div>
        <ProgressBar
          percentage={this.state.percentage}
          barOpacity={this.state.barOpacity}
        ></ProgressBar>
        <div className="request-btn-row">
          <RequestBtn color={colors.green} onClick={this.startTimer}>
            START REQUEST
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
