import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import css from "./Stats.module.css";
import { averageOfLastNums } from "../helpers/statsAlgo";
// import { useState } from "react";

interface StatsTableProps {
  times: number[];
}
const StatsTable = ({ times }: StatsTableProps) => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
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
                {averageOfLastNums(times, 5, idx)}
              </TableCell>
              <TableCell component="th" scope="row">
                {averageOfLastNums(times, 12, idx)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
