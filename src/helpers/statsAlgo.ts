export const avgOfLastNums = (arr: string[], num: number) => {
    if (arr.length >= num) {
      let sum = 0;
      for (let i = arr.length - num; i < arr.length; i++) {
        sum += +arr[i];
      }
      let avg = (sum / num).toFixed(2);
      return avg;
    }
  };