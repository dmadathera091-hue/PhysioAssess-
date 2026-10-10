import React from 'react';
import { HistoryOfPresentIllness } from '../../types/assessment';
import { FileText, ShieldAlert } from 'lucide-react';

interface Props {
  data: HistoryOfPresentIllness;
  onChange: (data: HistoryOfPresentIllness) => void;
}

export const SectionHPI: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof HistoryOfPresentIllness>(key: K, value: HistoryOfPresentIllness[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const isMissingHpi = !data.dateOfOnset && !data.modeOfOnset && !data.clinicalNotes.trim();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Section 4 — History of Present Illness (HPI)
          </h3>
          <p className="text-xs text-slate-500">
            Chronological progression from symptom onset, biomechanical triggers, prior interventions and red flags.
          </p>
        </div>
        {isMissingHpi && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: HPI Details
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date of Onset */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date / Time of Onset <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.dateOfOnset}
            onChange={(e) => updateField('dateOfOnset', e.target.value)}
            placeholder="DD/MM/YYYY or '3 weeks ago'"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Mode of Onset */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mode of Onset <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.modeOfOnset}
            onChange={(e) => updateField('modeOfOnset', e.target.value as any)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Mode of Onset --</option>
            <option value="Sudden">Sudden / Acute</option>
            <option value="Gradual">Gradual</option>
            <option value="Insidious">Insidious / Spontaneous</option>
            <option value="Traumatic">Traumatic</option>
            <option value="Recurrent">Recurrent flare-up</option>
            <option value="Other">Other (Custom)</option>
          </select>
        </div>

        {data.modeOfOnset === 'Other' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Mode of Onset</label>
            <input
              type="text"
              value={data.modeOfOnsetOther}
              onChange={(e) => updateField('modeOfOnsetOther', e.target.value)}
              placeholder="Specify onset characteristics"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        )}

        {/* Progression */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Disease Progression
          </label>
          <select
            value={data.progression}
            onChange={(e) => updateField('progression', e.target.value as any)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Progression --</option>
            <option value="Improving">Improving</option>
            <option value="Static">Static / Unchanged</option>
            <option value="Deteriorating">Deteriorating / Progressively Worsening</option>
            <option value="Fluctuating">Fluctuating / Episodic</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Mechanism of Injury */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Mechanism of Injury (MOI) / Biomechanical Trigger
        </label>
        <textarea
          rows={2}
          value={data.mechanismOfInjury}
          onChange={(e) => updateField('mechanismOfInjury', e.target.value)}
          placeholder="e.g. Heavy lifting in forward flexion and right rotation / RTA pedestrian hit / Insidious onset during repetitive mouse work"
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Aggravating Factors</label>
          <input
            type="text"
            value={data.aggravatingFactors}
            onChange={(e) => updateField('aggravatingFactors', e.target.value)}
            placeholder="e.g. Prolonged sitting >20 min, forward bending, coughing/sneezing"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Relieving Factors</label>
          <input
            type="text"
            value={data.relievingFactors}
            onChange={(e) => updateField('relievingFactors', e.target.value)}
            placeholder="e.g. Supine with knee support, slow walking, heat pack"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Previous Treatment & Interventions</label>
          <input
            type="text"
            value={data.previousTreatment}
            onChange={(e) => updateField('previousTreatment', e.target.value)}
            placeholder="e.g. NSAIDs, epidural injection, previous physical therapy (modalities only)"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Previous Investigations</label>
          <input
            type="text"
            value={data.previousInvestigations}
            onChange={(e) => updateField('previousInvestigations', e.target.value)}
            placeholder="e.g. X-ray lumbosacral spine (normal), MRI Lumbar Spine on 25/09/2026"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Current Medical Treatment & Medication</label>
          <input
            type="text"
            value={data.currentTreatment}
            onChange={(e) => updateField('currentTreatment', e.target.value)}
            placeholder="e.g. Pregabalin 75mg OD, Paracetamol 650mg PRN"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Associated Symptoms</label>
          <input
            type="text"
            value={data.associatedSymptoms}
            onChange={(e) => updateField('associatedSymptoms', e.target.value)}
            placeholder="e.g. Paresthesia, tingling, numbness, subjective weakness, dizziness"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Previous Episodes / Past History of Same Complaint</label>
          <input
            type="text"
            value={data.previousEpisodes}
            onChange={(e) => updateField('previousEpisodes', e.target.value)}
            placeholder="e.g. First episode 2 years ago, resolved with 1 week rest"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Relevant Red Flags Screened</label>
          <input
            type="text"
            value={data.relevantRedFlags}
            onChange={(e) => updateField('relevantRedFlags', e.target.value)}
            placeholder="e.g. No cauda equina signs, no night sweats, no unremitting night pain"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Large Free-Text Clinical Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Detailed Clinical Notes & Chronological Narrative
        </label>
        <textarea
          rows={4}
          value={data.clinicalNotes}
          onChange={(e) => updateField('clinicalNotes', e.target.value)}
          placeholder="Detailed chronological narrative of the patient's condition, trajectory of symptoms, response to initial rest, clinical presentation and specific functional impacts on work and leisure..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
