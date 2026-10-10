import { CompleteAssessment } from '../types/assessment';
import { calculateKuppuswamyIncomeScore, getKuppuswamyClass } from '../data/clinicalKnowledge';

export function calculateAgeFromDOB(dobString: string): string {
  if (!dobString) return '';
  // Support DD/MM/YYYY or YYYY-MM-DD
  let day: number, month: number, year: number;
  if (dobString.includes('/')) {
    const parts = dobString.split('/');
    if (parts.length !== 3) return '';
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10) - 1;
    year = parseInt(parts[2], 10);
  } else if (dobString.includes('-')) {
    const parts = dobString.split('-');
    if (parts.length !== 3) return '';
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10) - 1;
    day = parseInt(parts[2], 10);
  } else {
    return '';
  }

  const birthDate = new Date(year, month, day);
  if (isNaN(birthDate.getTime())) return '';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? String(age) : '';
}

export function calculateBMI(heightCmStr: string, weightKgStr: string): { bmi: string; category: string } {
  const heightCm = parseFloat(heightCmStr);
  const weightKg = parseFloat(weightKgStr);

  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return { bmi: '', category: '' };
  }

  const heightM = heightCm / 100;
  const bmiNum = weightKg / (heightM * heightM);
  const bmi = bmiNum.toFixed(1);

  let category = '';
  if (bmiNum < 18.5) {
    category = 'Underweight (<18.5)';
  } else if (bmiNum < 23.0) {
    category = 'Normal Weight (18.5–22.9 Asian / 18.5–24.9 WHO)';
  } else if (bmiNum < 25.0) {
    category = 'Overweight (Asian criteria ≥23.0)';
  } else if (bmiNum < 30.0) {
    category = 'Overweight (WHO criteria 25.0–29.9)';
  } else if (bmiNum < 35.0) {
    category = 'Obesity Class I (30.0–34.9)';
  } else {
    category = 'Obesity Class II/III (≥35.0)';
  }

  return { bmi, category };
}

export function updateKuppuswamyCalculation(assessment: CompleteAssessment): CompleteAssessment {
  const eduScore = Number(assessment.socioeconomic.educationLevel) || 1;
  const occScore = Number(assessment.socioeconomic.occupationLevel) || 1;
  const inc = Number(assessment.socioeconomic.monthlyIncomeINR) || 0;
  const incScore = calculateKuppuswamyIncomeScore(inc);
  const total = eduScore + occScore + incScore;
  const socioClass = getKuppuswamyClass(total);

  return {
    ...assessment,
    socioeconomic: {
      ...assessment.socioeconomic,
      educationScore: eduScore,
      occupationScore: occScore,
      incomeScore: incScore,
      totalScore: total,
      socioeconomicClass: socioClass,
    },
  };
}

export interface ValidationReport {
  requiredMissing: string[];
  recommendedAssessments: string[];
  completedSections: string[];
  hasRedFlags: boolean;
  completionPercentage: number;
}

export function validateAssessment(assessment: CompleteAssessment): ValidationReport {
  const missing: string[] = [];
  const recommended: string[] = [];
  const completed: string[] = [];

  // 1. Patient Identification
  if (!assessment.identification.name.trim()) {
    missing.push('Patient Full Name (Section 1)');
  }
  if (!assessment.identification.age.trim() && !assessment.identification.dob.trim()) {
    missing.push('Patient Age or Date of Birth (Section 1)');
  }
  if (!assessment.identification.gender) {
    missing.push('Patient Gender (Section 1)');
  }
  if (!assessment.identification.dateOfAssessment) {
    missing.push('Date of Assessment (Section 1)');
  }
  if (assessment.identification.name && (assessment.identification.age || assessment.identification.dob) && assessment.identification.gender) {
    completed.push('Section 1: Patient Identification');
  }

  // 2. Vital Signs
  if (!assessment.vitals.heartRate.trim() && !assessment.vitals.pulseRate.trim()) {
    missing.push('Heart Rate / Pulse Rate (Section 2)');
  }
  if (!assessment.vitals.bpSystolic.trim() || !assessment.vitals.bpDiastolic.trim()) {
    missing.push('Blood Pressure mmHg (Section 2)');
  }
  if (!assessment.vitals.spo2.trim()) {
    recommended.push('Oxygen Saturation SpO₂ % baseline (Section 2)');
  }
  if ((assessment.vitals.heartRate || assessment.vitals.pulseRate) && assessment.vitals.bpSystolic) {
    completed.push('Section 2: Vital Signs');
  }

  // 3. Chief Complaints
  const hasValidComplaint = assessment.chiefComplaints.some(c => c.complaint.trim().length > 0) || assessment.chiefComplaintsGeneral.trim().length > 0;
  if (!hasValidComplaint) {
    missing.push('Primary Chief Complaint (Section 3)');
  } else {
    completed.push('Section 3: Chief Complaints');
  }

  // 4. HPI
  if (!assessment.hpi.modeOfOnset && !assessment.hpi.dateOfOnset && !assessment.hpi.clinicalNotes.trim()) {
    missing.push('History of Present Illness (Onset & Clinical history) (Section 4)');
  } else {
    completed.push('Section 4: History of Present Illness');
  }

  // 5. Past Medical History
  if (assessment.pastMedicalHistory.selectedConditions.length > 0 || assessment.pastMedicalHistory.additionalNotes.trim()) {
    completed.push('Section 5: Past Medical History');
  } else {
    recommended.push('Review past medical comorbidities or state "Nil significant" (Section 5)');
  }

  // 10 & 11. Pain Assessment
  if (assessment.pain.sites.length === 0 && !assessment.pain.primarySite.trim() && !assessment.pain.freeTextLocation.trim()) {
    missing.push('Pain Site & Anatomical Location (Section 10)');
  }
  if (!assessment.pain.intensity && assessment.pain.vasScore === 0 && assessment.pain.nprsCurrent === 0) {
    recommended.push('Quantified Pain Rating (VAS / NPRS score or intensity) (Section 11)');
  }
  if (assessment.pain.primarySite || assessment.pain.sites.length > 0 || assessment.pain.vasScore > 0) {
    completed.push('Section 10 & 11: Pain Assessment & Scales');
  }

  // 12. Observation
  if (!assessment.observation.postureHead && !assessment.observation.postureLumbar && !assessment.observation.gaitType && !assessment.observation.generalObservations.trim()) {
    missing.push('Objective Observation (Posture and Gait findings) (Section 12)');
  } else {
    completed.push('Section 12: Observation');
  }

  // 13. Palpation
  if (!assessment.palpation.tendernessPresent && !assessment.palpation.oedema && !assessment.palpation.palpationNotes.trim()) {
    missing.push('Palpation Findings (Tenderness / Warmth / Crepitus) (Section 13)');
  } else {
    completed.push('Section 13: Palpation');
  }

  // 14. Specialty Examination
  const spec = assessment.specialty;
  if (spec === 'orthopaedic') {
    const hasRom = assessment.orthopaedicExam.romList.some(r => r.activeRom || r.passiveRom);
    const hasMmt = assessment.orthopaedicExam.muscleStrengthList.some(m => m.mmtGrade);
    if (!hasRom && !hasMmt && !assessment.orthopaedicExam.flexibilityTests.trim()) {
      missing.push('Orthopaedic Objective Examination (ROM / MMT / Joint exam) (Section 14)');
    } else {
      completed.push('Section 14: Orthopaedic / MSK Examination');
    }
  } else if (spec === 'neurological') {
    if (!assessment.neurologicalExam.motorTone && !assessment.neurologicalExam.motorPower && !assessment.neurologicalExam.neuroGait) {
      missing.push('Neurological Motor Examination (Tone, Power, Gait) (Section 14)');
    } else {
      completed.push('Section 14: Neurological Examination');
    }
  } else if (spec === 'cardiopulmonary') {
    if (!assessment.cardiopulmonaryExam.breathSounds && !assessment.cardiopulmonaryExam.dyspnoeaLevel) {
      missing.push('Cardiopulmonary Examination (Breath sounds, Exercise tolerance) (Section 14)');
    } else {
      completed.push('Section 14: Cardiopulmonary Examination');
    }
  } else if (spec === 'geriatric') {
    if (!assessment.geriatricExam.fallRiskScore && !assessment.geriatricExam.balanceDynamic) {
      missing.push('Geriatric Mobility & Fall Risk Assessment (Section 14)');
    } else {
      completed.push('Section 14: Geriatric Examination');
    }
  } else {
    completed.push(`Section 14: Specialty Examination (${spec})`);
  }

  // 16. Medical Diagnosis
  if (!assessment.medicalDiagnosis.primaryDiagnosis.trim()) {
    recommended.push('Medical Diagnosis from treating medical professional (Section 16)');
  } else {
    completed.push('Section 16: Medical Diagnosis');
  }

  // 17. Physiotherapy Diagnosis (ICF)
  if (!assessment.physiotherapyDiagnosis.bodyStructureImpairments.trim() && !assessment.physiotherapyDiagnosis.bodyFunctionImpairments.trim()) {
    missing.push('Physiotherapy Diagnosis (Documented Body Structure & Function Impairments) (Section 17)');
  } else {
    completed.push('Section 17: Physiotherapy Diagnosis');
  }

  // 21. Goals
  if (assessment.goals.length === 0) {
    missing.push('SMART Physiotherapy Goals (Short-term or Long-term) (Section 21)');
  } else {
    completed.push('Section 21: SMART Goals');
  }

  // 22. Management
  if (!assessment.management.therapeuticExercise.trim() && !assessment.management.education.trim() && assessment.management.homeExerciseProgramme.length === 0) {
    missing.push('Physiotherapy Management Plan & Home Exercise Programme (Section 22)');
  } else {
    completed.push('Section 22: Management Plan & HEP');
  }

  // 23. Red Flags
  const hasRedFlags =
    assessment.redFlags.cardiovascularRedFlags.length > 0 ||
    assessment.redFlags.respiratoryRedFlags.length > 0 ||
    assessment.redFlags.neurologicalRedFlags.length > 0 ||
    assessment.redFlags.musculoskeletalRedFlags.length > 0 ||
    assessment.redFlags.clinicalReviewRequired;

  if (hasRedFlags) {
    recommended.push('⚠️ ALERT: One or more clinical red flags flagged - Ensure urgent physician liaison if indicated (Section 23)');
  }
  completed.push('Section 23: Precautions & Red Flags Review');

  const totalKeyCheckpoints = 12;
  const passedCheckpoints = Math.max(0, totalKeyCheckpoints - missing.length);
  const completionPercentage = Math.round((passedCheckpoints / totalKeyCheckpoints) * 100);

  return {
    requiredMissing: missing,
    recommendedAssessments: recommended,
    completedSections: completed,
    hasRedFlags,
    completionPercentage,
  };
}
