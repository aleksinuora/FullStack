import { ReactElement, useState } from 'react';

import { NewDiaryEntry, Visibility, Weather } from '../types';
import { RadioButton } from './RadioButton';

interface NewDiaryProps {
  onSubmit: (values: NewDiaryEntry) => void;
  showError: ReactElement;
}

export const NewDiary = ({ onSubmit, showError }: NewDiaryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const submitDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment,
    };
    onSubmit(newDiary);
  };

  const visibilityRadio: ReactElement = (
    <>
      {(Object.values(Visibility) as Array<Visibility>).map((value, index) => {
        return RadioButton('visibility', value, index, () =>
          setVisibility(value)
        );
      })}
    </>
  );

  const weatherRadio: ReactElement = (
    <>
      {(Object.values(Weather) as Array<Weather>).map((value, index) => {
        return RadioButton('weather', value, index, () => setWeather(value));
      })}
    </>
  );

  return (
    <div>
      <h1>Add new entry</h1>
      {showError}
      <form onSubmit={submitDiary}>
        date
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        visibility
        <br />
        {visibilityRadio}
        <br />
        weather
        <br />
        {weatherRadio}
        <br />
        comment
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};
