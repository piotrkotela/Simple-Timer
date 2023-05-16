import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import css from './Stats.module.css';
import { avgOfLastNums } from "../helpers/statsAlgo";


interface StatsTableProps {
  times: string[];
}
const StatsTable = ({ times }: StatsTableProps) => {
  return (
    <TableContainer className={css.table}  component={Paper}>
      <Table sx={{ minWidth: 300 }} stickyHeader size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={20}>No.</TableCell>
            <TableCell width={20}>Time</TableCell>
            <TableCell width={20}>ao5</TableCell>
            <TableCell width={20}>ao12</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.map((time, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {times.length - idx}
              </TableCell>
              <TableCell component="th" scope="row">
                {time}
              </TableCell>
              <TableCell component="th" scope="row">
                {times.length < 5 ? "-" : avgOfLastNums(times, 5)}
              </TableCell>
              <TableCell component="th" scope="row">
                {times.length < 5 ? "-" : avgOfLastNums(times, 12)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
