import { SpecialtyType } from '../types/assessment';

export const SPECIALTIES: { id: SpecialtyType; label: string; icon: string; description: string }[] = [
  { id: 'orthopaedic', label: 'Orthopaedic / Musculoskeletal', icon: 'Bone', description: 'Joints, bones, ligaments, tendons, post-op arthroplasty & fractures' },
  { id: 'neurological', label: 'Neurological', icon: 'Brain', description: 'Stroke, Parkinsonism, SCI, TBI, neuropathy & motor disorders' },
  { id: 'cardiopulmonary', label: 'Cardiopulmonary', icon: 'Activity', description: 'COPD, CABG rehab, asthma, bronchiectasis & cardiac conditioning' },
  { id: 'geriatric', label: 'Geriatric', icon: 'HeartHandshake', description: 'Fall risks, frailty, cognitive screening, Katz ADL & mobility' },
  { id: 'womens_health', label: "Gynaecological / Women's Health", icon: 'UserCheck', description: 'Pelvic floor dysfunction, antenatal, postnatal & diastasis' },
  { id: 'paediatric', label: 'Paediatric', icon: 'Baby', description: 'Cerebral palsy, developmental delay, clubfoot & paediatric milestones' },
  { id: 'sports', label: 'Sports Physiotherapy', icon: 'Trophy', description: 'Athletic injury, return-to-sport testing, functional biomechanics' },
  { id: 'brain_spine', label: 'Brain & Spine', icon: 'ShieldAlert', description: 'Post-neurosurgery, spine stabilization, radiculopathy & disc disease' },
  { id: 'trauma', label: 'Road Traffic Accident / Trauma', icon: 'Ambulance', description: 'Polytrauma, whip-lash, external fixators, severe contusions' },
  { id: 'other', label: 'Other Clinical Specialty', icon: 'Stethoscope', description: 'General or multi-system clinical rehabilitation' },
];

export const COMMON_OCCUPATIONS = [
  'Student',
  'Office/IT professional',
  'Healthcare professional',
  'Teacher',
  'Homemaker',
  'Manual labourer',
  'Farmer',
  'Driver',
  'Industrial worker',
  'Business/self-employed',
  'Retired',
  'Athlete/Sportsperson',
  'Unemployed',
  'Other',
];

export const MARITAL_STATUSES = [
  'Single',
  'Married',
  'Widowed',
  'Divorced',
  'Separated',
  'Other',
  'Prefer not to say',
];

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Transgender Male',
  'Transgender Female',
  'Non-binary',
  'Prefer to self-describe',
  'Prefer not to say',
];

export const PAST_CONDITIONS_LIST = [
  'Diabetes mellitus',
  'Hypertension',
  'Cardiovascular disease',
  'Respiratory disease',
  'Neurological disorder',
  'Musculoskeletal disorder',
  'Cancer',
  'Kidney disease',
  'Liver disease',
  'Thyroid disorder',
  'Osteoporosis',
  'Arthritis',
  'Previous fracture',
  'Previous stroke',
  'Previous surgery',
  'Previous hospitalization',
  'Psychiatric/mental health history',
  'Other',
];

export const DIET_OPTIONS = [
  'Vegetarian',
  'Non-vegetarian',
  'Eggetarian',
  'Vegan',
  'Mixed diet',
  'Therapeutic/medical diet',
  'Diabetic diet',
  'Low-salt diet',
  'Low-fat diet',
  'Other',
];

export const SLEEP_DISTURBANCE_OPTIONS = [
  'None',
  'Pain',
  'Breathlessness',
  'Frequent awakening',
  'Difficulty falling asleep',
  'Early awakening',
  'Other',
];

export const KUPPUSWAMY_EDUCATION_SCALE = [
  { score: 7, label: 'Profession or Honours (Post-graduate / Doctorate)' },
  { score: 6, label: 'Graduate or post-graduate diploma' },
  { score: 5, label: 'Intermediate or post-high-school diploma' },
  { score: 4, label: 'High school certificate (Class 10)' },
  { score: 3, label: 'Middle school certificate (Class 8)' },
  { score: 2, label: 'Primary school certificate (Class 5)' },
  { score: 1, label: 'Illiterate' },
];

export const KUPPUSWAMY_OCCUPATION_SCALE = [
  { score: 10, label: 'Professionals (Doctors, Engineers, Lawyers, Executives)' },
  { score: 6, label: 'Semi-Professionals (Teachers, Nurses, Technical Officers)' },
  { score: 5, label: 'Clerical, Shop-owners, Farm owners' },
  { score: 4, label: 'Skilled worker (Carpenters, Electricians, Mechanics)' },
  { score: 3, label: 'Semi-skilled worker (Machine operators, Drivers)' },
  { score: 2, label: 'Unskilled worker (Peons, Manual laborers, Cleaners)' },
  { score: 1, label: 'Unemployed' },
];

export const KUPPUSWAMY_SCALE_VERSION = 'Modified Kuppuswamy Scale (Consumer Price Index Updated 2024/2025)';

export function calculateKuppuswamyIncomeScore(monthlyIncome: number): number {
  if (monthlyIncome >= 93680) return 12;
  if (monthlyIncome >= 46840) return 10;
  if (monthlyIncome >= 35130) return 6;
  if (monthlyIncome >= 23420) return 4;
  if (monthlyIncome >= 14050) return 3;
  if (monthlyIncome >= 4690) return 2;
  return 1;
}

export function getKuppuswamyClass(totalScore: number): 'Upper' | 'Upper-middle' | 'Lower-middle' | 'Upper-lower' | 'Lower' {
  if (totalScore >= 26) return 'Upper';
  if (totalScore >= 16) return 'Upper-middle';
  if (totalScore >= 11) return 'Lower-middle';
  if (totalScore >= 5) return 'Upper-lower';
  return 'Lower';
}

export const BODY_PARTS_DIAGRAM = [
  { id: 'Head & Face', label: 'Head & Face', side: 'Central' },
  { id: 'Cervical Spine (Neck)', label: 'Cervical Spine', side: 'Central' },
  { id: 'Right Shoulder', label: 'R Shoulder', side: 'Right' },
  { id: 'Left Shoulder', label: 'L Shoulder', side: 'Left' },
  { id: 'Thoracic Spine (Mid Back)', label: 'Thoracic Spine', side: 'Central' },
  { id: 'Lumbar Spine (Low Back)', label: 'Lumbar Spine', side: 'Central' },
  { id: 'Right Elbow', label: 'R Elbow', side: 'Right' },
  { id: 'Left Elbow', label: 'L Elbow', side: 'Left' },
  { id: 'Right Wrist & Hand', label: 'R Wrist/Hand', side: 'Right' },
  { id: 'Left Wrist & Hand', label: 'L Wrist/Hand', side: 'Left' },
  { id: 'Pelvis & Sacroiliac', label: 'Pelvis / SIJ', side: 'Central' },
  { id: 'Right Hip & Groin', label: 'R Hip', side: 'Right' },
  { id: 'Left Hip & Groin', label: 'L Hip', side: 'Left' },
  { id: 'Right Knee', label: 'R Knee', side: 'Right' },
  { id: 'Left Knee', label: 'L Knee', side: 'Left' },
  { id: 'Right Ankle & Foot', label: 'R Ankle/Foot', side: 'Right' },
  { id: 'Left Ankle & Foot', label: 'L Ankle/Foot', side: 'Left' },
  { id: 'Chest / Thorax', label: 'Chest/Anterior Thorax', side: 'Central' },
  { id: 'Abdominal Wall', label: 'Abdomen / Core', side: 'Central' },
];

export const PAIN_TYPES = [
  'Dull',
  'Aching',
  'Sharp',
  'Stabbing',
  'Burning',
  'Throbbing',
  'Cramping',
  'Shooting',
  'Electric/shock-like',
  'Tingling-associated',
  'Pins and needles',
  'Deep somatic',
];

export const AGGRAVATING_FACTORS_LIST = [
  'Movement',
  'Weight-bearing',
  'Walking',
  'Running',
  'Stairs',
  'Sitting',
  'Standing',
  'Lying',
  'Coughing',
  'Sneezing',
  'Deep breathing',
  'Reaching overhead',
  'Lifting',
  'Repetitive activity',
  'Night / Bed rest',
  'Forward bending',
  'Backward bending',
];

export const RELIEVING_FACTORS_LIST = [
  'Rest',
  'Position change',
  'Heat application',
  'Cold / Ice pack',
  'Medication / Analgesics',
  'Gentle exercise / Walking',
  'Massage / Soft tissue release',
  'Support / Bracing / Splint',
  'Supine lying with knees flexed',
  'Traction / Decompression',
];

export const PAIN_BEHAVIOUR_LIST = [
  'Constant',
  'Intermittent',
  'Activity-related',
  'Mechanical',
  'Night pain',
  'Rest pain',
  'Morning pain & stiffness',
  'End of day fatigue pain',
];

export const GAIT_TYPES = [
  'Normal',
  'Antalgic',
  'Ataxic',
  'Hemiplegic',
  'Steppage',
  'Trendelenburg',
  'Parkinsonian',
  'Spastic',
  'Festinating',
  'Circumduction',
  'Foot drop',
  'Assistive-device dependent',
  'Wheelchair bound',
  'Other',
];

export const SUGGESTED_SPECIAL_TESTS: { [key: string]: { name: string; purpose: string; region: string }[] } = {
  orthopaedic: [
    { name: "Neer's Impingement Test", purpose: 'Subacromial impingement / rotator cuff irritation', region: 'Shoulder' },
    { name: 'Hawkins-Kennedy Test', purpose: 'Subacromial impingement syndrome', region: 'Shoulder' },
    { name: 'Empty Can (Jobe) Test', purpose: 'Supraspinatus tendon tear or pathology', region: 'Shoulder' },
    { name: 'Speed\'s & Yergason\'s Test', purpose: 'Biceps long head tendinopathy or SLAP tear', region: 'Shoulder' },
    { name: 'Straight Leg Raise (SLR)', purpose: 'L4-S1 nerve root irritation / dural tension', region: 'Lumbar Spine' },
    { name: 'Slump Test', purpose: 'Neural tissue tension across spinal canal and dura', region: 'Spine' },
    { name: 'FABER (Patrick) Test', purpose: 'Sacroiliac joint dysfunction or hip pathology', region: 'Pelvis/Hip' },
    { name: 'FADIR Test', purpose: 'Femoroacetabular impingement (FAI) or labral tear', region: 'Hip' },
    { name: 'Lachman Test', purpose: 'Anterior cruciate ligament (ACL) integrity', region: 'Knee' },
    { name: 'Anterior / Posterior Drawer Test', purpose: 'ACL / PCL ligamentous stability', region: 'Knee' },
    { name: 'McMurray Test', purpose: 'Meniscal tear (medial / lateral meniscus)', region: 'Knee' },
    { name: 'Anterior Drawer Test of Ankle', purpose: 'Anterior talofibular ligament (ATFL) laxity', region: 'Ankle' },
    { name: 'Thompson (Simmonds) Test', purpose: 'Achilles tendon rupture', region: 'Ankle' },
    { name: 'Phalen\'s & Tinel\'s Sign', purpose: 'Carpal tunnel syndrome (median nerve compression)', region: 'Wrist/Hand' },
  ],
  neurological: [
    { name: 'Babinski Sign', purpose: 'Upper motor neuron (UMN) pyramidal tract lesion', region: 'Pathological Reflex' },
    { name: 'Hoffmann Sign', purpose: 'Cervical myelopathy or UMN hyperreflexia', region: 'Pathological Reflex' },
    { name: 'Clonus Test (Ankle/Patellar)', purpose: 'Sustained reflex excitability / spasticity', region: 'Reflexes' },
    { name: 'Modified Ashworth Scale (MAS)', purpose: 'Muscle tone and spasticity grading (0-4)', region: 'Motor Tone' },
    { name: 'Romberg Test (Eyes Open vs Closed)', purpose: 'Sensory ataxia vs cerebellar balance deficit', region: 'Vestibular/Proprioception' },
    { name: 'Finger-Nose-Finger Test', purpose: 'Cerebellar dysmetria and intention tremor', region: 'Coordination' },
    { name: 'Rapid Alternating Movements (Dysdiadochokinesia)', purpose: 'Cerebellar hemisphere function', region: 'Coordination' },
    { name: 'Heel-to-Shin Test', purpose: 'Lower limb cerebellar coordination', region: 'Coordination' },
    { name: 'Berg Balance Scale (BBS)', purpose: 'Static and dynamic balance assessment (out of 56)', region: 'Balance' },
    { name: 'Timed Up and Go (TUG)', purpose: 'Mobility and fall risk screening (>12-14s high risk)', region: 'Functional Mobility' },
  ],
  cardiopulmonary: [
    { name: '6-Minute Walk Test (6MWT)', purpose: 'Submaximal functional cardiopulmonary exercise capacity', region: 'Endurance' },
    { name: 'Incremental Shuttle Walk Test (ISWT)', purpose: 'Maximal exercise tolerance in respiratory disease', region: 'Tolerance' },
    { name: 'Chest Expansion Measurement (Tape)', purpose: 'Thoracic wall compliance at 4th intercostal & xiphisternal', region: 'Chest Wall' },
    { name: 'Peak Expiratory Flow Rate (PEFR)', purpose: 'Large airway caliber and bronchodilator reversibility', region: 'Airway' },
    { name: 'Modified Borg Dyspnoea Scale (0-10)', purpose: 'Subjective breathlessness during functional tasks', region: 'Dyspnoea' },
    { name: '1-Minute Sit-to-Stand Test (1MSTS)', purpose: 'Functional exercise capacity in limited space', region: 'Lower Body' },
  ],
  geriatric: [
    { name: 'Timed Up and Go (TUG)', purpose: 'Mobility, dynamic balance and fall risk', region: 'Mobility' },
    { name: '30-Second Chair Stand Test', purpose: 'Lower extremity functional strength and endurance', region: 'Strength' },
    { name: '4-Stage Balance Test', purpose: 'Static balance (parallel, semi-tandem, tandem, single-leg)', region: 'Balance' },
    { name: 'Functional Reach Test', purpose: 'Dynamic anterior limit of stability and fall prediction', region: 'Balance' },
    { name: 'Katz Index of Independence in ADL', purpose: 'Basic ADL functional independence (score /6)', region: 'ADL' },
    { name: 'Lawton-Brody IADL Scale', purpose: 'Instrumental activities of daily living (score /8)', region: 'IADL' },
  ],
  womens_health: [
    { name: 'Modified Oxford Grading (0-5)', purpose: 'Digital vaginal assessment of pelvic floor muscle strength', region: 'Pelvic Floor' },
    { name: 'PERFECT Scheme Evaluation', purpose: 'Power, Endurance, Repetitions, Fast contractions, Every Contraction Timed', region: 'Pelvic Floor' },
    { name: 'Diastasis Recti Caliper/Finger Width Test', purpose: 'Inter-recti distance (IRD) supra/infraumbilical', region: 'Abdominal Wall' },
    { name: 'Active Straight Leg Raise (Pelvic Girdle)', purpose: 'Form and force closure of sacroiliac joints during pregnancy', region: 'Pelvic Ring' },
    { name: 'Cough Stress Test', purpose: 'Urinary leakage during increased intra-abdominal pressure', region: 'Continence' },
  ],
  paediatric: [
    { name: 'Gross Motor Function Classification System (GMFCS)', purpose: 'Motor function classification in cerebral palsy (Level I-V)', region: 'Functional Mobility' },
    { name: 'Peabody Developmental Motor Scales (PDMS-2)', purpose: 'Early childhood gross and fine motor integration', region: 'Development' },
    { name: 'Barlow & Ortolani Maneuvers', purpose: 'Developmental dysplasia of the hip (DDH) screen', region: 'Hip' },
    { name: 'Gower\'s Sign', purpose: 'Proximal muscle weakness screening (muscular dystrophy)', region: 'Neuromuscular' },
    { name: 'Pediatric Balance Scale (PBS)', purpose: 'Balance in children with motor impairments', region: 'Balance' },
  ],
};

export const RED_FLAGS_CATALOG = {
  cardiovascular: [
    'Unstable angina or severe unmanaged chest pain radiating to jaw/left arm',
    'Uncontrolled arrhythmias or syncope during mild exertion',
    'Resting BP >180/110 mmHg or severe symptomatic hypotension',
    'Calf swelling, erythema, localized tenderness, positive Wells score (Suspected DVT)',
  ],
  respiratory: [
    'Acute resting dyspnoea with resting SpO2 <90% on room air',
    'Stridor or acute airway obstruction signs',
    'Hemoptysis without prior medical diagnosis or investigation',
    'Acute onset asymmetric chest pain with severe breathlessness (Pneumothorax screen)',
  ],
  neurological: [
    'Saddle anesthesia, recent onset urinary retention or bowel incontinence (Cauda Equina)',
    'Rapidly progressing bilateral motor weakness or ascending sensory loss',
    'Sudden severe "thunderclap" headache, cranial nerve palsy, or acute dysarthria (Stroke/Aneurysm)',
    'Babinski or sustained clonus of new onset not previously evaluated',
  ],
  musculoskeletal: [
    'Unexplained severe deep night pain unremitting with position or rest (Neoplasm screen)',
    'Constitutional symptoms: Unexplained weight loss, night sweats, persistent fever',
    'History of major trauma with gross bony deformity, inability to bear weight (Ottawa rules)',
    'Hot, erythematous, acutely swollen joint with systemic fever (Septic arthritis)',
  ],
  general: [
    'Active, expanding wound infection with purulent drainage and cellulitis',
    'Recent spinal surgery with leaking CSF, localized fluctuance, or wound dehiscence',
    'Severe osteoporotic pain following sudden axial loading or coughing (Vertebral wedge compression)',
  ],
};
