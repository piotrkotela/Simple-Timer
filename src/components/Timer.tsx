import { useState, useEffect } from "react";
import formatTime from "../helpers/formatTime";


interface TimerProps {
  setTimes: Function
}

const Timer = ({setTimes}: TimerProps) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined

    if (timerStarted) {
      setTimerValue(0)
      intervalId = setInterval(() => {
        setTimerValue((prevValue) => prevValue + 10);
      }, 10);
    }

    if (!timerStarted && timerValue > 0) {
      setTimes((prevTimes: any) => [...prevTimes, formatTime(timerValue)]);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStarted]);

  const handleKeyUp = () => {
    setTimerStarted((prevState) => !prevState)
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>

      <h1>{formatTime(timerValue)}</h1>
    </>
  );
};

export default Timer;
