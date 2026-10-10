import React from 'react';
import { ObservationFinding } from '../../types/assessment';
import { GAIT_TYPES } from '../../data/clinicalKnowledge';
import { Eye, ShieldAlert } from 'lucide-react';

interface Props {
  data: ObservationFinding;
  onChange: (data: ObservationFinding) => void;
}

const TROPHIC_OPTIONS = [
  'None',
  'Skin colour change / Erythema / Cyanosis',
  'Hair loss / Thinning',
  'Skin dryness / Anhidrosis',
  'Shiny / Taut skin',
  'Brittle nail changes',
  'Ulceration / Trophic sore',
];

const APPLIANCE_OPTIONS = [
  'None',
  'Orthosis (AFO / KAFO)',
  'Prosthesis',
  'Splint / Cock-up splint',
  'Brace / Knee brace / Corset',
  'Arm sling',
  'Walking aid (Cane / Walker / Crutches)',
  'Wheelchair',
  'Oxygen cannula',
  'Urinary catheter',
];

export const SectionObservation: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof ObservationFinding>(key: K, value: ObservationFinding[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const toggleTrophic = (item: string) => {
    if (item === 'None') {
      updateField('trophicChanges', ['None']);
      return;
    }
    const filtered = data.trophicChanges.filter((x) => x !== 'None');
    const next = filtered.includes(item)
      ? filtered.filter((x) => x !== item)
      : [...filtered, item];
    updateField('trophicChanges', next);
  };

  const toggleAppliance = (item: string) => {
    if (item === 'None') {
      updateField('externalAppliances', ['None']);
      return;
    }
    const filtered = data.externalAppliances.filter((x) => x !== 'None');
    const next = filtered.includes(item)
      ? filtered.filter((x) => x !== item)
      : [...filtered, item];
    updateField('externalAppliances', next);
  };

  const isMissingObservation = !data.gaitType && !data.postureLumbar && !data.built && !data.generalObservations;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600" />
            Section 12 — Objective Clinical Observation
          </h3>
          <p className="text-xs text-slate-500">
            Systematic visual appraisal of body habitus, attitude of limb, regional posture, gait kinematics and trophic changes.
          </p>
        </div>
        {isMissingObservation && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Observation
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Built */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Physical Habitus / Built <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Well built', 'Moderately built', 'Poorly built / Asthenic'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => updateField('built', b)}
                className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  data.built === b
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={data.builtOther}
            onChange={(e) => updateField('builtOther', e.target.value)}
            placeholder="Additional built / somatotype remarks (e.g. Endomorphic)"
            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-md"
          />
        </div>

        {/* Attitude of the Body / Limb */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Attitude of Body / Limb
          </label>
          <input
            type="text"
            value={data.attitude}
            onChange={(e) => updateField('attitude', e.target.value)}
            placeholder="e.g. Right shoulder depressed; antalgic sciatic trunk listing to contralateral side"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="text-[10px] text-slate-500">
            Spontaneous position held by the patient to relieve distress or minimize pain.
          </div>
        </div>
      </div>

      {/* Comprehensive Posture Matrix */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Regional Postural Alignment Analysis
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Head Alignment</label>
            <input
              type="text"
              value={data.postureHead}
              onChange={(e) => updateField('postureHead', e.target.value)}
              placeholder="e.g. Neutral / Forward head tilt"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Cervical Spine</label>
            <input
              type="text"
              value={data.postureCervical}
              onChange={(e) => updateField('postureCervical', e.target.value)}
              placeholder="e.g. Normal lordosis / Straightened lordosis"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Shoulders & Scapulae</label>
            <input
              type="text"
              value={data.postureShoulders}
              onChange={(e) => updateField('postureShoulders', e.target.value)}
              placeholder="e.g. Symmetrical / Right elevation / Winging"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Thoracic Spine</label>
            <input
              type="text"
              value={data.postureThoracic}
              onChange={(e) => updateField('postureThoracic', e.target.value)}
              placeholder="e.g. Normal kyphosis / Hyperkyphosis / Scoliosis"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Lumbar Spine</label>
            <input
              type="text"
              value={data.postureLumbar}
              onChange={(e) => updateField('postureLumbar', e.target.value)}
              placeholder="e.g. Flattened lordosis / Hyperlordosis / List"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Pelvis & ASIS Alignment</label>
            <input
              type="text"
              value={data.posturePelvis}
              onChange={(e) => updateField('posturePelvis', e.target.value)}
              placeholder="e.g. Level / Anterior tilt / Lateral tilt"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Hip Alignment</label>
            <input
              type="text"
              value={data.postureHip}
              onChange={(e) => updateField('postureHip', e.target.value)}
              placeholder="e.g. Neutral / Flexion deformity / Internal rotation"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Knee Alignment</label>
            <input
              type="text"
              value={data.postureKnee}
              onChange={(e) => updateField('postureKnee', e.target.value)}
              placeholder="e.g. Genu varum / Genu valgum / Recurvatum"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Ankle & Foot Arch</label>
            <input
              type="text"
              value={data.postureAnkleFoot}
              onChange={(e) => updateField('postureAnkleFoot', e.target.value)}
              placeholder="e.g. Pes planus / Pes cavus / Pronation"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Gait Analysis & Kinematics */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Gait Analysis & Spatio-Temporal Parameters
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Gait Pattern</label>
            <select
              value={data.gaitType}
              onChange={(e) => updateField('gaitType', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="">-- Select Gait Pattern --</option>
              {GAIT_TYPES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Gait Symmetry</label>
            <input
              type="text"
              value={data.symmetry}
              onChange={(e) => updateField('symmetry', e.target.value)}
              placeholder="e.g. Shortened stance phase on right side; asymmetric swing"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Speed (m/s)</label>
            <input
              type="text"
              value={data.gaitSpeed}
              onChange={(e) => updateField('gaitSpeed', e.target.value)}
              placeholder="e.g. 0.9 m/s"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Cadence (steps/min)</label>
            <input
              type="text"
              value={data.gaitCadence}
              onChange={(e) => updateField('gaitCadence', e.target.value)}
              placeholder="e.g. 88"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Step Length</label>
            <input
              type="text"
              value={data.stepLength}
              onChange={(e) => updateField('stepLength', e.target.value)}
              placeholder="e.g. 45 cm (R) / 55 cm (L)"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Stride Length</label>
            <input
              type="text"
              value={data.strideLength}
              onChange={(e) => updateField('strideLength', e.target.value)}
              placeholder="e.g. 100 cm"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Base of Support</label>
            <input
              type="text"
              value={data.baseOfSupport}
              onChange={(e) => updateField('baseOfSupport', e.target.value)}
              placeholder="e.g. Normal (8 cm) / Widened"
              className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Soft Tissue & Structural Inspection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Swelling */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">Swelling</label>
          <select
            value={data.swelling}
            onChange={(e) => updateField('swelling', e.target.value)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present</option>
            <option value="Pitting">Pitting</option>
            <option value="Non-pitting">Non-pitting</option>
            <option value="Localized">Localized effusion</option>
            <option value="Generalized">Generalized</option>
          </select>
          <input
            type="text"
            value={data.swellingDetails}
            onChange={(e) => updateField('swellingDetails', e.target.value)}
            placeholder="Site & dimensions"
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          />
        </div>

        {/* Deformity */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">Deformity</label>
          <select
            value={data.deformity}
            onChange={(e) => updateField('deformity', e.target.value)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present</option>
            <option value="Fixed">Fixed deformity</option>
            <option value="Flexible">Flexible deformity</option>
            <option value="Post-traumatic">Post-traumatic</option>
            <option value="Congenital">Congenital</option>
          </select>
          <input
            type="text"
            value={data.deformityDetails}
            onChange={(e) => updateField('deformityDetails', e.target.value)}
            placeholder="Type & angle of deformity"
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          />
        </div>

        {/* Muscle Atrophy */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">Muscle Atrophy / Wasting</label>
          <select
            value={data.muscleAtrophy}
            onChange={(e) => updateField('muscleAtrophy', e.target.value)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present</option>
            <option value="Mild">Mild wasting</option>
            <option value="Moderate">Moderate wasting</option>
            <option value="Severe">Severe wasting</option>
          </select>
          <input
            type="text"
            value={data.muscleAtrophyDetails}
            onChange={(e) => updateField('muscleAtrophyDetails', e.target.value)}
            placeholder="Girth difference / muscle group"
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          />
        </div>

        {/* Scar */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">Scar Tissue</label>
          <select
            value={data.scar}
            onChange={(e) => updateField('scar', e.target.value)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Status --</option>
            <option value="Absent">Absent</option>
            <option value="Present">Present</option>
            <option value="Surgical">Surgical healed scar</option>
            <option value="Hypertrophic">Hypertrophic</option>
            <option value="Keloid">Keloid scar</option>
          </select>
          <input
            type="text"
            value={data.scarDetails}
            onChange={(e) => updateField('scarDetails', e.target.value)}
            placeholder="Site & length (cm)"
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          />
        </div>
      </div>

      {/* Trophic Changes & External Appliances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Trophic & Cutaneous Changes
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TROPHIC_OPTIONS.map((item) => {
              const isSelected = data.trophicChanges.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleTrophic(item)}
                  className={`text-[11px] px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${item}` : item}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            External Appliances / Orthoses / Assistive Devices In Use
          </label>
          <div className="flex flex-wrap gap-1.5">
            {APPLIANCE_OPTIONS.map((item) => {
              const isSelected = data.externalAppliances.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAppliance(item)}
                  className={`text-[11px] px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${item}` : item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Free-text Observations */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          General Clinical Observations & Behavioural Notes
        </label>
        <textarea
          rows={2}
          value={data.generalObservations}
          onChange={(e) => updateField('generalObservations', e.target.value)}
          placeholder="e.g. Patient guards lumbar spine upon sit-to-stand transfers, frequently shifts weight..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
