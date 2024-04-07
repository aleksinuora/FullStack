import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmiResult = calculateBmi(Number(height), Number(weight));

  return res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: bmiResult,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hours: number[] = req.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = Number(req.body.target);

  const malParam = () => {
    return res.status(400).json({ error: 'malformatted parameters' });
  };

  if (!hours || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(hours)) {
    malParam();
  }

  hours.forEach((day) => {
    if (isNaN(Number(day))) {
      malParam();
    }
  });

  if (isNaN(Number(target))) {
    malParam();
  }

  return res.json(calculateExercises(hours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
