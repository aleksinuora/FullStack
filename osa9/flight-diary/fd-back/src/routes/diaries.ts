/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';

import diaryService from '../services/diaryService';

import toNewDiaryEntry from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('getting diaries...');
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
