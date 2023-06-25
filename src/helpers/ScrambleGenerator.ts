const createRandomArray = (
  min: number,
  max: number,
  length: number,
  isAdjacent: boolean = false
): number[] => {
  const startArray: number[] = [getRandomInt(min, max)];
  let i = 0;
  while (i < length) {
    const randomInt = getRandomInt(min, max);
    if (isAdjacent) {
      startArray.push(randomInt);
      i++
    }
    else if ((startArray[i] !== randomInt)) {
      startArray.push(randomInt);
      i++;
    }
  }
  return startArray;
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type mapNumsToMoves = Record<number, string>;
type MapNumsToMovesModifiersFunctions = Record<number, (move: string) => string>

interface scrambleGenParams {
  mapNumsToMoves: mapNumsToMoves;
  mapNumsToMovesModifiersFunctions: MapNumsToMovesModifiersFunctions;
  scrambleLength: number;
}
const scrambleGen = ({
  mapNumsToMoves,
  mapNumsToMovesModifiersFunctions,
  scrambleLength,
}: scrambleGenParams): string => {
  const scrambleWithoutModifiers = createRandomArray(
    0,
    Object.keys(mapNumsToMoves).length - 1,
    scrambleLength
  ).map((num) => mapNumsToMoves[num as keyof typeof mapNumsToMoves]);

  const modifiersFunctions = createRandomArray(
    0,
    Object.keys(mapNumsToMovesModifiersFunctions).length - 1,
    scrambleLength,
    true
  ).map(
    (num) =>
      mapNumsToMovesModifiersFunctions[num as keyof typeof mapNumsToMovesModifiersFunctions]
  );
  let scramble = "";
  for (let i = 0; i < scrambleLength; i++) {
    scramble += modifiersFunctions[i](scrambleWithoutModifiers[i]) + " "  
  }
  return scramble;
};

export enum MODES {
  "2x2x2" = "2x2x2",
  "3x3x3" = "3x3x3",
  "4x4x4" = "4x4x4",
  "5x5x5" = "5x5x5",
  "6x6x6" = "6x6x6",
  "7x7x7" = "7x7x7"
}

const mapNumsToMoves3x3x3andUp: mapNumsToMoves = {
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
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move,
    },
    scrambleLength: 9,
  },
  "3x3x3": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move,
    },
    scrambleLength: 23,
  },
  "4x4x4": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move + "w",
      3: (move) => move + "w'",
      4: (move) => move + "",
    },
    scrambleLength: 40,
  },
  "5x5x5": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move + "w",
      3: (move) => move + "w'",
      4: (move) => move + "w2",
      5: (move) => move,
    },
    scrambleLength: 60,
  },
  "6x6x6": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move + "w",
      3: (move) => move + "w'",
      4: (move) => move + "w2",
      5: (move) => "3" + move + "w",
      6: (move) => "3" + move + "w'",
      7: (move) => "3" + move + "w2",
      8: (move) => move,
    },
    scrambleLength: 80,
  },
  "7x7x7": {
    mapNumsToMoves: mapNumsToMoves3x3x3andUp,
    mapNumsToMovesModifiersFunctions: {
      0: (move) => move + "'",
      1: (move) => move + "2",
      2: (move) => move + "w",
      3: (move) => move + "w'",
      4: (move) => move + "w2",
      5: (move) => "3" + move + "w",
      6: (move) => "3" + move + "w'",
      7: (move) => "3" + move + "w2",
      8: (move) => move,
    },
    scrambleLength: 100,
  }
};

type ScrambleGeneratorType = {
  [key in MODES]: () => string;
};

const getParams = (mode: MODES) => {
  const params = scrambleParams[MODES[mode]];
  return {
    mapNumsToMoves: params.mapNumsToMoves,
    mapNumsToMovesModifiersFunctions: params.mapNumsToMovesModifiersFunctions,
    scrambleLength: params.scrambleLength,
  };
};

const ScrambleGenerator: ScrambleGeneratorType = {
  "2x2x2": () => scrambleGen(getParams(MODES["2x2x2"])),
  "3x3x3": () => scrambleGen(getParams(MODES["3x3x3"])),
  "4x4x4": () => scrambleGen(getParams(MODES["4x4x4"])),
  "5x5x5": () => scrambleGen(getParams(MODES["5x5x5"])),
  "6x6x6": () =>  scrambleGen(getParams(MODES["6x6x6"])),
  "7x7x7": () => scrambleGen(getParams(MODES["7x7x7"]))
};

export default ScrambleGenerator;
