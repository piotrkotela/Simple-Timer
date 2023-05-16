import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { Box, Card, SelectChangeEvent, Typography } from "@mui/material";
// @ts-ignore
import ScrambleGenerator from "./helpers/ScrambleGenerator.js";
import Stats from "./components/Stats.js";
import TimeChart from "./components/TimeChart.js";

function App() {
  const [times, setTimes] = useState<number[]>([]);
  const [timerSession, setTimerSession] = useState("1");
  const [mode, setMode] = useState("3x3x3");
  const [scramble, setScramble] = useState(ScrambleGenerator["3x3x3"]());

  useEffect(() => {
    setScramble(ScrambleGenerator[mode]());
  }, [mode]);

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
        width: "1000px",
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
      <Card style={{ width: "100%", margin: "30px 0" }}>
        <Typography style={{ padding: 15 }}>
          <b>Scramble: </b>
          {scramble}
        </Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px 0",
        }}
      >
        <Timer setTimes={setTimes} times={times} />
        <Stats times={times} />
      </Box>
      <TimeChart times={times} />
    </Box>
  );
}

export default App;
