export const averageOfLastNums = (
  arr: number[],
  lastNums: number,
  startIdx: number
) => {
  if (lastNums > arr.length || arr.length - startIdx <= lastNums - 1) {
    return "-";
  }
  let sum = 0;
  for (let i = startIdx; i < startIdx + lastNums; i++) {
    sum += arr[i];
  }
  let avg = (sum / lastNums).toFixed(2);
  return avg;
};