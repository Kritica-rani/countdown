import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [time, setTime] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
  });
  const [intervalId, setIntervalId] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const updateTime = () => {
    console.log("I am being called");
    setTime((prevState) => {
      let newSecs = prevState.secs + 1;
      let newMins = prevState.mins;
      let newHrs = prevState.hrs;
      if (newSecs >= 60) {
        newSecs = 0;
        newMins++;
      }
      if (newMins >= 60) {
        newMins = 0;
        newHrs++;
      }
      return {
        mins: newMins,
        secs: newSecs,
        hrs: newHrs,
      };
    });
  };
  const handleStart = () => {
    const id = setInterval(updateTime, 1000);
    setIntervalId(id);
    setHasStarted(true);
  };
  const handlePause = () => {
    clearInterval(intervalId);
    setHasStarted(false);
  };
  return (
    <div className="App">
      <div>{time.hrs}</div>
      <div>{time.mins}</div>
      <div>{time.secs}</div>
      {hasStarted ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}

      <button
        onClick={() => {
          clearInterval(intervalId);
          setTime({ hrs: 0, mins: 0, secs: 0 });
          setHasStarted(false);
        }}
      >
        Stop
      </button>
    </div>
  );
}

export default App;
