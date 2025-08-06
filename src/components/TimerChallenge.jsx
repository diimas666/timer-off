import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [showResult, setShowResult] = useState(false);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleStart() {
    setShowResult(false);
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 10) {
          clearInterval(timer.current);
          setShowResult(true); // показать модалку при окончании времени
          return 0;
        }
        return prevTimeRemaining - 10;
      });
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    setShowResult(true);
  }

  return (
    <>
      {showResult && (
        <ResultModal
          targetTime={targetTime}
          result={timeRemaining <= 0 ? 'lost' : 'won'}
          remainingTime={(timeRemaining / 1000).toFixed(2)}
        />
      )}

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : ''}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
