import React from 'react';
import { VitalSigns } from '../../types/assessment';
import { Activity, ShieldAlert } from 'lucide-react';

interface Props {
  data: VitalSigns;
  onChange: (data: VitalSigns) => void;
}

export const SectionVitals: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof VitalSigns>(key: K, value: VitalSigns[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const isMissingVitals = !data.heartRate && !data.pulseRate && !data.bpSystolic;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Section 2 — Baseline Vital Signs & Hemodynamics
          </h3>
          <p className="text-xs text-slate-500">
            Record cardiovascular, respiratory and autonomic baseline values prior to physical examination or exertion.
          </p>
        </div>
        {isMissingVitals && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Core Vitals
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Heart Rate (beats/min) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            value={data.heartRate}
            onChange={(e) => updateField('heartRate', e.target.value)}
            placeholder="e.g. 72"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="flex gap-2">
            {(['Regular', 'Irregular', 'Not assessed'] as const).map((rhythm) => (
              <button
                key={rhythm}
                type="button"
                onClick={() => updateField('heartRateRhythm', rhythm)}
                className={`flex-1 py-1 text-[10px] font-medium rounded-md border transition-all ${
                  data.heartRateRhythm === rhythm
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rhythm}
              </button>
            ))}
          </div>
        </div>

        {/* Pulse Rate */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Pulse Rate (beats/min)
          </label>
          <input
            type="number"
            value={data.pulseRate}
            onChange={(e) => updateField('pulseRate', e.target.value)}
            placeholder="e.g. 72"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <select
            value={data.pulseCharacter}
            onChange={(e) => updateField('pulseCharacter', e.target.value as any)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Character --</option>
            <option value="Regular">Regular (Normal)</option>
            <option value="Irregular">Irregular</option>
            <option value="Weak">Weak / Thready</option>
            <option value="Bounding">Bounding</option>
            <option value="Not assessed">Not assessed</option>
          </select>
        </div>

        {/* Blood Pressure */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Blood Pressure (mmHg) <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={data.bpSystolic}
              onChange={(e) => updateField('bpSystolic', e.target.value)}
              placeholder="Systolic (120)"
              className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-lg text-center"
            />
            <span className="text-slate-400 font-bold">/</span>
            <input
              type="number"
              value={data.bpDiastolic}
              onChange={(e) => updateField('bpDiastolic', e.target.value)}
              placeholder="Diastolic (80)"
              className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-lg text-center"
            />
          </div>
          <div className="text-[10px] text-slate-500 text-center">
            {data.bpSystolic && data.bpDiastolic ? `${data.bpSystolic}/${data.bpDiastolic} mmHg` : 'Not recorded'}
          </div>
        </div>

        {/* SpO2 */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            SpO₂ (% Oxygen Saturation)
          </label>
          <input
            type="number"
            min="50"
            max="100"
            value={data.spo2}
            onChange={(e) => updateField('spo2', e.target.value)}
            placeholder="e.g. 98"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="text-[10px] text-slate-500">
            {Number(data.spo2) < 92 && data.spo2 ? (
              <span className="text-rose-600 font-semibold">⚠️ Desaturation (&lt;92%)</span>
            ) : (
              'Normal ambient range ≥95%'
            )}
          </div>
        </div>

        {/* Respiratory Rate */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Respiratory Rate (breaths/min)
          </label>
          <input
            type="number"
            value={data.respiratoryRate}
            onChange={(e) => updateField('respiratoryRate', e.target.value)}
            placeholder="e.g. 16"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="text-[10px] text-slate-500">Normal resting: 12–20 bpm</div>
        </div>

        {/* Temperature */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Temperature (°C)
          </label>
          <input
            type="number"
            step="0.1"
            value={data.temperature}
            onChange={(e) => updateField('temperature', e.target.value)}
            placeholder="e.g. 36.8"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="text-[10px] text-slate-500">Normal range: 36.5–37.5 °C</div>
        </div>

        {/* GRBS Blood Sugar */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            GRBS (Blood Glucose mg/dL)
          </label>
          <input
            type="number"
            value={data.grbs}
            onChange={(e) => updateField('grbs', e.target.value)}
            placeholder="e.g. 110"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <select
            value={data.grbsType}
            onChange={(e) => updateField('grbsType', e.target.value as any)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-md"
          >
            <option value="">-- Glucose Timing --</option>
            <option value="Random">Random</option>
            <option value="Fasting">Fasting</option>
            <option value="Post-prandial">Post-prandial (2hr)</option>
            <option value="Other">Other</option>
            <option value="Not assessed">Not assessed</option>
          </select>
        </div>

        {/* Oxygen Requirement */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            Oxygen Requirement
          </label>
          <input
            type="text"
            value={data.oxygenRequirement}
            onChange={(e) => updateField('oxygenRequirement', e.target.value)}
            placeholder="e.g. Room air / 2L NC / Venturi"
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
          />
          <div className="text-[10px] text-slate-500">Document flow rate if on O₂</div>
        </div>
      </div>

      {/* Additional Condition-Specific Vital Signs */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Condition-Specific & Stress Physiology Parameters
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Respiratory Pattern
            </label>
            <input
              type="text"
              value={data.respiratoryPattern}
              onChange={(e) => updateField('respiratoryPattern', e.target.value)}
              placeholder="e.g. Abdominothoracic, Cheyne-Stokes, Shallow, Tachypneic"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Orthostatic BP (Lying vs Standing)
            </label>
            <input
              type="text"
              value={data.orthostaticBp}
              onChange={(e) => updateField('orthostaticBp', e.target.value)}
              placeholder="e.g. Supine 130/80, Standing 115/72 mmHg"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Peak Flow / Spirometry (L/min)
            </label>
            <input
              type="text"
              value={data.peakFlow}
              onChange={(e) => updateField('peakFlow', e.target.value)}
              placeholder="e.g. 380 L/min (Predicted: 450)"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Pain-Related Physiological Response
            </label>
            <input
              type="text"
              value={data.painPhysiologicalResponse}
              onChange={(e) => updateField('painPhysiologicalResponse', e.target.value)}
              placeholder="e.g. Tachycardia on weight bearing, diaphoresis"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Resting Borg Exertion Rating (6-20 / 0-10)
            </label>
            <input
              type="text"
              value={data.borgRating}
              onChange={(e) => updateField('borgRating', e.target.value)}
              placeholder="e.g. 0 (Resting) / 2 (Mild)"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Additional Hemodynamic Notes
            </label>
            <input
              type="text"
              value={data.additionalNotes}
              onChange={(e) => updateField('additionalNotes', e.target.value)}
              placeholder="e.g. Vitals stable throughout evaluation"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
