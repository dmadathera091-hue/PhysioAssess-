import React from 'react';
import { MedicalDiagnosis, PhysiotherapyDiagnosis } from '../../types/assessment';
import { Award, FileSignature, ShieldAlert, AlertCircle } from 'lucide-react';

interface Props {
  medicalDiagnosis: MedicalDiagnosis;
  onMedicalChange: (data: MedicalDiagnosis) => void;
  ptDiagnosis: PhysiotherapyDiagnosis;
  onPtChange: (data: PhysiotherapyDiagnosis) => void;
}

export const SectionDiagnosis: React.FC<Props> = ({
  medicalDiagnosis,
  onMedicalChange,
  ptDiagnosis,
  onPtChange,
}) => {
  const updateMedical = <K extends keyof MedicalDiagnosis>(key: K, value: MedicalDiagnosis[K]) => {
    onMedicalChange({
      ...medicalDiagnosis,
      [key]: value,
    });
  };

  const updatePt = <K extends keyof PhysiotherapyDiagnosis>(key: K, value: PhysiotherapyDiagnosis[K]) => {
    onPtChange({
      ...ptDiagnosis,
      [key]: value,
    });
  };

  const isMissingPtDiagnosis =
    !ptDiagnosis.bodyStructureImpairments.trim() && !ptDiagnosis.bodyFunctionImpairments.trim();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Sections 16 & 17 — Medical Diagnosis & ICF-Structured Physiotherapy Diagnosis
          </h3>
          <p className="text-xs text-slate-500">
            Clear clinical distinction between physician diagnosis and functional ICF diagnostic taxonomy based strictly on physical findings.
          </p>
        </div>
        {isMissingPtDiagnosis && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: PT Diagnosis
          </span>
        )}
      </div>

      {/* SECTION 16 — MEDICAL DIAGNOSIS */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileSignature className="w-4 h-4 text-emerald-600" />
            Section 16 — Medical Diagnosis (Treating Physician / Medical Professional)
          </h4>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-blue-500" />
            Not auto-generated; entered from referring doctor records
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Medical Diagnosis
            </label>
            <input
              type="text"
              value={medicalDiagnosis.primaryDiagnosis}
              onChange={(e) => updateMedical('primaryDiagnosis', e.target.value)}
              placeholder="e.g. Right L4-L5 Lumbar Disc Herniation with L5 Radiculopathy"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Treating / Referring Physician & Hospital
            </label>
            <input
              type="text"
              value={medicalDiagnosis.treatingPhysician}
              onChange={(e) => updateMedical('treatingPhysician', e.target.value)}
              placeholder="e.g. Dr. A. K. Nambiar (Consultant Spine Surgeon)"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secondary Medical Diagnosis / Comorbidities
            </label>
            <input
              type="text"
              value={medicalDiagnosis.secondaryDiagnosis}
              onChange={(e) => updateMedical('secondaryDiagnosis', e.target.value)}
              placeholder="e.g. Type 2 Diabetes Mellitus, Essential Hypertension"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Medical / Surgical Directives & Contraindications
            </label>
            <input
              type="text"
              value={medicalDiagnosis.notes}
              onChange={(e) => updateMedical('notes', e.target.value)}
              placeholder="e.g. Avoid high-velocity manipulation; conservative PT for 6 weeks"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* SECTION 17 — PHYSIOTHERAPY DIAGNOSIS (ICF FRAMEWORK) */}
      <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            Section 17 — Physiotherapy Diagnosis (International Classification of Functioning, Disability & Health)
          </h4>
          <p className="text-xs text-emerald-800 mt-0.5">
            Formulated strictly upon documented objective findings, impaired kinematics and biomechanical limitations.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. Body Structure Impairments (s-codes) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={ptDiagnosis.bodyStructureImpairments}
              onChange={(e) => updatePt('bodyStructureImpairments', e.target.value)}
              placeholder="e.g. Impairment of lumbar intervertebral disc structures (s76002), irritation of L5 nerve root (s1201), and protective hypertonus of lumbar erector spinae musculature (s7601)."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. Body Function Impairments (b-codes) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={ptDiagnosis.bodyFunctionImpairments}
              onChange={(e) => updatePt('bodyFunctionImpairments', e.target.value)}
              placeholder="e.g. Severe neurogenic radicular pain in right lower limb (b28015); reduced active lumbar flexion (b7100); reduced motor strength of right EHL & tibialis anterior (b730); impaired neurodynamic sliding (b780)."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Activity Limitations (d-codes: Individual Capacity)
            </label>
            <textarea
              rows={2}
              value={ptDiagnosis.activityLimitations}
              onChange={(e) => updatePt('activityLimitations', e.target.value)}
              placeholder="e.g. Severely limited tolerance for prolonged sitting >20 min (d4153); difficulty lifting objects from floor (d4300); difficulty driving (d4751) and putting on right footwear (d5402)."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Participation Restrictions (Societal & Occupational Roles)
            </label>
            <textarea
              rows={2}
              value={ptDiagnosis.participationRestrictions}
              onChange={(e) => updatePt('participationRestrictions', e.target.value)}
              placeholder="e.g. Inability to maintain full-time occupational workstation duties as software engineer (d8500); restricted from recreational sports (badminton) and family outings (d920)."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              5. Contextual Factors (Environmental & Personal Facilitators / Barriers)
            </label>
            <input
              type="text"
              value={ptDiagnosis.contextualFactors}
              onChange={(e) => updatePt('contextualFactors', e.target.value)}
              placeholder="e.g. Facilitators: High motivation, ergonomic chair. Barriers: Demanding sedentary desk job, fear of spine movement."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Evidence-Based Rationale & Corroborating Physical Signs
            </label>
            <input
              type="text"
              value={ptDiagnosis.evidenceBaseSummary}
              onChange={(e) => updatePt('evidenceBaseSummary', e.target.value)}
              placeholder="e.g. Corroborated by positive right SLR (35°), Slump test (+ve), motor weakness (EHL 4-/5) and MRI L4-L5 herniation."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
