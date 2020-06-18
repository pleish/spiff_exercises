import React       from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
}                  from "react-router-dom"
import Parser      from "../parser/Parser"
import ProgressBar from "../progress_bar/ProgressBar"

import "./App.scss"

function App() {
  return (
    <Router>
      <div className="App">
        <div className="layout-container">
          <div className="exercise-index">
            <h2 className="title">Exercises</h2>

            <ul className="exercise-links">
              <li><NavLink exact={true} to="/progress_bar">Progress Bar</NavLink></li>
              <li><NavLink exact={true} to="/parser">Parser</NavLink></li>
            </ul>
          </div>

          <div className="exercise-show">
            <Switch>
              <Route path="/progress_bar">
                <ProgressBar />
              </Route>
              <Route path="/parser">
                <Parser />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
