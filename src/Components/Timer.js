import Card from "./UI/Card.js";
import classes from "./Timer.module.css";
import { useState, useEffect, useCallback } from "react";
import ScrambleGen3 from "../Algo/ScrambleGen3";
import ScrambleGen2 from "../Algo/ScrambleGen2";
import msecToTime from "../Algo/MsecToTime.js";

const Timer = (props) => {
  const [timer, setTimer] = useState();
  const [time, setTime] = useState(0);
  const [scramble, setScramble] = useState(ScrambleGen3());
  const [spaceTrigger, setSpaceTrigger] = useState(-1);

// setting up the timer functions i.e starting timer, saving times to LocalStorage
  const setTimeHandler = () => {
    setTime((time) => {
      return time + 10;
    });
  };

  const startTimerHandler = useCallback(() => {
    let time = setInterval(setTimeHandler, 10);
    setTimer(time);
  }, []);

  const addTimeFunct = props.addTime;

  const stopTimerHandler = () => {
    clearInterval(timer);
    if (time > 0) {
      addTimeFunct(time);
    }
  };

// handling mode change and restarting the timer
  const mode = props.mode;
  const restartTimerHandler = useCallback(() => {
    setTime(0);
    setSpaceTrigger(-1);
    switch (mode) {
      case "3x3x3":
        setScramble(ScrambleGen3());
        break;
      case "2x2x2":
        setScramble(ScrambleGen2());
        break;
      default:
        break;
    }
  }, [mode]);

  useEffect(() => {
    restartTimerHandler();
    switch (props.mode) {
      case "3x3x3":
        setScramble(ScrambleGen3());
        break;
      case "2x2x2":
        setScramble(ScrambleGen2());
        break;
      default:
        break;
    }
  }, [props.mode, restartTimerHandler]);

// introducing the loop that controls the Timer
  useEffect(() => {
    window.addEventListener("keyup", (event) => {
      if (event.key === " ") {
        setSpaceTrigger((count) => {
          return count + 1;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (spaceTrigger % 3 === 0) {
      startTimerHandler();
    }
    if (spaceTrigger % 3 === 1) {
      stopTimerHandler();
    }
    if (spaceTrigger % 3 === 2) {
      restartTimerHandler();
    }
  }, [spaceTrigger, startTimerHandler, restartTimerHandler]);

  return (
    <Card className={classes.timer}>
      <p className={classes.timerMain}>
        {time > 0 ? (
          <p style={{ fontSize: "50px" }}>{msecToTime(time)}</p>
        ) : (
          <p style={{ fontSize: "30px" }}>click spacebar start</p>
        )}
      </p>
      <div className={classes.buttons}></div>
      <div className={classes.scramble}>
        <p>{scramble}</p>
      </div>
    </Card>
  );
};

export default Timer;
