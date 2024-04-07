import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Male, Female, QuestionMark } from '@mui/icons-material';
import { Box } from '@mui/material';

import patientService from '../../services/patients';
import {
  Patient,
  Diagnosis,
  Gender,
  HealthCheckEntryForm,
  Entry,
} from '../../types';
import AddEntryForm from './AddEntryForm';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error('Unexpected value: ' + value);
};

const PatientPage = (props: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState('');

  const patientId = useParams().id;
  useEffect(() => {
    if (patientId !== undefined) {
      const getPatient = async () => {
        setPatient(await patientService.getById(patientId));
      };
      getPatient();
    }
  }, [patientId]);

  useEffect(() => {
    if (patient !== undefined) {
      setEntries(patient.entries);
    }
  }, [patient]);

  const diagnosisCodes = (entries: Array<Diagnosis['code']>) => {
    const names: (string | undefined)[] = entries.map((e) => {
      return e + ' ' + props.diagnoses.find((d) => d.code === e)?.name;
    });

    return (
      <ul>
        {names.map((entry) => (
          <li key={names.indexOf(entry).toString() + entry}>{entry}</li>
        ))}
      </ul>
    );
  };

  const PatientGender = () => {
    if (patient === undefined || patient.gender === undefined) {
      return <></>;
    }

    switch (patient.gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <QuestionMark />;
      default:
        assertNever(patient.gender);
    }
  };

  const submitEntry = async (values: HealthCheckEntryForm) => {
    try {
      if (patientId === undefined) {
        throw new Error('Missing patient id');
      }
      console.log('submitting entry: ' + values.description);
      const newEntry: Entry = await patientService.addEntry(values, patientId);
      setEntries(entries.concat(newEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
      setInterval(() => {
        setError('');
      }, 5000);
    }
  };

  const showError = () => {
    return error !== '' ? <h3 style={{ color: 'red' }}>{error}</h3> : <></>;
  };

  return (
    <div>
      {patient === undefined ? (
        'no patient found'
      ) : (
        <div>
          <h1>
            {patient.name} <PatientGender></PatientGender>
          </h1>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
          {showError()}
          <AddEntryForm
            diagnoses={props.diagnoses}
            onSubmit={submitEntry}
            entries={entries}
            setEntries={setEntries}
          />
          <div>
            <h3>entries</h3>
            {entries.length === 0 ? (
              '-'
            ) : (
              <>
                {entries.map((entry) => {
                  return (
                    <Box
                      component='section'
                      sx={{ p: 2, border: '1px solid grey' }}
                      key={entry.date}
                    >
                      {entry.date} <i>{entry.description}</i>
                      <br />
                      {entry.diagnosisCodes === undefined ? (
                        <></>
                      ) : (
                        diagnosisCodes(entry.diagnosisCodes)
                      )}
                    </Box>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
