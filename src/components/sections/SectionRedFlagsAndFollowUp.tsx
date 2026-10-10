import React from 'react';
import { RedFlagsPrecautions, FollowUpReassessment } from '../../types/assessment';
import { RED_FLAGS_CATALOG } from '../../data/clinicalKnowledge';
import { ShieldAlert, AlertTriangle, CalendarCheck2 } from 'lucide-react';

interface Props {
  redFlags: RedFlagsPrecautions;
  followUp: FollowUpReassessment;
  onRedFlagsChange: (data: RedFlagsPrecautions) => void;
  onFollowUpChange: (data: FollowUpReassessment) => void;
}

export const SectionRedFlagsAndFollowUp: React.FC<Props> = ({
  redFlags,
  followUp,
  onRedFlagsChange,
  onFollowUpChange,
}) => {
  const toggleFlag = (
    category: 'cardiovascularRedFlags' | 'respiratoryRedFlags' | 'neurologicalRedFlags' | 'musculoskeletalRedFlags',
    flag: string
  ) => {
    const currentList = redFlags[category];
    const nextList = currentList.includes(flag)
      ? currentList.filter((f) => f !== flag)
      : [...currentList, flag];

    const hasAnyRedFlag =
      (category === 'cardiovascularRedFlags' ? nextList : redFlags.cardiovascularRedFlags).length > 0 ||
      (category === 'respiratoryRedFlags' ? nextList : redFlags.respiratoryRedFlags).length > 0 ||
      (category === 'neurologicalRedFlags' ? nextList : redFlags.neurologicalRedFlags).length > 0 ||
      (category === 'musculoskeletalRedFlags' ? nextList : redFlags.musculoskeletalRedFlags).length > 0;

    onRedFlagsChange({
      ...redFlags,
      [category]: nextList,
      clinicalReviewRequired: hasAnyRedFlag || redFlags.clinicalReviewRequired,
    });
  };

  const updateRedFlagsField = <K extends keyof RedFlagsPrecautions>(key: K, value: RedFlagsPrecautions[K]) => {
    onRedFlagsChange({
      ...redFlags,
      [key]: value,
    });
  };

  const updateFollowUpField = <K extends keyof FollowUpReassessment>(key: K, value: FollowUpReassessment[K]) => {
    onFollowUpChange({
      ...followUp,
      [key]: value,
    });
  };

  const hasTriggeredRedFlags =
    redFlags.cardiovascularRedFlags.length > 0 ||
    redFlags.respiratoryRedFlags.length > 0 ||
    redFlags.neurologicalRedFlags.length > 0 ||
    redFlags.musculoskeletalRedFlags.length > 0 ||
    redFlags.clinicalReviewRequired;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Sections 23 & 24 — Precautions, Red Flags & Reassessment Follow-Up
          </h3>
          <p className="text-xs text-slate-500">
            Mandatory clinical safety clearance, non-musculoskeletal referral triggers, and longitudinal treatment response tracking.
          </p>
        </div>
      </div>

      {/* SECTION 23: RED FLAGS SCREENING */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          hasTriggeredRedFlags
            ? 'bg-rose-50/80 border-rose-300'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 ${hasTriggeredRedFlags ? 'text-rose-600' : 'text-slate-500'}`} />
              Section 23 — Systemic Red Flags & Contraindication Screening Battery
            </h4>
            <p className="text-[11px] text-slate-500">
              Select any symptoms presenting in the patient. If triggered, clinical alert will mandate senior review.
            </p>
          </div>
          {hasTriggeredRedFlags && (
            <span className="text-xs font-black text-rose-800 bg-rose-200/90 border border-rose-400 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1.5">
              ⚠️ CLINICAL REVIEW REQUIRED
            </span>
          )}
        </div>

        {/* Red Flag Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Cardiovascular */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-slate-800">Cardiovascular Red Flags</span>
            <div className="space-y-1">
              {RED_FLAGS_CATALOG.cardiovascular.map((item) => {
                const isSelected = redFlags.cardiovascularRedFlags.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-start gap-2 p-1.5 rounded-md text-[11px] cursor-pointer ${
                      isSelected ? 'bg-rose-100 text-rose-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFlag('cardiovascularRedFlags', item)}
                      className="mt-0.5 rounded-xs text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-tight">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Neurological */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-slate-800">Neurological / Spinal Cord Red Flags</span>
            <div className="space-y-1">
              {RED_FLAGS_CATALOG.neurological.map((item) => {
                const isSelected = redFlags.neurologicalRedFlags.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-start gap-2 p-1.5 rounded-md text-[11px] cursor-pointer ${
                      isSelected ? 'bg-rose-100 text-rose-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFlag('neurologicalRedFlags', item)}
                      className="mt-0.5 rounded-xs text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-tight">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Respiratory */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-slate-800">Respiratory Red Flags</span>
            <div className="space-y-1">
              {RED_FLAGS_CATALOG.respiratory.map((item) => {
                const isSelected = redFlags.respiratoryRedFlags.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-start gap-2 p-1.5 rounded-md text-[11px] cursor-pointer ${
                      isSelected ? 'bg-rose-100 text-rose-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFlag('respiratoryRedFlags', item)}
                      className="mt-0.5 rounded-xs text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-tight">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Musculoskeletal & Neoplasm */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-slate-800">Musculoskeletal & Malignancy Red Flags</span>
            <div className="space-y-1">
              {RED_FLAGS_CATALOG.musculoskeletal.map((item) => {
                const isSelected = redFlags.musculoskeletalRedFlags.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-start gap-2 p-1.5 rounded-md text-[11px] cursor-pointer ${
                      isSelected ? 'bg-rose-100 text-rose-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFlag('musculoskeletalRedFlags', item)}
                      className="mt-0.5 rounded-xs text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-tight">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Specific Condition Precautions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Post-Operative Precautions
            </label>
            <input
              type="text"
              value={redFlags.postOperativePrecautions}
              onChange={(e) => updateRedFlagsField('postOperativePrecautions', e.target.value)}
              placeholder="e.g. No hip flexion past 90°, no crossing legs (Post-THA)"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Fracture / Osteoporosis Precautions
            </label>
            <input
              type="text"
              value={redFlags.fracturePrecautions}
              onChange={(e) => updateRedFlagsField('fracturePrecautions', e.target.value)}
              placeholder="e.g. Non-weight bearing 6 weeks / Avoid spinal torsion"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Infection & Wound Precautions
            </label>
            <input
              type="text"
              value={redFlags.infectionPrecautions}
              onChange={(e) => updateRedFlagsField('infectionPrecautions', e.target.value)}
              placeholder="e.g. Keep dressing dry, monitor periwound erythema"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Clinical Review Decision */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={redFlags.clinicalReviewRequired}
              onChange={(e) => updateRedFlagsField('clinicalReviewRequired', e.target.checked)}
              className="rounded-xs text-rose-600 focus:ring-rose-500 h-4 w-4"
            />
            <span className="text-xs font-bold text-slate-800">
              Flag assessment for urgent physician / surgeon review
            </span>
          </label>
          <input
            type="text"
            value={redFlags.clinicalReviewNotes}
            onChange={(e) => updateRedFlagsField('clinicalReviewNotes', e.target.value)}
            placeholder="Clinical review reason / doctor notification notes"
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* SECTION 24: FOLLOW-UP / REASSESSMENT */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
              Section 24 — Longitudinal Reassessment & Treatment Response Tracking
            </h4>
            <p className="text-[11px] text-slate-500">
              Comparative baseline vs current evaluation for objective progress notes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Follow-up Review Date
            </label>
            <input
              type="text"
              value={followUp.followUpDate}
              onChange={(e) => updateFollowUpField('followUpDate', e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Overall Treatment Response
            </label>
            <select
              value={followUp.treatmentResponse}
              onChange={(e) => updateFollowUpField('treatmentResponse', e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-medium"
            >
              <option value="Not assessed">Not assessed</option>
              <option value="Improved">Improved (Significant functional gain)</option>
              <option value="No significant change">No significant change (Plateau)</option>
              <option value="Deteriorated">Deteriorated (Exacerbation)</option>
              <option value="Fluctuating">Fluctuating</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Exercise Adherence
            </label>
            <select
              value={followUp.adherence}
              onChange={(e) => updateFollowUpField('adherence', e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            >
              <option value="Not assessed">Not assessed</option>
              <option value="Good">Good (&gt;80% prescribed sessions)</option>
              <option value="Moderate">Moderate (50–80%)</option>
              <option value="Poor">Poor (&lt;50% sessions completed)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Outcome Measure Score
            </label>
            <input
              type="text"
              value={followUp.outcomeMeasureName}
              onChange={(e) => updateFollowUpField('outcomeMeasureName', e.target.value)}
              placeholder="e.g. ODI: Initial 48% → Current 38%"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-700">Pain Trajectory</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={followUp.painInitial}
                onChange={(e) => updateFollowUpField('painInitial', e.target.value)}
                placeholder="Initial (e.g. 7/10)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
              <input
                type="text"
                value={followUp.painCurrent}
                onChange={(e) => updateFollowUpField('painCurrent', e.target.value)}
                placeholder="Current (e.g. 4/10)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
            </div>
          </div>

          <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-700">ROM Gain</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={followUp.romInitial}
                onChange={(e) => updateFollowUpField('romInitial', e.target.value)}
                placeholder="Initial (e.g. 50% flex)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
              <input
                type="text"
                value={followUp.romCurrent}
                onChange={(e) => updateFollowUpField('romCurrent', e.target.value)}
                placeholder="Current (e.g. 75% flex)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
            </div>
          </div>

          <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-700">Strength Gain</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={followUp.strengthInitial}
                onChange={(e) => updateFollowUpField('strengthInitial', e.target.value)}
                placeholder="Initial (e.g. 4-/5)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
              <input
                type="text"
                value={followUp.strengthCurrent}
                onChange={(e) => updateFollowUpField('strengthCurrent', e.target.value)}
                placeholder="Current (e.g. 4+/5)"
                className="w-full px-2 py-1 border border-slate-300 rounded-md text-[11px]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Rehabilitation Plan Modification & Progression Notes
          </label>
          <textarea
            rows={2}
            value={followUp.planModification}
            onChange={(e) => updateFollowUpField('planModification', e.target.value)}
            placeholder="e.g. Patient responded favorably to extension protocol with centralization; advancing to dynamic lumbar stabilization and work simulation..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
