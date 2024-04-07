import data from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = data;

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
