const ScrambleGen2 = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const createRandomArray = (min, max) => {
    let startArray = [];
    startArray.push(getRandomInt(min, max));
    let i = 0;
    while (i < 11) {
      let randomInt = getRandomInt(min, max);
      if (startArray[i] !== randomInt) {
        startArray.push(randomInt);
        i++;
      }
    }
    return startArray;
  };
  const createFinalScramble = () => {
    let preScramble = createRandomArray(1, 3);
    // replacing numbers with letters
    for (let i = 0; i < preScramble.length; i++) {
      if (preScramble[i] === 1) {
        preScramble[i] = "R";
      }
      if (preScramble[i] === 2) {
        preScramble[i] = "U";
      }
      if (preScramble[i] === 3) {
        preScramble[i] = "F";
      }
    }
    // adding double moves and prime moves
    const changeArray = createRandomArray(0, 2);

    for (let i = 0; i < preScramble.length; i++) {
      if (changeArray[i] === 1) {
        preScramble[i] += "'";
      }
      if (changeArray[i] === 2) {
        preScramble[i] += "2";
      }
    }
    let scramble = "";
    for (let i = 0; i < preScramble.length; i++) {
      scramble += preScramble[i];
      scramble += " ";
    }
    return scramble;
  };
  return createFinalScramble();
};

export default ScrambleGen2;
