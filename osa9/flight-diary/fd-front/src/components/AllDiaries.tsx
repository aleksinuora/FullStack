import { DiaryEntry } from './DiaryEntry';
import { NonSensitiveDiaryEntry } from '../types';

interface DiariesProps {
  diaries: NonSensitiveDiaryEntry[];
}

export const AllDiaries = (props: DiariesProps) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {props.diaries.map((entry, index) => {
        return <DiaryEntry entry={entry} key={index} />;
      })}
    </div>
  );
};
