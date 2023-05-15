import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import css from "./Header.module.css";

interface HeaderProps {
  timerSessionValue: string;
  modeValue: string;
  sessionSelectHandler: (event: SelectChangeEvent) => void;
  modeSelectHandler: (event: SelectChangeEvent) => void;
}

const Header = ({
  timerSessionValue,
  modeValue,
  sessionSelectHandler,
  modeSelectHandler,
}: HeaderProps) => {
  const modes = ["3x3x3", "2x2x2"];
  return (
    <div className={css.headerContainer}>
      <FormControl className={css.sessionSelect}>
        <InputLabel id="session">Session</InputLabel>
        <Select
          labelId="session"
          value={timerSessionValue}
          label="Session"
          onChange={sessionSelectHandler}
        >
          {[...Array(10).keys()].map((sessionNumber) => (
            <MenuItem value={(sessionNumber + 1).toString()}>
              {sessionNumber + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="modes">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={modeValue}
          label="Mode"
          onChange={modeSelectHandler}
        >
          {modes.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
