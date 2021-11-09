import classes from "./Stats.module.css";
import Card from "./UI/Card";
import msecToTime from "../Algo/MsecToTime";

const avgOfLastNums = (arr, num) => {
  if (arr.length >= num) {
    let sum = 0;
    for (let i = arr.length - num; i < arr.length; i++) {
      // items retrieved from localStorage are strings therefore we use parseInt
      sum += parseInt(arr[i]);
    }
    let avg = Math.round(sum / num);
    return avg;
  }
};
const bestOrWorstAvgOfLastNums = (arr, num, mode) => {
  let arrOfAvgs = [];
  for (let i = arr.length; i < arr.length - num; i++) {
    let sum;
    let avg;
    for (let j = 0; j < num; j++) {
      sum += parseInt(arr[i + j]);
      avg = sum / num;
    }
    arrOfAvgs.push(avg);
    if (mode === "best") {
      let bestAvg = Math.min(arrOfAvgs);
      return Math.round(bestAvg);
    }
    if (mode === "worst") {
      let worstAvg = Math.max(arrOfAvgs);
      return Math.round(worstAvg);
    }
  }
};
const Stats = (props) => {
  // localStorage can be accessed everywhere in the app
  // this piece of code makes sure that we are not trying to use null
  const times = props.times;
  let avg5 = msecToTime(avgOfLastNums(times, 5));
  if (times.length < 5) {
    avg5 = "-";
  }
  // let bestAvg5 = msecToTime(bestOrWorstAvgOfLastNums(times, 5, "best"));
  // let worstAvg5 = msecToTime(bestOrWorstAvgOfLastNums(times, 5, "worst"));
  let avg12 = msecToTime(avgOfLastNums(times, 12));
  if (times.length < 12) {
    avg12 = "-";
  }
  let avg100 = msecToTime(avgOfLastNums(times, 100));
  if (times.length < 100) {
    avg100 = "-";
  }
  let best = msecToTime(Math.min(...times));
  let worst = msecToTime(Math.max(...times));
  let current = msecToTime(times.slice(-1));

  if (times.length === 0) {
    best = "-";
    worst = "-";
    current = "-";
  }

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
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>ao12</td>
              <td>{avg12}</td>
              <td>52,300</td>
              <td>dcode</td>
            </tr>
            <tr>
              <td>ao100</td>
              <td>{avg100}</td>
              <td>52,300</td>
              <td>dcode</td>
            </tr>
          </tbody>
        </table>
        {/* <div className={classes.statsBox}>
          {props.times.length > 0 ? <p>{`best: ${best}`}</p> : <p>best: n/a</p>}
          {props.times.length > 0 ? (
            <p>{`worst: ${worst}`}</p>
          ) : (
            <p>worst: n/a</p>
          )}
          {props.times.length >= 5 && <p>{`avg5: ${avg5}`}</p>}
          {props.times.length >= 12 && <p>{`avg12: ${avg12}`}</p>}
          {props.times.length >= 100 && <p>{`avg100: ${avg100}`}</p>}
        </div> */}
      </div>
    </Card>
  );
};

export default Stats;
