import React from 'react';
import { PalpationFinding } from '../../types/assessment';
import { Hand, ShieldAlert } from 'lucide-react';

interface Props {
  data: PalpationFinding;
  onChange: (data: PalpationFinding) => void;
}

export const SectionPalpation: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof PalpationFinding>(key: K, value: PalpationFinding[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const updateScarField = (field: keyof PalpationFinding['scarAssessment'], value: string) => {
    onChange({
      ...data,
      scarAssessment: {
        ...data.scarAssessment,
        [field]: value,
      },
    });
  };

  const isMissingPalpation = !data.tendernessPresent && !data.oedema && !data.palpationNotes;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Hand className="w-5 h-5 text-emerald-600" />
            Section 13 — Palpation & Manual Tissue Examination
          </h3>
          <p className="text-xs text-slate-500">
            Palpatory assessment of localized tenderness, tissue temperature/warmth, pitting oedema, crepitus and scar mobility.
          </p>
        </div>
        {isMissingPalpation && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Palpation
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tenderness */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Tenderness <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.tendernessPresent}
            onChange={(e) => updateField('tendernessPresent', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
          >
            <option value="">-- Status --</option>
            <option value="Normal">Normal (No tenderness)</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Not assessed">Not assessed</option>
            <option value="Not applicable">Not applicable</option>
          </select>

          {data.tendernessPresent === 'Present' && (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <input
                type="text"
                value={data.tendernessSite}
                onChange={(e) => updateField('tendernessSite', e.target.value)}
                placeholder="Site of tenderness"
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              />
              <select
                value={data.tendernessGrade}
                onChange={(e) => updateField('tendernessGrade', e.target.value)}
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              >
                <option value="">-- Grading --</option>
                <option value="Grade I">Grade I (Patient reports pain without wincing)</option>
                <option value="Grade II">Grade II (Patient winces)</option>
                <option value="Grade III">Grade III (Patient winces and withdraws)</option>
                <option value="Grade IV">Grade IV (Patient does not permit touch)</option>
              </select>
              <input
                type="text"
                value={data.tendernessExtent}
                onChange={(e) => updateField('tendernessExtent', e.target.value)}
                placeholder="Extent (Localized / Diffuse)"
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Local Temperature / Warmth */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Local Tissue Warmth
          </label>
          <select
            value={data.warmth}
            onChange={(e) => updateField('warmth', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
          >
            <option value="">-- Status --</option>
            <option value="Normal">Normal (Warm, symmetrical to contralateral side)</option>
            <option value="Increased">Increased (Hyperthermia / Acute inflammation)</option>
            <option value="Decreased">Decreased (Hypothermia / Vasomotor / Ischemia)</option>
            <option value="Not assessed">Not assessed</option>
            <option value="Not applicable">Not applicable</option>
          </select>
          <div className="text-[10px] text-slate-500">
            Compare with contralateral body side using dorsal surface of hand.
          </div>
        </div>

        {/* Oedema / Effusion */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Oedema & Swelling
          </label>
          <select
            value={data.oedema}
            onChange={(e) => updateField('oedema', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present (Pitting)</option>
            <option value="Present (Non-pitting)">Present (Non-pitting / Brawny)</option>
            <option value="Not assessed">Not assessed</option>
            <option value="Not applicable">Not applicable</option>
          </select>

          {data.oedema && data.oedema.includes('Present') && (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <input
                type="text"
                value={data.oedemaSite}
                onChange={(e) => updateField('oedemaSite', e.target.value)}
                placeholder="Oedema site (e.g. Ankle malleoli)"
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              />
              <select
                value={data.oedemaGrade}
                onChange={(e) => updateField('oedemaGrade', e.target.value)}
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              >
                <option value="">-- Pitting Grade --</option>
                <option value="1+ (2mm rebound immediate)">1+ (2mm, immediate rebound)</option>
                <option value="2+ (4mm rebound <15s)">2+ (4mm, rebound &lt;15s)</option>
                <option value="3+ (6mm rebound 15-30s)">3+ (6mm, rebound 15-30s)</option>
                <option value="4+ (8mm rebound >30s)">4+ (8mm, rebound &gt;30s)</option>
              </select>
            </div>
          )}
        </div>

        {/* Crepitus */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Crepitus / Joint Grating
          </label>
          <select
            value={data.crepitus}
            onChange={(e) => updateField('crepitus', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present (Fine / Coarse)</option>
            <option value="Not assessed">Not assessed</option>
            <option value="Not applicable">Not applicable</option>
          </select>

          {data.crepitus === 'Present' && (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <input
                type="text"
                value={data.crepitusSite}
                onChange={(e) => updateField('crepitusSite', e.target.value)}
                placeholder="Site (e.g. Patellofemoral / Shoulder)"
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              />
              <input
                type="text"
                value={data.crepitusMovement}
                onChange={(e) => updateField('crepitusMovement', e.target.value)}
                placeholder="During which movement"
                className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scar Assessment Detailed Matrix */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Scar Tissue Palpation & Adherence Assessment
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Scar Location / Site</label>
            <input
              type="text"
              value={data.scarAssessment.site}
              onChange={(e) => updateScarField('site', e.target.value)}
              placeholder="e.g. Anterior midline knee"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Dimensions / Length</label>
            <input
              type="text"
              value={data.scarAssessment.size}
              onChange={(e) => updateScarField('size', e.target.value)}
              placeholder="e.g. 12 cm linear"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Mobility & Glide</label>
            <input
              type="text"
              value={data.scarAssessment.mobility}
              onChange={(e) => updateScarField('mobility', e.target.value)}
              placeholder="e.g. Freely mobile / Tethered"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Deep Tissue Adherence</label>
            <input
              type="text"
              value={data.scarAssessment.adherence}
              onChange={(e) => updateScarField('adherence', e.target.value)}
              placeholder="e.g. Adherent to patella"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Free-text Palpation Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Palpation Findings Narrative & Myofascial Tone Notes
        </label>
        <textarea
          rows={2}
          value={data.palpationNotes}
          onChange={(e) => updateField('palpationNotes', e.target.value)}
          placeholder="e.g. Marked trigger points and taut muscle bands in right quadratus lumborum and gluteus medius; piriformis tender on deep palpation..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
