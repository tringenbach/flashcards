import './App.css';
import MathProblem from "./MathProblem";
import SightWords from "./SightWords";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ul>
            <li><Link to="/addition">Addition ➕</Link></li>
            <li><Link to="/subtraction">Subtraction ➖</Link></li>
            <li><Link to="/sight-words-pk">Sight Words Pre-K</Link></li>

          </ul>
        </Route>
        <Route path="/addition">
          <MathProblem mode="addition" />
        </Route>
        <Route path="/subtraction">
          <MathProblem mode="subtraction" />
        </Route>
        <Route path="/sight-words-pk" >
          <SightWords level="pk" />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
