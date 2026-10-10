import { CompleteAssessment } from '../types/assessment';
import { createEmptyAssessment } from '../data/defaultAssessment';

const STORAGE_KEY = 'physio_assessment_pro_current_session';

export function saveAssessmentToLocalStorage(assessment: CompleteAssessment): boolean {
  try {
    const updated = {
      ...assessment,
      lastSavedAt: new Date().toISOString(),
    };
    const serialized = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (err) {
    console.error('Failed to save assessment to LocalStorage:', err);
    return false;
  }
}

export function loadAssessmentFromLocalStorage(): CompleteAssessment | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    // Merge with default to guarantee all fields are present even if schema was extended
    const empty = createEmptyAssessment();
    return {
      ...empty,
      ...parsed,
      identification: { ...empty.identification, ...(parsed.identification || {}) },
      vitals: { ...empty.vitals, ...(parsed.vitals || {}) },
      hpi: { ...empty.hpi, ...(parsed.hpi || {}) },
      pastMedicalHistory: { ...empty.pastMedicalHistory, ...(parsed.pastMedicalHistory || {}) },
      presentHistory: { ...empty.presentHistory, ...(parsed.presentHistory || {}) },
      surgicalHistory: { ...empty.surgicalHistory, ...(parsed.surgicalHistory || {}) },
      socioeconomic: { ...empty.socioeconomic, ...(parsed.socioeconomic || {}) },
      environmental: { ...empty.environmental, ...(parsed.environmental || {}) },
      pain: { ...empty.pain, ...(parsed.pain || {}) },
      observation: { ...empty.observation, ...(parsed.observation || {}) },
      palpation: { ...empty.palpation, ...(parsed.palpation || {}) },
      orthopaedicExam: { ...empty.orthopaedicExam, ...(parsed.orthopaedicExam || {}) },
      neurologicalExam: { ...empty.neurologicalExam, ...(parsed.neurologicalExam || {}) },
      cardiopulmonaryExam: { ...empty.cardiopulmonaryExam, ...(parsed.cardiopulmonaryExam || {}) },
      geriatricExam: { ...empty.geriatricExam, ...(parsed.geriatricExam || {}) },
      womensHealthExam: { ...empty.womensHealthExam, ...(parsed.womensHealthExam || {}) },
      paediatricExam: { ...empty.paediatricExam, ...(parsed.paediatricExam || {}) },
      medicalDiagnosis: { ...empty.medicalDiagnosis, ...(parsed.medicalDiagnosis || {}) },
      physiotherapyDiagnosis: { ...empty.physiotherapyDiagnosis, ...(parsed.physiotherapyDiagnosis || {}) },
      management: { ...empty.management, ...(parsed.management || {}) },
      redFlags: { ...empty.redFlags, ...(parsed.redFlags || {}) },
      followUp: { ...empty.followUp, ...(parsed.followUp || {}) },
    };
  } catch (err) {
    console.error('Failed to load assessment from LocalStorage:', err);
    return null;
  }
}

export function clearAssessmentLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear LocalStorage:', err);
  }
}

export function downloadAssessmentAsJSON(assessment: CompleteAssessment): void {
  const patientName = assessment.identification.name
    ? assessment.identification.name.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'Patient';
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `PhysioAssessment_${patientName}_${dateStr}.json`;

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assessment, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseUploadedJSON(fileContent: string): CompleteAssessment {
  const parsed = JSON.parse(fileContent);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid JSON format: expected an object.');
  }
  const empty = createEmptyAssessment();
  return {
    ...empty,
    ...parsed,
    identification: { ...empty.identification, ...(parsed.identification || {}) },
    vitals: { ...empty.vitals, ...(parsed.vitals || {}) },
    hpi: { ...empty.hpi, ...(parsed.hpi || {}) },
    pastMedicalHistory: { ...empty.pastMedicalHistory, ...(parsed.pastMedicalHistory || {}) },
    presentHistory: { ...empty.presentHistory, ...(parsed.presentHistory || {}) },
    surgicalHistory: { ...empty.surgicalHistory, ...(parsed.surgicalHistory || {}) },
    socioeconomic: { ...empty.socioeconomic, ...(parsed.socioeconomic || {}) },
    environmental: { ...empty.environmental, ...(parsed.environmental || {}) },
    pain: { ...empty.pain, ...(parsed.pain || {}) },
    observation: { ...empty.observation, ...(parsed.observation || {}) },
    palpation: { ...empty.palpation, ...(parsed.palpation || {}) },
    orthopaedicExam: { ...empty.orthopaedicExam, ...(parsed.orthopaedicExam || {}) },
    neurologicalExam: { ...empty.neurologicalExam, ...(parsed.neurologicalExam || {}) },
    cardiopulmonaryExam: { ...empty.cardiopulmonaryExam, ...(parsed.cardiopulmonaryExam || {}) },
    geriatricExam: { ...empty.geriatricExam, ...(parsed.geriatricExam || {}) },
    womensHealthExam: { ...empty.womensHealthExam, ...(parsed.womensHealthExam || {}) },
    paediatricExam: { ...empty.paediatricExam, ...(parsed.paediatricExam || {}) },
    medicalDiagnosis: { ...empty.medicalDiagnosis, ...(parsed.medicalDiagnosis || {}) },
    physiotherapyDiagnosis: { ...empty.physiotherapyDiagnosis, ...(parsed.physiotherapyDiagnosis || {}) },
    management: { ...empty.management, ...(parsed.management || {}) },
    redFlags: { ...empty.redFlags, ...(parsed.redFlags || {}) },
    followUp: { ...empty.followUp, ...(parsed.followUp || {}) },
  };
}
