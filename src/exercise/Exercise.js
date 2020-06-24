import React from "react"
import PropTypes from "prop-types";

const Exercise = ({ solution, specsUrl, title }) => {
  return (
    <div className="exercise">
      <h2>{title}</h2>
      <div className="specs-url block">
        <h4>Specs</h4>
        <a href={specsUrl}>{specsUrl}</a>
      </div>

      <div className="solution block">
        <h4>Solution</h4>
        <div className="solution-workspace">
          {solution}
        </div>
      </div>
    </div>
  )
}

export default Exercise

export class ExerciseBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class: "exercise-btn normal",
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
        onMouseEnter={() => this.setState({ class: "exercise-btn hovered" })}
        onMouseLeave={() => this.setState({ class: "exercise-btn normal" })}
        onMouseDown={() => this.setState({ class: "exercise-btn clicked" })}
        onMouseUp={() => this.setState({ class: "exercise-btn hovered" })}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

ExerciseBtn.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
};
