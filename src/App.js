import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import right from './audio/right.mp3';
import wrong from './audio/wrong.mp3'


function getAdditionProblems() {
  const rv = [];
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
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

function RightAudios({count}) {
  const [ times, setTimes ] = useState(count);
  return <audio onEnded={(e) => {
    if (times > 1) {
      e.target.play();
      setTimes(times - 1);
    }
  }} autoplay="true" src={ right } /> 
}

function RightAudio() {
  return <audio autoplay="true" src={ right } />
}
function WrongAudio() {
  return <audio autoplay="true" src={ wrong } />
}

function App() {
  const [ streak, setStreak ] = useState(0);
  const problems = getAdditionProblems();
  const [ problem, setProblem ] = useState(getRandomProblem(problems));
  const [ answered, setAnswered ] = useState(false);
  const [ userSolution, setUserSolution ] = useState(null);

  const correctAnswer = (answered && userSolution == problem.solution);
  const incorrectAnswer = (answered && userSolution != problem.solution)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        { streak > 0 &&
          <p>
            Streak: {streak} {"✅".repeat(streak)}
          </p>
        }
        <p style={{ fontSize: '40px'}}>
          {problem.problem} = 
          { !answered &&
          <form style={{ display: 'inline' }} onSubmit={() => {
            setAnswered(true);
            if (userSolution == problem.solution) setStreak(streak + 1);
            else setStreak(0);
          }}>
            <span> </span><input autoFocus type="text" size={2} style={{ fontSize: '40px'}} onInput={e => setUserSolution(e.target.value)}/>
          </form>
          }
          { answered && <span> {userSolution}</span>}
          { correctAnswer && <span> ✅<RightAudios count={ streak } /></span>}
          { incorrectAnswer && <span> ❌<WrongAudio /></span>}

          { incorrectAnswer && (
            <span>
              <button style={{ marginLeft: '20px' }} onClick={() => setAnswered(false)}>Try Again</button>
            </span>
        )}

        { correctAnswer && (
          <button style={{ marginLeft: '20px' }} onClick={() => {
            setProblem(getRandomProblem(problems));
            setAnswered(false);
            setUserSolution(null);
          }}>Next</button>
        )}

        </p>
        { incorrectAnswer &&
        <p>
        The answer was {problem.solution}
        </p>
        }

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
