import {
  useState,
  useRef,
  SyntheticEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import {
  Box,
  TextField,
  Input,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';

import {
  HealthCheckEntryForm,
  HealthCheckRating,
  Diagnosis,
  Entry,
} from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: HealthCheckEntryForm) => void;
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[]>>;
}

const AddEntryForm = (props: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [codes, setCodes] = useState<string[]>([]);

  const dateInputRef = useRef(null);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const values: HealthCheckEntryForm = {
      type: 'HealthCheck',
      healthCheckRating: rating,
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: codes,
    };

    try {
      props.onSubmit(values);
    } catch {
      throw new Error('Failed submitting entry');
    }
  };

  const onClear = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating(0);
    setCodes([]);
  };

  return (
    <Box component='section' sx={{ p: 2, border: '1px solid grey' }}>
      <h4>New Health Check entry</h4>
      <form onSubmit={submit}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        Date
        <br />
        <Input
          type='date'
          ref={dateInputRef}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id='rating-label'>Health Check rating</InputLabel>
        <Select
          value={rating}
          labelId='rating-label'
          onChange={({ target }) => setRating(Number(target.value))}
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low risk</MenuItem>
          <MenuItem value={2}>High risk</MenuItem>
          <MenuItem value={3}>Critical risk</MenuItem>
        </Select>
        <InputLabel id='codes-label'>Diagnosis codes</InputLabel>
        <Select
          labelId='codes-label'
          multiple
          value={codes}
          onChange={({ target }) => {
            setCodes(
              typeof target.value === 'string'
                ? target.value.split(',')
                : target.value
            );
          }}
        >
          {props.diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
        {codes.length === 0 ? (
          <></>
        ) : (
          <Button onClick={() => setCodes([])}>Clear codes</Button>
        )}
        <br />
        <Button type='button' onClick={onClear}>
          Clear
        </Button>
        <Button type='submit'>Add</Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;
