import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import right from './audio/right.mp3';
import wrong from './audio/wrong.mp3'


function getAdditionProblems() {
  const rv = [];
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      rv.push({
        problem: `${i} + ${j}`,
        solution: i + j
      });
    }
  }
  return rv;
}

function getRandomProblem(problems) {
  const min = 0;
  const max = problems.length;
  const index = Math.floor(Math.random() * (max - min) + min); 
  return problems[index];
}

function RightAudio() {
  return <audio autoplay="true" src={ right } />
}
function WrongAudio() {
  return <audio autoplay="true" src={ wrong } />
}

function App() {
  const problems = getAdditionProblems();
  const [ problem, setProblem ] = useState(getRandomProblem(problems));
  const [ answered, setAnswered ] = useState(false);
  const [ userSolution, setUserSolution ] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p style={{ fontSize: '40px'}}>
          {problem.problem} = 
          { !answered &&
          <form onSubmit={() => setAnswered(true)}>
            <input autoFocus type="text" size={2} onInput={e => setUserSolution(e.target.value)}/>
          </form>
          }
          { answered && <span> {problem.solution}</span>}
          { (answered && userSolution == problem.solution) && <span>✅<RightAudio /></span>}
          { (answered && userSolution != problem.solution) && <span>❌<WrongAudio /></span>}


        </p>
      </header>
      <main>
        <div>
          Right ✅<audio controls src={ right } />
        </div>
        <div>
          Wrong ❌<audio controls src={ wrong } />
        </div>
        <div>
          Times up! ⏰ <audio controls src={ wrong } />
        </div>
      </main>
    </div>
  );
}

export default App;
