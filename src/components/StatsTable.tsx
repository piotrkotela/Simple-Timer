import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import css from "./Stats.module.css";

import IconMenu from "./IconMenu";
import { averageOfLastNums } from "../helpers/HelperFunctions";

interface StatsTableProps {
  times: number[];
  timerSession: string;
  setTimes: React.Dispatch<React.SetStateAction<number[]>>;
}
const StatsTable = ({ times, timerSession, setTimes }: StatsTableProps) => {
  return (
    <div style={{display: "flex", gap: "5px"}}>
      <TableContainer className={css.table} component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>no.</TableCell>
              <TableCell>time</TableCell>
              <TableCell>ao5</TableCell>
              <TableCell>ao12</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* We want to map the array in reverse order 
          for the new times to appear on the top of the table */}
            {times
              .slice(0)
              .reverse()
              .map((time, idx, reversedTimes) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {reversedTimes.length - idx}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {time}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {averageOfLastNums(reversedTimes, 5, idx)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {averageOfLastNums(reversedTimes, 12, idx)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconMenu timerSession={timerSession} setTimes={setTimes}/>
    </div>
  );
};

export default StatsTable;
