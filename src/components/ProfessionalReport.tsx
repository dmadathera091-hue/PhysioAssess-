import React, { useState } from 'react';
import { CompleteAssessment } from '../types/assessment';
import { validateAssessment } from '../utils/calculations';
import {
  Printer,
  Copy,
  Check,
  FileText,
  AlertTriangle,
  Award,
  Stethoscope,
  ShieldAlert,
  Edit3,
} from 'lucide-react';

interface Props {
  assessment: CompleteAssessment;
  onEditInForm: () => void;
}

export const ProfessionalReport: React.FC<Props> = ({ assessment, onEditInForm }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [editableNarrative, setEditableNarrative] = useState<boolean>(false);
  const [customNarrativeNotes, setCustomNarrativeNotes] = useState<string>('');

  const validation = validateAssessment(assessment);
  const id = assessment.identification;
  const vitals = assessment.vitals;
  const pain = assessment.pain;
  const obs = assessment.observation;
  const palp = assessment.palpation;
  const spec = assessment.specialty;

  const handlePrint = () => {
    window.print();
  };

  const generateReportPlainText = (): string => {
    return `PHYSIOTHERAPY PATIENT ASSESSMENT & CLINICAL CONSULTATION REPORT
Date of Assessment: ${id.dateOfAssessment || 'Not provided'}
Facility / Department: Physiotherapy & Rehabilitation Sciences

1. PATIENT IDENTIFICATION
Name: ${id.name || '⚠️ MISSING REQUIRED FINDING'}
Age: ${id.age ? `${id.age} years` : 'Not assessed'} | DOB: ${id.dob || 'Not provided'}
Gender: ${id.gender || 'Not assessed'} | Occupation: ${id.occupation || 'Not assessed'}
Biometrics: Height ${id.heightCm ? `${id.heightCm} cm` : 'Not recorded'}, Weight ${id.weightKg ? `${id.weightKg} kg` : 'Not recorded'}, BMI ${id.bmi ? `${id.bmi} kg/m² (${id.bmiCategory})` : 'Not assessed'}
Marital Status: ${id.maritalStatus || 'Not assessed'} | Contact: ${id.phone || 'Not provided'}

2. PRESENTING CHIEF COMPLAINTS
${assessment.chiefComplaintsGeneral ? `Primary Summary: ${assessment.chiefComplaintsGeneral}\n` : ''}
${assessment.chiefComplaints
  .map(
    (c, i) =>
      `• Complaint #${i + 1}: ${c.complaint || 'Not assessed'}\n  Site: ${c.site || 'Not assessed'} | Duration: ${c.duration || 'Not assessed'} | Severity: ${c.severity || 'Not assessed'}\n  Limitation: ${c.functionalLimitation || 'Not assessed'}`
  )
  .join('\n')}

3. HISTORY OF PRESENT ILLNESS (HPI)
Onset: ${assessment.hpi.dateOfOnset || 'Not provided'} (${assessment.hpi.modeOfOnset || 'Not assessed'})
Progression: ${assessment.hpi.progression || 'Not assessed'}
Mechanism of Injury: ${assessment.hpi.mechanismOfInjury || 'Not assessed / Not provided'}
Aggravating Factors: ${assessment.hpi.aggravatingFactors || 'Not assessed'}
Relieving Factors: ${assessment.hpi.relievingFactors || 'Not assessed'}
Prior Interventions: ${assessment.hpi.previousTreatment || 'None recorded'}
Clinical Notes: ${assessment.hpi.clinicalNotes || 'None'}

4. PAST MEDICAL & SURGICAL HISTORY
Medical Conditions: ${
      assessment.pastMedicalHistory.selectedConditions.length > 0
        ? assessment.pastMedicalHistory.selectedConditions.join(', ')
        : 'Nil significant reported'
    }
Surgeries: ${
      assessment.surgicalHistory.surgeries.length > 0
        ? assessment.surgicalHistory.surgeries.map((s) => `${s.procedure} (${s.date || 'Year N/A'})`).join('; ')
        : 'No prior surgeries documented'
    }

5. BASELINE VITAL SIGNS
Heart Rate: ${vitals.heartRate ? `${vitals.heartRate} bpm (${vitals.heartRateRhythm})` : 'Not assessed'}
Pulse Rate: ${vitals.pulseRate ? `${vitals.pulseRate} bpm (${vitals.pulseCharacter})` : 'Not assessed'}
Blood Pressure: ${vitals.bpSystolic && vitals.bpDiastolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic} mmHg` : 'Not assessed'}
SpO2: ${vitals.spo2 ? `${vitals.spo2}%` : 'Not assessed'} | Respiratory Rate: ${vitals.respiratoryRate ? `${vitals.respiratoryRate} bpm` : 'Not assessed'}
Temp: ${vitals.temperature ? `${vitals.temperature} °C` : 'Not assessed'}

6. PAIN ASSESSMENT
Primary Site: ${pain.primarySite || pain.freeTextLocation || '⚠️ MISSING REQUIRED FINDING'}
Character: ${pain.painType.length > 0 ? pain.painType.join(', ') : 'Not assessed'}
Intensity: ${pain.intensity || 'Not assessed'}
VAS Score: ${pain.vasScore}/10 | NPRS Current: ${pain.nprsCurrent}/10 (Best: ${pain.nprsBest}/10, Worst: ${pain.nprsWorst}/10)
Pain Behaviour: ${pain.painBehaviour.join(', ') || 'Not assessed'}

7. OBJECTIVE OBSERVATION & PALPATION
Built: ${obs.built || 'Not assessed'} | Attitude: ${obs.attitude || 'Not assessed'}
Posture Overview: ${obs.postureLumbar ? `Lumbar: ${obs.postureLumbar}` : 'Not assessed'}
Gait Pattern: ${obs.gaitType || 'Not assessed'} (Speed: ${obs.gaitSpeed || 'N/A'}, Symmetry: ${obs.symmetry || 'N/A'})
Swelling: ${obs.swelling || 'Absent'} | Atrophy: ${obs.muscleAtrophy || 'Absent'} | Deformity: ${obs.deformity || 'Absent'}
Palpation: Tenderness ${palp.tendernessPresent || 'Not assessed'} (${palp.tendernessSite || ''} - ${palp.tendernessGrade || ''}); Warmth: ${palp.warmth || 'Normal'}; Oedema: ${palp.oedema || 'Absent'}; Crepitus: ${palp.crepitus || 'Absent'}.

8. SPECIALTY EXAMINATION (${spec.toUpperCase()})
${
  spec === 'orthopaedic'
    ? `ROM Goniometry:\n${assessment.orthopaedicExam.romList.map((r) => `  - ${r.joint} ${r.movement} (${r.side}): AROM ${r.activeRom || 'N/A'}, End-feel: ${r.endFeel}`).join('\n')}\nMMT Strength:\n${assessment.orthopaedicExam.muscleStrengthList.map((m) => `  - ${m.muscleGroup} (${m.side}): MMT Grade ${m.mmtGrade}/5`).join('\n')}`
    : `Specialty physical findings documented under ${spec} module.`
}

9. SPECIAL TESTS
${
  assessment.specialTests.length > 0
    ? assessment.specialTests
        .map((t) => `• ${t.testName} (${t.side}): ${t.result.toUpperCase()} — ${t.findings || 'No notes'}`)
        .join('\n')
    : 'No special provocative tests recorded.'
}

10. MEDICAL DIAGNOSIS
${assessment.medicalDiagnosis.primaryDiagnosis || '⚠️ MISSING / PENDING PHYSICIAN REFERRAL'}
Treating Doctor: ${assessment.medicalDiagnosis.treatingPhysician || 'Not specified'}

11. PHYSIOTHERAPY DIAGNOSIS (ICF FORMAT)
Body Structure Impairments: ${assessment.physiotherapyDiagnosis.bodyStructureImpairments || '⚠️ MISSING REQUIRED FINDING'}
Body Function Impairments: ${assessment.physiotherapyDiagnosis.bodyFunctionImpairments || '⚠️ MISSING REQUIRED FINDING'}
Activity Limitations: ${assessment.physiotherapyDiagnosis.activityLimitations || 'Not assessed'}
Participation Restrictions: ${assessment.physiotherapyDiagnosis.participationRestrictions || 'Not assessed'}
Contextual Factors: ${assessment.physiotherapyDiagnosis.contextualFactors || 'Not assessed'}

12. SMART PHYSIOTHERAPY GOALS
${assessment.goals.map((g, i) => `[${g.type}] Goal #${i + 1}: ${g.target} | Target Metric: ${g.measurement} | Timeframe: ${g.timeframe}`).join('\n')}

13. PHYSIOTHERAPY MANAGEMENT & HOME EXERCISE PROGRAMME
In-Clinic Interventions: ${assessment.management.therapeuticExercise || 'Prescribed active rehabilitation'}
Education: ${assessment.management.education || 'Ergonomic counseling'}
Home Exercises (HEP):
${assessment.management.homeExerciseProgramme
  .map(
    (ex, i) =>
      `• Ex #${i + 1}: ${ex.exerciseName} | Position: ${ex.startingPosition} | Dosage: ${ex.repetitions} x ${ex.sets}, ${ex.frequency} | Precautions: ${ex.precautions}`
  )
  .join('\n')}

14. PRECAUTIONS & RED FLAGS SCREENING
Review Status: ${assessment.redFlags.clinicalReviewRequired ? '⚠️ CLINICAL REVIEW REQUIRED' : 'Cleared for active physiotherapy rehabilitation without emergent red flags.'}

15. REASSESSMENT & FOLLOW-UP PLAN
Review Date: ${assessment.followUp.followUpDate || '1-2 weeks'} | Response: ${assessment.followUp.treatmentResponse}
Plan Modification: ${assessment.followUp.planModification || 'Progress as tolerated'}`;
  };

  const handleCopyText = () => {
    const reportText = generateReportPlainText();
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Actions Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            VIEW 2 — Formal Physiotherapy Patient Assessment Report
          </h2>
          <p className="text-xs text-slate-500">
            Standardized clinical narrative for medical records, physician liaison, and insurance documentation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEditInForm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit in Form
          </button>

          <button
            type="button"
            onClick={() => setEditableNarrative(!editableNarrative)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-colors border ${
              editableNarrative
                ? 'bg-purple-100 text-purple-900 border-purple-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {editableNarrative ? 'Lock Narrative View' : 'Edit Narrative Addendum'}
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Mandatory Missing Information Validation Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Pre-Finalization Clinical Validation Check
          </h3>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            Completeness: {validation.completionPercentage}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 1. Required Missing */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1.5">
            <div className="font-bold text-amber-900 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>⚠️ REQUIRED INFORMATION MISSING:</span>
            </div>
            {validation.requiredMissing.length === 0 ? (
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ All essential diagnostic findings present. No required gaps.
              </p>
            ) : (
              <ul className="space-y-1 text-[11px] text-amber-800 list-disc list-inside">
                {validation.requiredMissing.map((item, idx) => (
                  <li key={idx} className="leading-tight">
                    <span className="font-semibold text-amber-950">⚠️ MISSING REQUIRED FINDING:</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2. Recommended Additional */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center gap-1">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span>⚠️ RECOMMENDED ADDITIONAL ASSESSMENTS:</span>
            </div>
            {validation.recommendedAssessments.length === 0 ? (
              <p className="text-[11px] text-blue-700">No additional condition-specific recommendations pending.</p>
            ) : (
              <ul className="space-y-1 text-[11px] text-blue-800 list-disc list-inside">
                {validation.recommendedAssessments.map((item, idx) => (
                  <li key={idx} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. Completed Sections */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1.5">
            <div className="font-bold text-emerald-900 flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>✓ COMPLETED SECTIONS:</span>
            </div>
            <div className="text-[11px] text-emerald-800 space-y-0.5 max-h-24 overflow-y-auto">
              {validation.completedSections.map((sec, idx) => (
                <div key={idx}>✓ {sec}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editable Addendum / Clinician narrative notes */}
      {editableNarrative && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-purple-900">
            Clinician Narrative Custom Addendum & Clinical Interpretation:
          </label>
          <textarea
            rows={3}
            value={customNarrativeNotes}
            onChange={(e) => setCustomNarrativeNotes(e.target.value)}
            placeholder="Add any specific physician liaison remarks, return-to-work recommendations, or custom clinical interpretations here before printing..."
            className="w-full px-3 py-2 text-sm bg-white border border-purple-300 rounded-lg"
          />
        </div>
      )}

      {/* PRINTABLE OFFICIAL CLINICAL REPORT CONTAINER */}
      <div
        id="clinical-report-print-area"
        className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-md space-y-8 font-sans text-slate-800 print:border-none print:shadow-none print:p-0"
      >
        {/* Medical Document Header */}
        <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              PHYSIOTHERAPY & REHABILITATION SCIENCES
            </div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-0.5">
              Comprehensive Patient Assessment & Functional Evaluation Record
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Specialty: <span className="font-bold text-slate-700">{spec.toUpperCase()}</span> | Clinical Discipline
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5">
            <div>
              <span className="font-semibold text-slate-700">Assessment Date:</span>{' '}
              <span className="font-mono">{id.dateOfAssessment || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Admission Date:</span>{' '}
              <span className="font-mono">{id.dateOfAdmission || 'Outpatient'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Document ID:</span>{' '}
              <span className="font-mono">PHY-{id.dob ? id.dob.replace(/\//g, '') : '2026'}-{id.age || '00'}</span>
            </div>
          </div>
        </div>

        {/* 1. Patient Demographics & Identification */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">01</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Patient Identification & Demographic Data
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">{id.name || '⚠️ MISSING REQUIRED FINDING'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Age / Gender</span>
              <span className="font-semibold text-slate-900">
                {id.age ? `${id.age} yrs` : 'Not assessed'} / {id.gender || 'Not assessed'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Date of Birth</span>
              <span className="font-semibold text-slate-900">{id.dob || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Occupation</span>
              <span className="font-semibold text-slate-900">{id.occupation || 'Not assessed'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Height / Weight</span>
              <span className="font-semibold text-slate-900">
                {id.heightCm ? `${id.heightCm} cm` : '—'} / {id.weightKg ? `${id.weightKg} kg` : '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Calculated BMI</span>
              <span className="font-semibold text-slate-900">
                {id.bmi ? `${id.bmi} kg/m²` : '—'} <span className="text-[10px] text-slate-500">({id.bmiCategory || 'N/A'})</span>
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Contact / Phone</span>
              <span className="font-semibold text-slate-900">{id.phone || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Emergency Contact</span>
              <span className="font-semibold text-slate-900">{id.emergencyContact || 'Not recorded'}</span>
            </div>
          </div>
        </section>

        {/* 2 & 3. Presenting Complaints & HPI */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">02</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Chief Complaints & History of Present Illness (HPI)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            {assessment.chiefComplaintsGeneral && (
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg italic text-slate-800">
                &quot;{assessment.chiefComplaintsGeneral}&quot;
              </p>
            )}

            <div className="space-y-1.5">
              {assessment.chiefComplaints.map((c, i) => (
                <div key={i} className="p-2.5 bg-white border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900">
                    Complaint #{i + 1}: {c.complaint || 'Not assessed / Not provided'}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 mt-1">
                    <span><strong className="text-slate-700">Site:</strong> {c.site || 'Not specified'}</span>
                    <span><strong className="text-slate-700">Duration:</strong> {c.duration || 'Not specified'}</span>
                    <span><strong className="text-slate-700">Severity:</strong> {c.severity || 'Not specified'}</span>
                    <span><strong className="text-slate-700">Limitation:</strong> {c.functionalLimitation || 'Not specified'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-700">Onset & Mechanism:</span>{' '}
                {assessment.hpi.dateOfOnset || 'Not provided'} ({assessment.hpi.modeOfOnset || 'Not assessed'});{' '}
                {assessment.hpi.mechanismOfInjury || 'No traumatic mechanism specified'}
              </div>
              <div>
                <span className="font-bold text-slate-700">Trajectory / Progression:</span>{' '}
                {assessment.hpi.progression || 'Not assessed'}
              </div>
              <div>
                <span className="font-bold text-slate-700">Aggravating Factors:</span>{' '}
                {assessment.hpi.aggravatingFactors || 'Not assessed'}
              </div>
              <div>
                <span className="font-bold text-slate-700">Relieving Factors:</span>{' '}
                {assessment.hpi.relievingFactors || 'Not assessed'}
              </div>
              <div className="md:col-span-2">
                <span className="font-bold text-slate-700">Prior Interventions:</span>{' '}
                {assessment.hpi.previousTreatment || 'None recorded'}
              </div>
              {assessment.hpi.clinicalNotes && (
                <div className="md:col-span-2 text-slate-700 border-t border-slate-200 pt-1.5">
                  <span className="font-bold text-slate-800">Chronological Clinical Narrative:</span>{' '}
                  {assessment.hpi.clinicalNotes}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Vital Signs */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">03</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Objective Baseline Vital Signs & Autonomic Parameters
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Heart Rate</span>
              <span className="font-bold text-slate-900">
                {vitals.heartRate ? `${vitals.heartRate} bpm` : 'Not assessed'}
              </span>
              <span className="text-[9px] text-slate-400 block">{vitals.heartRateRhythm || ''}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Blood Pressure</span>
              <span className="font-bold text-slate-900">
                {vitals.bpSystolic && vitals.bpDiastolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic}` : 'Not assessed'}
              </span>
              <span className="text-[9px] text-slate-400 block">mmHg</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">SpO₂ Oxygenation</span>
              <span className="font-bold text-slate-900">{vitals.spo2 ? `${vitals.spo2}%` : 'Not assessed'}</span>
              <span className="text-[9px] text-slate-400 block">{vitals.oxygenRequirement || 'Room air'}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Respiratory Rate</span>
              <span className="font-bold text-slate-900">
                {vitals.respiratoryRate ? `${vitals.respiratoryRate} bpm` : 'Not assessed'}
              </span>
              <span className="text-[9px] text-slate-400 block">{vitals.respiratoryPattern || 'Normal'}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Temperature</span>
              <span className="font-bold text-slate-900">{vitals.temperature ? `${vitals.temperature} °C` : 'Not assessed'}</span>
              <span className="text-[9px] text-slate-400 block">Afebrile</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">GRBS Glucose</span>
              <span className="font-bold text-slate-900">{vitals.grbs ? `${vitals.grbs} mg/dL` : 'Not assessed'}</span>
              <span className="text-[9px] text-slate-400 block">{vitals.grbsType || ''}</span>
            </div>
          </div>
        </section>

        {/* 5. Pain Assessment & Psychometric Scales */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">04</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Standardized Pain Profile & Quantitative Scales
            </h3>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <strong className="text-slate-800">Primary Anatomical Location:</strong>{' '}
                {pain.primarySite || pain.freeTextLocation || '⚠️ MISSING REQUIRED FINDING'}
              </div>
              <div>
                <strong className="text-slate-800">Pain Character / Quality:</strong>{' '}
                {pain.painType.length > 0 ? pain.painType.join(', ') : 'Not assessed'}
              </div>
              <div>
                <strong className="text-slate-800">Subjective Intensity:</strong>{' '}
                <span className="font-bold text-rose-700">{pain.intensity || 'Not assessed'}</span>
              </div>
              <div>
                <strong className="text-slate-800">Pain Behaviour:</strong>{' '}
                {pain.painBehaviour.join(', ') || 'Not assessed'}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white rounded-md border border-slate-200">
                <span className="text-[10px] text-slate-400 block">VAS Score</span>
                <span className="font-black text-base text-rose-600 font-mono">{pain.vasScore} / 10</span>
              </div>
              <div className="p-2 bg-white rounded-md border border-slate-200">
                <span className="text-[10px] text-slate-400 block">NPRS Current</span>
                <span className="font-black text-base text-slate-800 font-mono">{pain.nprsCurrent} / 10</span>
              </div>
              <div className="p-2 bg-white rounded-md border border-slate-200">
                <span className="text-[10px] text-slate-400 block">NPRS Best (24h)</span>
                <span className="font-black text-base text-emerald-700 font-mono">{pain.nprsBest} / 10</span>
              </div>
              <div className="p-2 bg-white rounded-md border border-slate-200">
                <span className="text-[10px] text-slate-400 block">NPRS Worst (24h)</span>
                <span className="font-black text-base text-rose-700 font-mono">{pain.nprsWorst} / 10</span>
              </div>
            </div>

            {pain.painNotes && (
              <div className="text-[11px] text-slate-600 pt-1">
                <strong>Clinician Pain Notes:</strong> {pain.painNotes}
              </div>
            )}
          </div>
        </section>

        {/* 6. Objective Observation & Palpation */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">05</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Objective Physical Observation & Palpation Findings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-800 uppercase text-[11px]">Visual Appraisal & Gait</h4>
              <p><strong>Physical Built:</strong> {obs.built || 'Not assessed'}</p>
              <p><strong>Attitude of Body:</strong> {obs.attitude || 'Not assessed'}</p>
              <p><strong>Lumbar / Spinal Posture:</strong> {obs.postureLumbar || 'Not assessed'}</p>
              <p><strong>Gait Pattern:</strong> <span className="font-bold text-slate-900">{obs.gaitType || 'Not assessed'}</span></p>
              <p><strong>Gait Symmetry:</strong> {obs.symmetry || 'Not assessed'}</p>
              <p><strong>Swelling & Deformity:</strong> {obs.swelling || 'Absent'}; {obs.deformity || 'None'}</p>
              <p><strong>Muscle Atrophy:</strong> {obs.muscleAtrophy || 'Absent'} {obs.muscleAtrophyDetails ? `(${obs.muscleAtrophyDetails})` : ''}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-800 uppercase text-[11px]">Palpatory Examination</h4>
              <p><strong>Tenderness:</strong> {palp.tendernessPresent || 'Not assessed'} {palp.tendernessSite ? `at ${palp.tendernessSite}` : ''} ({palp.tendernessGrade || 'Grade N/A'})</p>
              <p><strong>Local Warmth:</strong> {palp.warmth || 'Normal'}</p>
              <p><strong>Oedema:</strong> {palp.oedema || 'Absent'} {palp.oedemaSite ? `at ${palp.oedemaSite}` : ''}</p>
              <p><strong>Crepitus:</strong> {palp.crepitus || 'Absent'}</p>
              <p><strong>Scar Examination:</strong> {palp.scarAssessment.site ? `${palp.scarAssessment.site} (${palp.scarAssessment.mobility})` : 'Not applicable'}</p>
              <p><strong>Tissue Texture / Spasm:</strong> {palp.palpationNotes || 'Not recorded'}</p>
            </div>
          </div>
        </section>

        {/* 7. Detailed Specialty Examination */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">06</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Specialty Examination Battery — {spec.toUpperCase()}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {spec === 'orthopaedic' && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-[10px] text-slate-600 uppercase border-b border-slate-200">
                        <th className="p-2">Joint & Movement</th>
                        <th className="p-2">Side</th>
                        <th className="p-2">AROM</th>
                        <th className="p-2">PROM</th>
                        <th className="p-2">End-Feel</th>
                        <th className="p-2">Painful Arc</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assessment.orthopaedicExam.romList.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="p-2 font-medium">{r.joint} {r.movement}</td>
                          <td className="p-2">{r.side}</td>
                          <td className="p-2 font-bold text-slate-900">{r.activeRom || 'Not assessed'}</td>
                          <td className="p-2">{r.passiveRom || 'Not assessed'}</td>
                          <td className="p-2">{r.endFeel || 'Normal'}</td>
                          <td className="p-2">{r.painfulArc || 'None'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">Muscle Power (MMT 0–5 MRC Scale):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px]">
                    {assessment.orthopaedicExam.muscleStrengthList.map((m, i) => (
                      <div key={i} className="bg-white p-2 rounded-md border border-slate-200">
                        <span className="font-semibold">{m.muscleGroup} ({m.side}):</span>{' '}
                        <span className="font-bold text-emerald-800">Grade {m.mmtGrade}/5</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {spec === 'neurological' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <p><strong>Higher Mental Functions:</strong> Consciousness: {assessment.neurologicalExam.higherMentalFunctions.consciousness || 'Intact'}; Orientation: {assessment.neurologicalExam.higherMentalFunctions.orientation || 'Intact'}</p>
                <p><strong>Motor Tone (MAS):</strong> {assessment.neurologicalExam.motorTone || 'Not assessed'}</p>
                <p><strong>Motor Power:</strong> {assessment.neurologicalExam.motorPower || 'Not assessed'}</p>
                <p><strong>Reflexes (DTR):</strong> {assessment.neurologicalExam.reflexesDTR || 'Not assessed'}</p>
                <p><strong>Pathological Reflexes:</strong> {assessment.neurologicalExam.reflexesPathological || 'Negative / Absent'}</p>
                <p><strong>Coordination & Balance:</strong> {assessment.neurologicalExam.coordination.fingerNose || 'Intact'}; Balance: {assessment.neurologicalExam.balance.standing || 'Not assessed'}</p>
                <p><strong>Gait:</strong> {assessment.neurologicalExam.neuroGait || 'Not assessed'}</p>
              </div>
            )}

            {/* Special Provocative Tests */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 uppercase text-[11px]">Condition-Specific Special Tests:</div>
              {assessment.specialTests.length === 0 ? (
                <p className="text-slate-500 italic">No special provocative tests recorded.</p>
              ) : (
                <div className="space-y-1.5">
                  {assessment.specialTests.map((t, i) => (
                    <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <strong className="text-slate-900">{t.testName}</strong> ({t.side}):{' '}
                        <span className="text-slate-600">{t.findings || 'Performed'}</span>
                        {t.painResponse && <span className="text-rose-700 block text-[10px]">Response: {t.painResponse}</span>}
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-md uppercase shrink-0 ${
                          t.result === 'Positive'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : t.result === 'Negative'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. Medical & Physiotherapy Diagnosis (ICF) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">07</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Diagnostic Formulation & ICF Functional Classification
            </h3>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Medical Diagnosis (Referring Physician)</span>
              <span className="text-sm font-bold text-slate-900">
                {assessment.medicalDiagnosis.primaryDiagnosis || '⚠️ MISSING / PENDING PHYSICIAN REFERRAL'}
              </span>
              {assessment.medicalDiagnosis.treatingPhysician && (
                <span className="text-xs text-slate-600 block mt-0.5">
                  Treating Physician: {assessment.medicalDiagnosis.treatingPhysician}
                </span>
              )}
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-lg space-y-2 text-emerald-950">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-900 block">
                Physiotherapy Functional Diagnosis (WHO-ICF Framework)
              </span>
              <div>
                <strong>Body Structure Impairments:</strong>{' '}
                {assessment.physiotherapyDiagnosis.bodyStructureImpairments || '⚠️ MISSING REQUIRED FINDING'}
              </div>
              <div>
                <strong>Body Function Impairments:</strong>{' '}
                {assessment.physiotherapyDiagnosis.bodyFunctionImpairments || '⚠️ MISSING REQUIRED FINDING'}
              </div>
              <div>
                <strong>Activity Limitations:</strong>{' '}
                {assessment.physiotherapyDiagnosis.activityLimitations || 'Not assessed'}
              </div>
              <div>
                <strong>Participation Restrictions:</strong>{' '}
                {assessment.physiotherapyDiagnosis.participationRestrictions || 'Not assessed'}
              </div>
              <div>
                <strong>Contextual & Environmental Factors:</strong>{' '}
                {assessment.physiotherapyDiagnosis.contextualFactors || 'Not assessed'}
              </div>
            </div>
          </div>
        </section>

        {/* 9. SMART Rehabilitation Goals */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">08</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              SMART Physiotherapy Rehabilitation Goals
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            {assessment.goals.length === 0 ? (
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg italic text-slate-500">
                ⚠️ MISSING REQUIRED FINDING: No SMART goals documented.
              </p>
            ) : (
              assessment.goals.map((g, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                      g.type === 'Short-Term' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {g.type}
                    </span>
                    <div className="font-bold text-slate-900">{g.target}</div>
                    <div className="text-[11px] text-slate-600">Metric: {g.measurement}</div>
                  </div>
                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200">
                      Target: {g.timeframe}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 10. Management Plan & Home Exercise Programme */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">09</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Physiotherapy Management Plan & Prescribed Home Exercise Programme (HEP)
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p><strong>Clinical Therapeutic Exercise:</strong> {assessment.management.therapeuticExercise || 'Active guided therapy'}</p>
              <p><strong>Patient Education & Biomechanics:</strong> {assessment.management.education || 'Ergonomic counseling'}</p>
              <p><strong>Pain Management & Physical Modalities:</strong> {assessment.management.painManagement || 'Cryotherapy/TENS as needed'}</p>
              {assessment.management.manualTherapy && <p><strong>Manual Therapy:</strong> {assessment.management.manualTherapy}</p>}
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-800 uppercase text-[11px]">Prescribed Home Exercises (HEP):</div>
              {assessment.management.homeExerciseProgramme.map((ex, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {i + 1}. {ex.exerciseName}
                  </div>
                  <div className="text-slate-700 text-[11px]">
                    <strong>Starting Position:</strong> {ex.startingPosition} | <strong>Technique:</strong> {ex.technique}
                  </div>
                  <div className="text-slate-600 text-[11px] flex flex-wrap gap-x-4 gap-y-1 pt-1 border-t border-slate-100">
                    <span><strong>Dosage:</strong> {ex.repetitions} x {ex.sets}</span>
                    <span><strong>Frequency:</strong> {ex.frequency}</span>
                    <span><strong>Duration:</strong> {ex.duration}</span>
                    <span className="text-amber-800"><strong>Precautions:</strong> {ex.precautions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Red Flags & Safety Precautions */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">10</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinical Safety, Precautions & Red Flags Clearance
            </h3>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-xs ${
              assessment.redFlags.clinicalReviewRequired
                ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            {assessment.redFlags.clinicalReviewRequired ? (
              <div className="space-y-1">
                <div className="font-bold text-rose-800 uppercase text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  ⚠️ CLINICAL REVIEW REQUIRED — RED FLAGS FLAGGED
                </div>
                <p>
                  Patient requires urgent medical or surgical evaluation. Precautions: {assessment.redFlags.clinicalReviewNotes || 'Urgent physician consultation indicated before vigorous progression.'}
                </p>
              </div>
            ) : (
              <p>
                ✓ Patient screened negative for emergent spinal, vascular and constitutional red flags. Cleared for evidence-based active physiotherapy management and functional progression.
              </p>
            )}
          </div>
        </section>

        {/* 12. Reassessment & Plan Modification */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">11</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Reassessment Trajectory & Follow-Up Plan
            </h3>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Review Date</span>
              <span className="font-semibold">{assessment.followUp.followUpDate || '1–2 weeks'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Treatment Response</span>
              <span className="font-semibold text-slate-900">{assessment.followUp.treatmentResponse}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Exercise Adherence</span>
              <span className="font-semibold text-slate-900">{assessment.followUp.adherence}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Outcome Metric</span>
              <span className="font-semibold text-slate-900">{assessment.followUp.outcomeMeasureName || 'Scheduled'}</span>
            </div>
          </div>
        </section>

        {/* Custom Narrative Addendum if entered */}
        {customNarrativeNotes && (
          <section className="space-y-2 border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinician Narrative Addendum & Specific Directives
            </h4>
            <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-lg text-xs text-purple-950 whitespace-pre-wrap">
              {customNarrativeNotes}
            </div>
          </section>
        )}

        {/* Sign-off & Medical Attestation */}
        <div className="pt-8 border-t-2 border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">Clinical Attestation:</div>
            <div className="text-[11px] text-slate-500 max-w-md">
              This assessment record reflects clinical examination findings documented by the qualified physiotherapist.
              Diagnoses are strictly formulated under the WHO International Classification of Functioning (ICF) framework.
            </div>
          </div>

          <div className="text-left sm:text-right space-y-2">
            <div className="w-48 border-b border-slate-400 pb-1"></div>
            <div className="font-bold text-slate-900">Licensed Physiotherapist (PT)</div>
            <div className="text-[11px] text-slate-500">Signature / Reg. No. / Date</div>
          </div>
        </div>
      </div>
    </div>
  );
};
