import { useState, useRef } from 'react';
import './App.css';
import right from './audio/right.mp3';
import wrong from './audio/wrong.mp3'

function randomIndex(arr) {
  const min = 0;
  const max = arr.length;
  return Math.floor(Math.random() * (max - min) + min); 
}

function shuffle(arr = []) {
  const rv = [ ...arr ];
  for (let i = 0; i < rv.length -1; i++) {
    const j = randomIndex(rv);
    const tmp = rv[i];
    rv[i] = rv[j];
    rv[j] = tmp;
  }
  return rv;
}

function getRandomProblem(words) {
  const shuffledWords = shuffle(words);
  
  return {
    solution: shuffledWords[0],
    answers: shuffle([
      shuffledWords[0],
      shuffledWords[1],
      shuffledWords[2],
      shuffledWords[3],
    ])
  };
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

function WrongAudio() {
  return <audio autoplay="true" src={ wrong } />
}

function getWords(level) {
  const words = require(`!!raw-loader!./site-words/${level}.txt`).default.split('\n');
  return words;
}

function SightWords({ level }) {
  const man = useRef();
  const woman = useRef();
  const goodNews = useRef();
  const badNews = useRef();

  const [ streak, setStreak ] = useState(0);
  const words = getWords(level);
  const [ problem, setProblem ] = useState(getRandomProblem(words));
  const [ answered, setAnswered ] = useState(false);
  const [ userSolution, setUserSolution ] = useState(null);

  const correctAnswer = (answered && userSolution == problem.solution);
  const incorrectAnswer = (answered && userSolution != problem.solution)

  return (
    <div className="App">
      <header className="App-header">
        { streak > 0 &&
          <p>
            Streak: {streak} {"✅".repeat(streak)}
          </p>
        }
        <p style={{ fontSize: '40px'}}>
          <audio autoplay="true" src={ require(`./site-words/audio/Alex/${problem.solution}.aac`).default } /> 
          { !answered &&
          <form style={{ display: 'inline' }} onSubmit={() => {
            setAnswered(true);
            if (userSolution === problem.solution) setStreak(streak + 1);
            else setStreak(0);
          }}>
            {
              problem.answers.map((answer) => <button style={{ fontSize: '40px', margin: '8px' }} onClick={(e) => {
                if (answered) {
                  e.preventDefault();
                  return;
                }
                setUserSolution(answer);
                setAnswered(true);
                if (answer === problem.solution) {
                  setStreak(streak + 1);
                } else {
                  setStreak(0);
                }
              }}>{answer}</button>)
            }
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
            setProblem(getRandomProblem(words));
            setAnswered(false);
            setUserSolution(null);
          }}>Next</button>
        )}

        </p>
        { incorrectAnswer &&
        <p>
        The answer was: <strong>{problem.solution}</strong>
        </p>
        }

        <div style={{ display: 'flex'}}>
          <button style={{ fontSize: '40px' }} onClick={() => man.current.play()}>🧔🏻</button>
          <audio ref={ man } src={ require(`./site-words/audio/Alex/${problem.solution}.aac`).default } /> 
          <button style={{ fontSize: '40px' }} onClick={() => woman.current.play()}>👩🏼</button>
          <audio ref={ woman } src={ require(`./site-words/audio/Allison/${problem.solution}.aac`).default } /> 
          <button style={{ fontSize: '40px' }} onClick={() => goodNews.current.play()}>😺</button>
          <audio ref={ goodNews} src={ require(`./site-words/audio/Good News/${problem.solution}.aac`).default } /> 
          <button style={{ fontSize: '40px' }} onClick={() => badNews.current.play()}>😿</button>
          <audio ref={ badNews} src={ require(`./site-words/audio/Bad News/${problem.solution}.aac`).default } /> 
        </div>




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

export default SightWords;
