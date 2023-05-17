import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import css from "./Header.module.css";
import { MODES } from "../helpers/ScrambleGenerator";

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
  return (
    <Box className={css.headerContainer}>
      <FormControl className={css.sessionSelect}>
        <InputLabel id="session">Session</InputLabel>
        <Select
          labelId="session"
          value={timerSessionValue}
          label="Session"
          onChange={sessionSelectHandler}
        >
          {[...Array(10).keys()].map((sessionNumber, idx) => (
            <MenuItem key={idx} value={(sessionNumber + 1).toString()}>
              {sessionNumber + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="modes">Mode</InputLabel>
        <Select
          labelId="modes"
          value={modeValue}
          label="Mode"
          onChange={modeSelectHandler}
        >
          {Object.keys(MODES).map((mode) => (
            <MenuItem key={mode} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Header;
