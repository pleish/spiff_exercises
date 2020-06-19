import React    from "react"
import Exercise from "../exercise/Exercise"

const Parser = () => {
  return (
    <div className="parser">
      <Exercise
        solution = {<Solution />}
        specsUrl = "https://github.com/CommissionAI/spiff_react_exercises/issues/2"
        title    = "Parser Exercise"
      />
    </div>
  )
}

export default Parser

// ----------------------------------------------------------------------------------

const Solution = () => {
  return (
    <div>Add solution here</div>
  )
}
