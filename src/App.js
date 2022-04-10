import { useState } from "react";
import classes from "./App.module.css";
import Timer from "./Components/Timer";
import Stats from "./Components/Stats";
import CustomSelect from "./Components/Header/CustomSelect";
import TimeChart from "./Components/UI/TimeChart";
import msecToTime from "./Algo/MsecToTime";
import Logo from "./Resources/logo";
import Card from "./Components/UI/Card";

const sessionOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const modeOptions = ['3x3x3','2x2x2'];

function App() {
  // state is only to save current values to localStorage
  // we will use localStorage to save values and then read them

  const [times, setTimes] = useState([]);
  const [session, setSession] = useState("session1");
  const [mode, setMode] = useState("3x3x3");

  const addTimeHandler = (time) => {
    // managing localStorage
    let existing = localStorage.getItem(session);
    existing = existing ? existing.split(",") : [];
    existing.push(time);
    localStorage.setItem(session, existing.toString());

    setTimes((prevTimes) => {
      return [...times, msecToTime(time)];
    });
  };

  const removeAllTimes = () => {
    setTimes([]);
    localStorage.removeItem(session);
  };

  const changeSessionHandler = (sessionNumber) => {
    let newSession = "session" + sessionNumber;
    setSession(newSession);
  };

  const changeModeHandler = (selectedMode) => {
    setMode(selectedMode);
  };

  let existingTimes;
  if (localStorage.getItem(session) === null) {
    existingTimes = [];
  } else {
    existingTimes = localStorage.getItem(session).split(",");
  }
  
  return (
    <main>
      <div className={classes.options}>
        <CustomSelect
          onOptionClicked={changeModeHandler}
          options={modeOptions}
          defaultOption={"3x3x3"}
          label={'Select Mode: '}
          width={'80px'}
        />
        <Logo fill={'black'} style={{marginRight: '50px'}}/>
        <CustomSelect
          onOptionClicked={changeSessionHandler}
          options={sessionOptions}
          defaultOption={"1"}
          label={'Session: '}
          width={'50px'}
        />
      </div>
      <div className={classes.timer}>
        <Timer addTime={addTimeHandler} mode={mode} />
        <Stats times={existingTimes} removeAllTimes={removeAllTimes} />
      </div>
      { times.length < 3 ? <Card className={classes.TimeChartDisabled}>You need at least 3 solves to see the chart!</Card> :
        <div className={classes.TimeChart}>
        <TimeChart times={existingTimes} />
      </div>
      }
      
    </main>
  );
}

export default App;
