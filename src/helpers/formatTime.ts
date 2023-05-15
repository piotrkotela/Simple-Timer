// this function converts miliseconds to formatted time hh:mm:ss.ms

const formatTime = (ms: number) => {
  const hours = Math.floor((ms / (3600 * 1000)) % 3600);
  let milliseconds: any = Math.floor((ms % 1000) / 10);
  let minutes: any = Math.floor((ms / (60 * 1000)) % 60);
  let seconds: any = Math.floor((ms / 1000) % 60);

  if (milliseconds < 10) {
    milliseconds = `0${milliseconds}`
  }

  if (hours > 0 && minutes < 10) {
    minutes = `0${minutes}`;
  }

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


export default formatTime;
