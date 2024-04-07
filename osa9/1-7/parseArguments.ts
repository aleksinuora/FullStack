interface Metric {
  height: number;
  weight: number;
}

export const parseBmi = (args: string[]): Metric => {
  rightArgumentCount(args);
  if (isNumber(args[2]) && isNumber(args[3])) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error('Parameters were not numbers');
  }
};

export const parseExercise = (args: string[]): number[] => {
  args.slice(2, args.length).map((arg) => {
    if (isNumber(arg)) {
      return;
    } else {
      throw new Error('Parameters were not numbers');
    }
  });

  return args.slice(2, args.length).map((arg) => Number(arg));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumber = (argument: any): boolean => {
  return !isNaN(Number(argument));
};

const rightArgumentCount = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
};

export default 'default';
