export type SpecialtyType =
  | 'orthopaedic'
  | 'neurological'
  | 'cardiopulmonary'
  | 'geriatric'
  | 'womens_health'
  | 'paediatric'
  | 'sports'
  | 'brain_spine'
  | 'trauma'
  | 'other';

export interface PatientIdentification {
  name: string;
  dob: string;
  age: string;
  gender: string;
  genderOther: string;
  occupation: string;
  occupationOther: string;
  address: string;
  phone: string;
  email: string;
  emergencyContact: string;
  relationship: string;
  dateOfAdmission: string;
  dateOfAssessment: string;
  heightCm: string;
  weightKg: string;
  bmi: string;
  bmiCategory: string;
  maritalStatus: string;
}

export interface VitalSigns {
  heartRate: string;
  heartRateRhythm: 'Regular' | 'Irregular' | 'Not assessed' | '';
  pulseRate: string;
  pulseCharacter: 'Regular' | 'Irregular' | 'Weak' | 'Bounding' | 'Not assessed' | '';
  bpSystolic: string;
  bpDiastolic: string;
  grbs: string;
  grbsType: 'Fasting' | 'Random' | 'Post-prandial' | 'Other' | 'Not assessed' | '';
  spo2: string;
  respiratoryRate: string;
  temperature: string;
  respiratoryPattern: string;
  oxygenRequirement: string;
  painPhysiologicalResponse: string;
  orthostaticBp: string;
  peakFlow: string;
  borgRating: string;
  additionalNotes: string;
}

export interface ChiefComplaintItem {
  id: string;
  complaint: string;
  site: string;
  duration: string;
  severity: string;
  frequency: string;
  functionalLimitation: string;
  mainConcern: string;
}

export interface HistoryOfPresentIllness {
  dateOfOnset: string;
  mechanismOfInjury: string;
  modeOfOnset: 'Sudden' | 'Gradual' | 'Insidious' | 'Traumatic' | 'Recurrent' | 'Other' | '';
  modeOfOnsetOther: string;
  progression: 'Improving' | 'Static' | 'Deteriorating' | 'Fluctuating' | 'Other' | '';
  previousTreatment: string;
  previousInvestigations: string;
  currentTreatment: string;
  aggravatingFactors: string;
  relievingFactors: string;
  functionalLimitations: string;
  associatedSymptoms: string;
  previousEpisodes: string;
  relevantRedFlags: string;
  clinicalNotes: string;
}

export interface PastMedicalConditionItem {
  id: string;
  condition: string;
  yearDiagnosed: string;
  currentStatus: 'Controlled' | 'Active' | 'Resolved' | 'Under Investigation' | 'Not assessed';
  treatmentMedication: string;
  complications: string;
}

export interface PresentHistory {
  diet: string;
  dietOther: string;
  mealsPerDay: string;
  fluidIntake: string;
  dietaryRestrictions: string;
  specialNutritionalConcerns: string;
  appetite: string;
  sleepQuality: string;
  sleepDurationHours: string;
  sleepDisturbance: string[];
  sleepDisturbanceOther: string;
  alcoholStatus: string;
  alcoholDetails: string;
  smokingStatus: string;
  smokingDetails: string;
  tobaccoStatus: string;
  tobaccoDetails: string;
  drugUseStatus: string;
  drugDetails: string;
  otherHabits: string;
  bowelStatus: string;
  bowelOther: string;
  bladderStatus: string;
  bladderOther: string;
}

export interface SurgicalHistoryItem {
  id: string;
  procedure: string;
  bodyRegion: string;
  date: string;
  indication: string;
  complications: string;
  rehabilitationReceived: string;
}

export interface KuppuswamySocioeconomic {
  educationLevel: number; // 1 to 7
  occupationLevel: number; // 1 to 10
  monthlyIncomeINR: number; // rupees
  educationScore: number;
  occupationScore: number;
  incomeScore: number;
  totalScore: number;
  socioeconomicClass: 'Upper' | 'Upper-middle' | 'Lower-middle' | 'Upper-lower' | 'Lower' | 'Not calculated';
  scaleVersion: string;
}

export interface EnvironmentalHistory {
  residence: string;
  houseType: string;
  houseTypeOther: string;
  accessibility: string[];
  accessibilityOther: string;
  environmentalHazards: string[];
  hazardsOther: string;
  assistiveRequirements: string;
}

export interface PainAssessment {
  sites: string[];
  primarySite: string;
  freeTextLocation: string;
  modeOfOnset: string;
  painType: string[];
  painTypeOther: string;
  intensity: 'Mild' | 'Moderate' | 'Severe' | 'Very severe' | 'Not assessed' | '';
  aggravatingFactors: string[];
  aggravatingOther: string;
  relievingFactors: string[];
  relievingOther: string;
  painBehaviour: string[];
  painBehaviourOther: string;
  vasScore: number; // 0 - 10
  nprsCurrent: number; // 0 - 10
  nprsBest: number; // 0 - 10
  nprsWorst: number; // 0 - 10
  painNotes: string;
}

export interface ObservationFinding {
  built: string;
  builtOther: string;
  attitude: string;
  postureHead: string;
  postureCervical: string;
  postureShoulders: string;
  postureThoracic: string;
  postureLumbar: string;
  posturePelvis: string;
  postureHip: string;
  postureKnee: string;
  postureAnkleFoot: string;
  postureUpperLimb: string;
  gaitType: string;
  gaitOther: string;
  gaitSpeed: string;
  gaitCadence: string;
  stepLength: string;
  strideLength: string;
  baseOfSupport: string;
  symmetry: string;
  swelling: string;
  swellingDetails: string;
  deformity: string;
  deformityDetails: string;
  scar: string;
  scarDetails: string;
  muscleAtrophy: string;
  muscleAtrophyDetails: string;
  trophicChanges: string[];
  trophicOther: string;
  externalAppliances: string[];
  appliancesOther: string;
  generalObservations: string;
}

export interface PalpationFinding {
  tendernessPresent: string; // 'Normal' | 'Present' | 'Absent' | 'Not assessed'
  tendernessSite: string;
  tendernessGrade: string; // Grade I, II, III, IV
  tendernessExtent: string;
  oedema: string; // Absent, Present, Pitting, Non-pitting
  oedemaGrade: string;
  oedemaSite: string;
  warmth: string; // Normal, Increased, Decreased, Not assessed
  crepitus: string; // Absent, Present
  crepitusSite: string;
  crepitusMovement: string;
  scarAssessment: {
    site: string;
    size: string;
    mobility: string;
    adherence: string;
    tenderness: string;
    healing: string;
    colour: string;
    otherFindings: string;
  };
  palpationNotes: string;
}

export interface RomMeasurement {
  joint: string;
  movement: string;
  side: 'Right' | 'Left' | 'Bilateral' | 'Spine';
  activeRom: string;
  passiveRom: string;
  normalRange: string;
  endFeel: string;
  painfulArc: string;
}

export interface MuscleStrengthItem {
  muscleGroup: string;
  side: 'Right' | 'Left' | 'Bilateral';
  mmtGrade: string; // 0, 1, 2-, 2, 2+, 3-, 3, 3+, 4-, 4, 4+, 5
  dynamometry: string;
}

export interface OrthopaedicExam {
  romList: RomMeasurement[];
  muscleStrengthList: MuscleStrengthItem[];
  flexibilityTests: string;
  jointExam: {
    alignment: string;
    stability: string;
    mobility: string;
    accessoryMovements: string;
  };
  limbLength: {
    trueLimbLengthR: string;
    trueLimbLengthL: string;
    apparentLimbLengthR: string;
    apparentLimbLengthL: string;
    notes: string;
  };
  functionalAssessment: {
    squat: string;
    sitToStand: string;
    walking: string;
    stairs: string;
    reaching: string;
    lifting: string;
    taskSpecific: string;
  };
}

export interface NeurologicalExam {
  higherMentalFunctions: {
    consciousness: string;
    orientation: string;
    attention: string;
    memory: string;
    speech: string;
    cognition: string;
  };
  cranialNerves: string;
  motorBulk: string;
  motorTone: string; // MAS scale, hypertonia, hypotonia, flaccid
  motorPower: string;
  involuntaryMovements: string;
  reflexesDTR: string;
  reflexesSuperficial: string;
  reflexesPathological: string;
  sensoryExam: {
    lightTouch: string;
    pain: string;
    temperature: string;
    pressure: string;
    vibration: string;
    proprioception: string;
    cortical: string;
  };
  coordination: {
    fingerNose: string;
    heelShin: string;
    rapidAlternating: string;
    other: string;
  };
  balance: {
    static: string;
    dynamic: string;
    sitting: string;
    standing: string;
    singleLegStance: string;
  };
  neuroGait: string;
  functionalMobility: {
    bedMobility: string;
    transfers: string;
    sitToStand: string;
    walking: string;
    stairs: string;
  };
  validatedScales: {
    name: string;
    score: string;
    interpretation: string;
  }[];
}

export interface CardiopulmonaryExam {
  heartRate: string;
  bloodPressure: string;
  pulseQuality: string;
  peripheralPerfusion: string;
  symptomsDuringActivity: string;
  respiratoryRate: string;
  respiratoryPattern: string;
  chestExpansion: string;
  breathSounds: string;
  cough: string;
  sputum: string;
  dyspnoeaLevel: string;
  spo2Rest: string;
  spo2Activity: string;
  oxygenDeliveryMethod: string;
  oxygenFlowRate: string;
  exerciseTolerance6MWT: string;
  iswtScore: string;
  sitToStandTest: string;
  borgRPE: string;
  borgDyspnoea: string;
  functionalCapacityNotes: string;
}

export interface GeriatricExam {
  functionalMobility: string;
  balanceStatic: string;
  balanceDynamic: string;
  fallRiskScore: string; // TUG, Berg, etc.
  strengthOverview: string;
  flexibilityOverview: string;
  gaitOverview: string;
  fallHistory: {
    numberOfFallsPastYear: string;
    recentFallDates: string;
    circumstances: string;
    injurySustained: string;
    fearOfFalling: string;
  };
  cognitiveScreening: string;
  adlKatz: {
    feeding: string;
    dressing: string;
    bathing: string;
    toileting: string;
    grooming: string;
    mobility: string;
  };
  iadlLawton: {
    cooking: string;
    shopping: string;
    medicationManagement: string;
    finances: string;
    transportation: string;
  };
  frailtyNutritionScreening: string;
}

export interface WomensHealthExam {
  menstrualHistory: string;
  pregnancyHistory: string;
  obstetricHistory: string;
  deliveryHistory: string;
  menopauseStatus: string;
  pelvicSymptoms: string;
  urinarySymptoms: string;
  bowelSymptoms: string;
  sexualHealthSymptoms: string;
  pelvicFloorExamConsented: boolean;
  pelvicFloorFunction: string;
  pelvicFloorStrengthModifiedOxford: string;
  pelvicFloorEndurance: string;
  pelvicFloorRepetitions: string;
  coordinationRelaxation: string;
  pregnancyTrimester: string;
  posturalChanges: string;
  postpartumDuration: string;
  deliveryType: string;
  diastasisRectiAssessment: string;
  functionalLimitations: string;
}

export interface PaediatricExam {
  developmentalMilestones: {
    grossMotor: string;
    fineMotor: string;
    communication: string;
    social: string;
    cognitive: string;
  };
  growth: {
    heightLengthCm: string;
    weightKg: string;
    headCircumferenceCm: string;
    percentiles: string;
  };
  neuromotorTone: string;
  primitiveReflexes: string;
  posturalReactions: string;
  motorControlCoordination: string;
  balance: string;
  musculoskeletalRom: string;
  musculoskeletalStrength: string;
  skeletalAlignment: string;
  deformityOrGait: string;
  functionalPlayAndSchool: string;
  outcomeMeasures: string;
}

export interface InvestigationItem {
  id: string;
  category: 'Imaging' | 'Blood' | 'Cardiopulmonary' | 'Neurological' | 'Other';
  testName: string;
  date: string;
  result: string;
  relevantFinding: string;
  clinicalSignificance: string;
}

export interface MedicalDiagnosis {
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  comorbidities: string;
  treatingPhysician: string;
  notes: string;
}

export interface PhysiotherapyDiagnosis {
  bodyStructureImpairments: string;
  bodyFunctionImpairments: string;
  activityLimitations: string;
  participationRestrictions: string;
  contextualFactors: string;
  evidenceBaseSummary: string;
}

export interface SpecialTestItem {
  id: string;
  testName: string;
  purpose: string;
  region: string;
  result: 'Positive' | 'Negative' | 'Equivocal' | 'Not performed' | 'Not applicable';
  findings: string;
  side: 'Right' | 'Left' | 'Bilateral' | 'Not applicable';
  painResponse: string;
}

export interface IcfProblemItem {
  category: 'Body Functions' | 'Body Structures' | 'Activity Limitations' | 'Participation Restrictions' | 'Environmental Factors' | 'Personal Factors';
  item: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Complete' | 'Not specified';
  notes: string;
}

export interface PrioritizedProblemItem {
  id: string;
  priority: 'Priority 1 — Immediate' | 'Priority 2 — Important' | 'Priority 3 — Secondary';
  problemDescription: string;
  clinicalJustification: string;
}

export interface SmartGoalItem {
  id: string;
  type: 'Short-Term' | 'Long-Term';
  target: string;
  measurement: string;
  timeframe: string;
  goalCategory: string;
}

export interface HomeExerciseItem {
  id: string;
  exerciseName: string;
  startingPosition: string;
  technique: string;
  repetitions: string;
  sets: string;
  frequency: string;
  duration: string;
  precautions: string;
  progressionRegression: string;
}

export interface ManagementPlan {
  education: string;
  painManagement: string;
  therapeuticExercise: string;
  manualTherapy: string;
  specialtyRehab: string;
  homeExerciseProgramme: HomeExerciseItem[];
  modalitiesPhysicalAgents: string;
}

export interface RedFlagsPrecautions {
  cardiovascularRedFlags: string[];
  respiratoryRedFlags: string[];
  neurologicalRedFlags: string[];
  musculoskeletalRedFlags: string[];
  postOperativePrecautions: string;
  fracturePrecautions: string;
  infectionPrecautions: string;
  cancerRelatedPrecautions: string;
  pregnancyPrecautions: string;
  paediatricPrecautions: string;
  geriatricFallRiskPrecautions: string;
  clinicalReviewRequired: boolean;
  clinicalReviewNotes: string;
}

export interface FollowUpReassessment {
  followUpDate: string;
  painInitial: string;
  painCurrent: string;
  romInitial: string;
  romCurrent: string;
  strengthInitial: string;
  strengthCurrent: string;
  functionalStatusInitial: string;
  functionalStatusCurrent: string;
  outcomeMeasureName: string;
  outcomeInitialScore: string;
  outcomeCurrentScore: string;
  treatmentResponse: 'Improved' | 'No significant change' | 'Deteriorated' | 'Fluctuating' | 'Not assessed';
  adherence: 'Good' | 'Moderate' | 'Poor' | 'Not assessed';
  planModification: string;
}

export interface CompleteAssessment {
  schemaVersion: string;
  lastSavedAt: string;
  specialty: SpecialtyType;
  specialtyOther: string;
  identification: PatientIdentification;
  vitals: VitalSigns;
  chiefComplaints: ChiefComplaintItem[];
  chiefComplaintsGeneral: string;
  hpi: HistoryOfPresentIllness;
  pastMedicalHistory: {
    selectedConditions: string[];
    conditionItems: PastMedicalConditionItem[];
    additionalNotes: string;
  };
  presentHistory: PresentHistory;
  surgicalHistory: {
    surgeries: SurgicalHistoryItem[];
    currentSurgicalStatus: string;
  };
  socioeconomic: KuppuswamySocioeconomic;
  environmental: EnvironmentalHistory;
  pain: PainAssessment;
  observation: ObservationFinding;
  palpation: PalpationFinding;
  orthopaedicExam: OrthopaedicExam;
  neurologicalExam: NeurologicalExam;
  cardiopulmonaryExam: CardiopulmonaryExam;
  geriatricExam: GeriatricExam;
  womensHealthExam: WomensHealthExam;
  paediatricExam: PaediatricExam;
  investigations: InvestigationItem[];
  medicalDiagnosis: MedicalDiagnosis;
  physiotherapyDiagnosis: PhysiotherapyDiagnosis;
  specialTests: SpecialTestItem[];
  icfProblems: IcfProblemItem[];
  prioritizedProblems: PrioritizedProblemItem[];
  goals: SmartGoalItem[];
  management: ManagementPlan;
  redFlags: RedFlagsPrecautions;
  followUp: FollowUpReassessment;
}
