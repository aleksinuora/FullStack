//import { parseBmi } from './parseArguments';

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  switch (true) {
    case 0 < bmi && bmi < 16.0:
      return 'Underweight (severe thinness)';
    case bmi < 17.0:
      return 'Underweight (moderate thinness)';
    case bmi < 18.5:
      return 'Underweight (mild thinness)';
    case bmi < 25.0:
      return 'Normal (healthy weight)';
    case bmi < 30.0:
      return 'Overweight (pre-obese)';
    case bmi < 35.0:
      return 'Obese (class I)';
    case bmi < 40.0:
      return 'Obese (class II)';
    case 40 < bmi:
      return 'Obese (class III)';
    default:
      throw new Error('Something went wrong');
  }
};

/**
try {
  const { height, weight } = parseBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}*/
export default 'default export';
