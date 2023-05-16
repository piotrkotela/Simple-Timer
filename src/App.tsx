import { useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { Box, Card, SelectChangeEvent, Typography } from "@mui/material";
// @ts-ignore
import ScrambleGenerator from "./helpers/ScrambleGenerator.js";
import Stats from "./components/Stats.js";
import { avgOfLastNums } from "./helpers/statsAlgo.js";

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
    <Box
      sx={{
        margin: "0 auto",
        width: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header
        timerSessionValue={timerSession}
        modeValue={mode}
        sessionSelectHandler={handleSetTimerSession}
        modeSelectHandler={handleSetMode}
      />
      <Card style={{ padding: 20, width: "fit-content" }}>
        <Typography>{ScrambleGenerator[mode]()}</Typography>
      </Card>
      <Timer
        setTimes={setTimes}
        currentAo5={avgOfLastNums(times, 5)}
        currentAo12={avgOfLastNums(times, 12)}
      />
      <Stats times={times} />
    </Box>
  );
}

export default App;
