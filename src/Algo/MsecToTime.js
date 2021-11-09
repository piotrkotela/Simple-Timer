// this function converts miliseconds to formatted time hh:mm:ss.ms

const msecToTime = (ms) => {
  const hours = Math.floor((ms / (3600 * 1000)) % 3600);

  let milliseconds = Math.floor((ms % 1000) / 10);
  if (milliseconds < 10) {
    milliseconds = `0${milliseconds}`
  }

  let minutes = Math.floor((ms / (60 * 1000)) % 60);
  if (hours > 0 && minutes < 10) {
    minutes = `0${minutes}`;
  }

  let seconds = Math.floor((ms / 1000) % 60);
  if (minutes > 0 && seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (minutes === 0 && hours === 0) {
    return `${seconds}.${milliseconds}`;
  }
  if (minutes > 0 && hours === 0) {
    return `${minutes}:${seconds}.${milliseconds}`
  }
  return `${hours}:${minutes}:${seconds}.${milliseconds}`
};

export default msecToTime;
