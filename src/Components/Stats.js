import classes from "./Stats.module.css";
import Card from "./UI/Card";
import msecToTime from "../Algo/MsecToTime";
import {bestAvg, worstAvg, avgOfLastNums} from '../Algo/StatsAlgo';

const Stats = (props) => {
  // localStorage can be accessed everywhere in the app as props
  const times = props.times;

  let avg5 =  times.length < 5 ? '-' : msecToTime(avgOfLastNums(times, 5));
  let avg12 =  times.length < 12 ? '-' : msecToTime(avgOfLastNums(times, 12));
  let avg100 =  times.length < 100 ? '-' : msecToTime(avgOfLastNums(times, 100));

  let best = msecToTime(Math.min(...times));
  let worst = msecToTime(Math.max(...times));
  let current = msecToTime(times.slice(-1));

  if (times.length === 0) {
    best = "-";
    worst = "-";
    current = "-";
  }

  let bestAvg5 = times.length < 5 ? '-' : bestAvg(times,5)
  let bestAvg12 = times.length < 12 ? '-' : bestAvg(times,12)
  let bestAvg100 = times.length < 100 ? '-' : bestAvg(times,100)

  let worstAvg5 = times.length < 5 ? '-' : worstAvg(times, 5)
  let worstAvg12 = times.length < 12 ? '-' : worstAvg(times, 12)
  let worstAvg100 = times.length < 100 ? '-' : worstAvg(times, 100)

  return (
    <Card className={classes.stats}>
      <div>
        <div className={classes.upper}>
          <p>{`No. of times: ${props.times.length}`}</p>
          <button
            onClick={props.removeAllTimes}
            style={{ cursor: "pointer" }}
            tabIndex="-1"
          >
            Remove All
          </button>
        </div>
        <div className={classes.upperTimesBox}>
          <div className={classes.timesBox}>
            {props.times.map((time) => (
              <p key={Math.random()}>{`${msecToTime(time)}`}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={classes.statsParagraph}>Statistics</p>
        <table className={classes.contentTable}>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Current</th>
              <th>Best</th>
              <th>Worst</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>time</td>
              <td>{current}</td>
              <td>{best}</td>
              <td>{worst}</td>
            </tr>
            <tr>
              <td>ao5</td>
              <td>{avg5}</td>
              <td>{bestAvg5}</td>
              <td>{worstAvg5}</td>
            </tr>
            <tr>
              <td>ao12</td>
              <td>{avg12}</td>
              <td>{bestAvg12}</td>
              <td>{worstAvg12}</td>
            </tr>
            <tr>
              <td>ao100</td>
              <td>{avg100}</td>
              <td>{bestAvg100}</td>
              <td>{worstAvg100}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Stats;
