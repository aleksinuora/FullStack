import { NonSensitiveDiaryEntry } from '../types';

interface DiaryEntryProps {
  entry: NonSensitiveDiaryEntry;
}

export const DiaryEntry = (props: DiaryEntryProps) => {
  return (
    <p>
      <b>{props.entry.date}</b>
      <br />
      visibility: {props.entry.visibility}
      <br />
      weather: {props.entry.weather}
    </p>
  );
};
