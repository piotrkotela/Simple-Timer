const scrambleGen3x3 = () => {
  // returns random integer from the range [min, max]
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // creates random array of len=23 of non-adjacent integers in the range [min, max]
  const createRandomArray = (min, max) => {
    let startArray = [];
    startArray.push(getRandomInt(min, max));
    let i = 0;
    while (i < 23) {
      let randomInt = getRandomInt(min, max);
      if (startArray[i] !== randomInt) {
        startArray.push(randomInt);
        i++;
      }
    }
    return startArray;
  };
  const createFinalScramble = () => {
    let preScramble = createRandomArray(1, 6);
    // replacing numbers with letters
    for (let i = 0; i < preScramble.length; i++) {
      if (preScramble[i] === 1) {
        preScramble[i] = "F";
      }
      if (preScramble[i] === 2) {
        preScramble[i] = "B";
      }
      if (preScramble[i] === 3) {
        preScramble[i] = "U";
      }
      if (preScramble[i] === 4) {
        preScramble[i] = "D";
      }
      if (preScramble[i] === 5) {
        preScramble[i] = "R";
      }
      if (preScramble[i] === 6) {
        preScramble[i] = "L";
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

const scrambleGen2x2 = () => {
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

const ScrambleGenerator = {
  ["3x3x3"]: scrambleGen3x3,
  ["2x2x2"]: scrambleGen2x2,
};
export default ScrambleGenerator
