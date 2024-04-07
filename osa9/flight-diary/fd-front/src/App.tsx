import { useState, useEffect } from 'react';
import axios from 'axios';

import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, postDiaryEntry } from './services/diaryService';
import { AllDiaries } from './components/AllDiaries';
import { NewDiary } from './components/NewDiary';
import { ShowError } from './components/ShowError';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
      console.log('fetched diaries: ', data);
    });
  }, []);

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      postDiaryEntry(values).catch((e) => {
        if (axios.isAxiosError(e)) {
          setErrorMessage(e.response?.data);
        } else {
          console.error('unknown error:', e);
          setErrorMessage('Unknown error');
        }
        setInterval(() => {
          setErrorMessage('');
        }, 5000);
      });
      setDiaries(await getAllDiaries());
    } catch (e) {
      console.log('caught in App.tsx:', e);
    }
  };

  return (
    <>
      <div>
        <NewDiary
          onSubmit={submitNewDiary}
          showError={<ShowError message={errorMessage} />}
        />
      </div>
      <div>
        <AllDiaries diaries={diaries} />
      </div>
    </>
  );
}

export default App;
