import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { Box, Card, SelectChangeEvent, Typography } from "@mui/material";
import scrambleGenerator, { MODES } from "./helpers/ScrambleGenerator.ts";
import Stats from "./components/StatsTable.js";
import TimeChart from "./components/TimeChart.js";
import {
  Session,
  initialSessions,
  loadSessionsFromLocalStorage,
  saveSessionsToLocalStorage,
} from "./helpers/SessionHelpers.js";
import css from "./App.module.css";

function App() {
  const [times, setTimes] = useState<number[]>(
    loadSessionsFromLocalStorage()[0].times
  );
  const [timerSession, setTimerSession] = useState<string>("1");
  const [mode, setMode] = useState<MODES>(MODES["3x3x3"]);
  const [scramble, setScramble] = useState<string>(scrambleGenerator[MODES["3x3x3"]]());

  useEffect(() => {
    if (!localStorage.getItem("sessions")) {
      saveSessionsToLocalStorage(initialSessions);
    }
  }, []);

  useEffect(() => {
    setTimes(loadSessionsFromLocalStorage()[+timerSession - 1].times);
  }, [timerSession]);

  useEffect(() => {
    const sessions = loadSessionsFromLocalStorage();
    if (sessions.length === 0) {
      return;
    }
    const updatedSession: Session = { times: times };
    sessions[+timerSession - 1] = updatedSession;
    saveSessionsToLocalStorage(sessions);
  }, [times, timerSession]);

  useEffect(() => {
    setScramble(scrambleGenerator[mode]());
  }, [mode, times]);

  const handleSetTimerSession = (event: SelectChangeEvent) => {
    setTimerSession(event.target.value);
  };

  const handleSetMode = (event: SelectChangeEvent) => {
    setMode(event.target.value as MODES);
  };

  return (
    <Box className={css.appContainer}>
      <Header
        timerSessionValue={timerSession}
        modeValue={mode}
        sessionSelectHandler={handleSetTimerSession}
        modeSelectHandler={handleSetMode}
      />
      <Card className={css.scrambleContainer}>
        <Typography className={css.scramble}>
          <b>Scramble: </b>
          {scramble}
        </Typography>
      </Card>
      <Box className={css.timerAndStats}>
        <Timer setTimes={setTimes} times={times} />
        <Stats times={times} timerSession={timerSession} setTimes={setTimes} />
      </Box>
      <TimeChart times={times} />
    </Box>
  );
}

export default App;
