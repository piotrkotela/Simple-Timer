import msecToTime from './MsecToTime';

// calulates the average of last 'num' numbers in the array
export const avgOfLastNums = (arr, num) => {
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

// calculates the best(smalles) average of 'mode' numbers in an array
export const bestAvg = (arr, mode) => {
    let best_avg = 0
    for (let i = 0; i < arr.length - mode + 1; i++){
        let current_avg = 0
        for (let j = i; j < i + mode; j++) {
            current_avg += parseInt(arr[j])
        }
        current_avg /= 5
        if (i === 0) {
            best_avg = current_avg
        }
        if (best_avg > current_avg) {
            best_avg = current_avg
        }
    }
   best_avg = msecToTime(Math.round(best_avg)) 
   return best_avg
};

// calculates the worst(biggest) average of 'mode' numbers in an array
export const worstAvg = (arr, mode) => {
    let worst_avg = 0
    for (let i = 0; i < arr.length - mode + 1; i++){
        let current_avg = 0
        for (let j = i; j < i + mode; j++) {
            current_avg += parseInt(arr[j])
        }
        current_avg /= 5
        if (worst_avg < current_avg) {
            worst_avg = current_avg
        }
    }
    worst_avg = msecToTime(Math.round(worst_avg)) 
    return worst_avg
};


