import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import css from "./Timer.module.css";
import { averageOfLastNums, formatTime } from "../helpers/HelperFunctions";

interface TimerProps {
  setTimes: React.Dispatch<React.SetStateAction<number[]>>;
  times: number[];
}

const Timer = ({ setTimes, times }: TimerProps) => {
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
      setTimes((prevTimes: number[]) => [...prevTimes, +formatTime(timerValue)]);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStarted, setTimes]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === " ") {
      setTimerStarted((prevState) => !prevState);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const currentAo5 = averageOfLastNums(times, 5, times.length - 5);
  const currentAo12 = averageOfLastNums(times, 12, times.length - 12);
  const bestTime = times.length > 0 ? Math.min(...times) : "-";
  const currentSessionAo =
    times.length > 0 ? averageOfLastNums(times, times.length, 0) : "-";

  return (
    <Card className={css.timerCard}>
      <Typography variant="h1" component="h2">
        {formatTime(timerValue)}
      </Typography>
      <Typography variant="h5" component="h2">
        {`ao5: ${currentAo5}`}
      </Typography>
      <Typography variant="h5" component="h2">
        {`ao12: ${currentAo12}`}
      </Typography>
      <br />
      <Typography variant="h5" component="h2">
        {`best:  ${bestTime}`}
      </Typography>
      <Typography variant="h5" component="h2">
        {`session ao: ${currentSessionAo}`}
      </Typography>
    </Card>
  );
};

export default Timer;
