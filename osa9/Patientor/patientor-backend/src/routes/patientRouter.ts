import express from 'express';

import patientService from '../services/patientService';
import { toNewPatientEntry, isPatientEntry, toNewEntry } from '../utils';
import { PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const searchResult: PatientEntry | undefined = patientService.getById(
    String(req.params.id)
  );
  if (!isPatientEntry(searchResult)) {
    return res.sendStatus(404);
  }
  return res.send(searchResult);
});

router.post('/', (req, res) => {
  console.log('logging req.body: ', req.body);
  try {
    console.log('trying to parse entry');
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log('parsed');
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    console.log('body:', req.body, 'id:', patientId);
    const addedEntry = patientService.addEntry(patientId, toNewEntry(req.body));
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong while adding entry to patient.';
    if (error instanceof Error) {
      errorMessage = ' Error: ' + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
