import data from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatientEntry,
  Entry,
  NewEntry,
} from '../types';

const patients: PatientEntry[] = data;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getById = (id: string): PatientEntry | undefined => {
  const patient: PatientEntry | undefined = patients.find(
    (patient) => patient.id === id
  );
  return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuidv4();

  const newEntry = {
    id: id,
    ...entry,
  };

  patients.push(newEntry);
  return newEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  console.log('adding new entry for patient...');

  const id = uuidv4();

  const newEntry = {
    id: id,
    ...entry,
  };

  if (patients.find((patient) => patient.id === patientId) === undefined) {
    throw new Error('patient not found');
  } else {
    patients
      .find((patient) => patient.id === patientId)
      ?.entries.push(newEntry);
    console.log('looks successful');
  }
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getById,
  addEntry,
};
