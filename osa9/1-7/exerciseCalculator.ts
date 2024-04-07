// import { parseExercise } from './parseArguments';

export type RatingRange = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: RatingRange;
  ratingDescription: string;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((day) => day !== 0).length;
  const average = hours.reduce((sum, current) => sum + current) / 7;
  const success = average >= target;
  const ratingMetric = average / target;
  let rating: RatingRange = 3;
  let ratingDescription = '';
  switch (true) {
    case ratingMetric < 0.5:
      rating = 1;
      ratingDescription = 'disappointing!';
      break;
    case ratingMetric <= 1.0:
      rating = 2;
      ratingDescription = 'mediocre!';
      break;
    case ratingMetric > 1.0:
      rating = 3;
      ratingDescription = 'satisfactory!';
      break;
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

/** 
try {
  const args = parseExercise(process.argv);
  console.log(calculateExercises(args.slice(0, -1), args[args.length - 1]));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/
