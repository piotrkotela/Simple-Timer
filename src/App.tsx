import { useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { SelectChangeEvent } from "@mui/material";
// @ts-ignore
import ScrambleGenerator from './helpers/ScrambleGenerator.js'  
import Stats from "./components/Stats.js";

function App() {
  const [times, setTimes] = useState<string[]>([]);
  const [timerSession, setTimerSession] = useState("1");
  const [mode, setMode] = useState("3x3x3");

  const handleSetTimerSession = (event: SelectChangeEvent) => {
    setTimerSession(event.target.value);
  };

  const handleSetMode = (event: SelectChangeEvent) => {
    setMode(event.target.value);
  };

  return (
    <div style={{ width: 800, margin: "0 auto", backgroundColor: "#eee" }}>
      <Header
        timerSessionValue={timerSession}
        modeValue={mode}
        sessionSelectHandler={handleSetTimerSession}
        modeSelectHandler={handleSetMode}
      />
      <h1>Scramble: {ScrambleGenerator[mode]()}</h1>
      <Timer setTimes={setTimes} />
      {times.toString()}
      <Stats />

    </div>
  );
}

export default App;
