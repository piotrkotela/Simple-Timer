import { useState, useEffect } from "react";
import formatTime from "../helpers/formatTime";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import css from './Timer.module.css';

interface TimerProps {
  setTimes: Function;
  currentAo5?: string;
  currentAo12?: string;
}

const Timer = ({ setTimes, currentAo5, currentAo12 }: TimerProps) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    if (timerStarted) {
      setTimerValue(0);
      intervalId = setInterval(() => {
        setTimerValue((prevValue) => prevValue + 10);
      }, 10);
    }

    if (!timerStarted && timerValue > 0) {
      setTimes((prevTimes: any) => [formatTime(timerValue), ...prevTimes]);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStarted]);

  const handleKeyUp = () => {
    setTimerStarted((prevState) => !prevState);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Card className={css.timerCard}>
      <Typography variant="h1" component="h2">
        {formatTime(timerValue)}
      </Typography>
      <Typography variant="h4" component="h2">
        {currentAo5 ? `ao5: ${currentAo5}` : "ao5: -"}
      </Typography>
      <Typography variant="h4" component="h2">
      {currentAo12 ? `ao12: ${currentAo12}` : "ao12: -"}
      </Typography>
    </Card>
  );
};

export default Timer;
