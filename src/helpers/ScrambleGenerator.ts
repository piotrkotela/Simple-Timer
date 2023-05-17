const createRandomArray = (
  min: number,
  max: number,
  length: number
): number[] => {
  const startArray = [];
  startArray.push(getRandomInt(min, max));
  let i = 0;
  while (i < length) {
    const randomInt = getRandomInt(min, max);
    if (startArray[i] !== randomInt) {
      startArray.push(randomInt);
      i++;
    }
  }
  return startArray;
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type MapNums = Record<number, string>;

interface scrambleGenParams {
  mapNumsToMoves: MapNums;
  mapNumsToMovesModifiers: MapNums;
  scrambleLength: number;
}
const scrambleGen = ({
  mapNumsToMoves,
  mapNumsToMovesModifiers,
  scrambleLength,
}: scrambleGenParams): string => {
  const scrambleWithoutModifiers = createRandomArray(
    0,
    Object.keys(mapNumsToMoves).length - 1,
    scrambleLength
  ).map((num) => mapNumsToMoves[num as keyof typeof mapNumsToMoves]);

  const modifiers = createRandomArray(
    0,
    Object.keys(mapNumsToMovesModifiers).length - 1,
    scrambleLength
  ).map(
    (num) =>
      mapNumsToMovesModifiers[num as keyof typeof mapNumsToMovesModifiers]
  );
  let scramble = "";
  for (let i = 0; i < scrambleLength; i++) {
    scramble += scrambleWithoutModifiers[i] + modifiers[i] + " ";
  }
  return scramble;
};

export enum MODES {
  "2x2x2" = "2x2x2",
  "3x3x3" = "3x3x3",
  "4x4x4" = "4x4x4",
  "5x5x5" = "5x5x5",
}

const mapNumsToMoves3x3x3andUp: MapNums = {
  0: "R",
  1: "U",
  2: "F",
  3: "B",
  4: "D",
  5: "L",
};

const scrambleParams: Record<MODES, scrambleGenParams> = {
  "2x2x2": {
    mapNumsToMoves: {
      0: "R",
      1: "U",
      2: "F",
    },
    mapNumsToMovesModifiers: {
      0: "'",
      1: "2",
      2: "",
    },
    scrambleLength: 9,
  },
  "3x3x3": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiers: {
      0: "'",
      1: "2",
      2: "",
    },
    scrambleLength: 23,
  },
  "4x4x4": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiers: {
      0: "'",
      1: "2",
      2: "w",
      3: "w'",
      4: "",
    },
    scrambleLength: 40,
  },
  "5x5x5": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiers: {
      0: "'",
      1: "2",
      2: "w",
      3: "w'",
      4: "w2",
      5: "",
    },
    scrambleLength: 60,
  },
};

type ScrambleGeneratorType = {
  [key in MODES]: () => string;
};

const getParams = (mode: MODES) => {
  const params = scrambleParams[MODES[mode]];
  return {
    mapNumsToMoves: params.mapNumsToMoves,
    mapNumsToMovesModifiers: params.mapNumsToMovesModifiers,
    scrambleLength: params.scrambleLength,
  };
};

const ScrambleGenerator: ScrambleGeneratorType = {
  "2x2x2": () => scrambleGen(getParams(MODES["2x2x2"])),
  "3x3x3": () => scrambleGen(getParams(MODES["3x3x3"])),
  "4x4x4": () => scrambleGen(getParams(MODES["4x4x4"])),
  "5x5x5": () => scrambleGen(getParams(MODES["5x5x5"])),
};

export default ScrambleGenerator;
