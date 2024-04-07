import {
  NewPatientEntry,
  Gender,
  PatientEntry,
  DiagnosisEntry,
  NewEntry,
} from './types';

export const parseDiagnosisCodes = (
  object: unknown
): Array<DiagnosisEntry['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<DiagnosisEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

export const isPatientEntry = (
  object: PatientEntry | undefined
): object is PatientEntry => {
  return object !== undefined;
};

const isEntry = (object: unknown): object is NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Bad or missing data');
  }

  const throwError = (type: string) => {
    throw new Error('Invalid data for type ' + type);
  };

  if (
    'type' in object &&
    'date' in object &&
    'description' in object &&
    'specialist' in object
  ) {
    switch (object.type) {
      case 'HealthCheck': {
        if (!('healthCheckRating' in object)) {
          throwError('HealthCheck');
        }
        break;
      }
      case 'Hospital': {
        if (!('discharge' in object)) {
          throwError('Hospital');
        }
        break;
      }
      case 'OccupationalHealthcare': {
        if (!('employerName' in object)) {
          throwError('OccupationalHealthcare');
        }
        break;
      }
      default:
        return object !== undefined;
    }
  }

  return object !== undefined;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (isEntry(object)) {
    const baseEntry = {
      description: parseStringField(object.description, 'description'),
      date: parseDate(object.date),
      specialist: parseStringField(object.specialist, 'specialist'),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    switch (object.type) {
      case 'HealthCheck':
        const healthCheck: NewEntry = {
          ...baseEntry,
          type: object.type,
          healthCheckRating: object.healthCheckRating,
        };
        return healthCheck;
      case 'Hospital':
        const hospital: NewEntry = {
          ...baseEntry,
          type: object.type,
          discharge: object.discharge,
        };
        return hospital;
      case 'OccupationalHealthcare':
        const occupationalHealthcare: NewEntry = {
          ...baseEntry,
          type: object.type,
          employerName: parseStringField(object.employerName, 'employerName'),
          sickLeave: object.sickLeave,
        };
        return occupationalHealthcare;
    }
  } else {
    throw new Error('Something went wrong while parsing new entry');
  }
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Bad or missing data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, 'name'),
      ssn: parseStringField(object.ssn, 'ssn'),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation'),
      entries: [],
    };
    console.log(newEntry);

    return newEntry;
  }

  throw new Error('Bad data: missing field(s)');
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error('Bad gender');
  }

  return value;
};

const parseStringField = (value: unknown, key: string): string => {
  if (!isString(value)) {
    throw new Error(`Bad ${key}`);
  }
  return value;
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
    throw new Error('Bad date');
  }
  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
