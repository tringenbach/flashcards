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
      <Route path="/:subpage">
        <div style={{ position: 'absolute', backgroundColor: 'white', padding: '8px'}}>
          <Link to="/">Home</Link>
        </div>
      </Route>

      <Switch>
        <Route exact path="/">
          <ul>
            <li><Link to="/addition">Addition ➕</Link></li>
            <li><Link to="/subtraction">Subtraction ➖</Link></li>
            <li><Link to="/sight-words-pk">Sight Words Pre-K</Link></li>
            <li><Link to="/sight-words-k">Sight Words K</Link></li>
            <li><Link to="/sight-words-1">Sight Words 1</Link></li>
            <li><Link to="/sight-words-2">Sight Words 2</Link></li>
            <li><Link to="/sight-words-3">Sight Words 3</Link></li>
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
        <Route path="/sight-words-k" >
          <SightWords level="k" />
        </Route>
        <Route path="/sight-words-1" >
          <SightWords level="1" />
        </Route>
        <Route path="/sight-words-2" >
          <SightWords level="2" />
        </Route>
        <Route path="/sight-words-3" >
          <SightWords level="3" />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
