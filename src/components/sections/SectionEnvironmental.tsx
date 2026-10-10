import React from 'react';
import { EnvironmentalHistory } from '../../types/assessment';
import { Home, AlertTriangle } from 'lucide-react';

interface Props {
  data: EnvironmentalHistory;
  onChange: (data: EnvironmentalHistory) => void;
}

const ACCESSIBILITY_FEATURES = [
  'Ground floor access',
  'Stairs present',
  'Elevator available',
  'Wheelchair Ramp available',
  'Uneven surfaces / thresholds',
  'Western toilet / Commode accessible',
  'Indian toilet only',
  'Bathroom grab rails present',
  'Bedroom on same floor as toilet',
  'Narrow doorways (<32 inches)',
];

const HAZARD_OPTIONS = [
  'Poor lighting',
  'Slippery floor',
  'Uneven floor surfaces',
  'Clutter / Loose rugs / Carpets',
  'Stairs without handrails',
  'Lack of bathroom grab bars',
  'Poor ventilation',
  'Occupational / Ergonomic hazards',
  'Fall hazards / Pets',
];

export const SectionEnvironmental: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof EnvironmentalHistory>(key: K, value: EnvironmentalHistory[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const toggleAccessibility = (item: string) => {
    const next = data.accessibility.includes(item)
      ? data.accessibility.filter((i) => i !== item)
      : [...data.accessibility, item];
    updateField('accessibility', next);
  };

  const toggleHazard = (item: string) => {
    const next = data.environmentalHazards.includes(item)
      ? data.environmentalHazards.filter((i) => i !== item)
      : [...data.environmentalHazards, item];
    updateField('environmentalHazards', next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-600" />
            Section 9 — Environmental & Architectural Ergonomics History
          </h3>
          <p className="text-xs text-slate-500">
            Home layout, stairs, domestic barriers, bathroom accessibility and environmental fall hazards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Residence */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Residence Location
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Urban', 'Semi-urban', 'Rural'] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => updateField('residence', loc)}
                className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  data.residence === loc
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* House Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            House Type
          </label>
          <select
            value={data.houseType}
            onChange={(e) => updateField('houseType', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
          >
            <option value="">-- Select House Type --</option>
            <option value="Apartment / Flat with elevator">Apartment / Flat with elevator</option>
            <option value="Apartment (Walk-up stairs only)">Apartment (Walk-up stairs only)</option>
            <option value="Independent House / Villa">Independent House / Villa</option>
            <option value="Traditional House (Courtyard/Steps)">Traditional House (Courtyard/Steps)</option>
            <option value="Hut / Kutcha house">Hut / Kutcha house</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Accessibility Features */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Architectural Features & Accessibility
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {ACCESSIBILITY_FEATURES.map((item) => {
            const isSelected = data.accessibility.includes(item);
            return (
              <label
                key={item}
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAccessibility(item)}
                  className="rounded-xs text-emerald-600 focus:ring-emerald-500"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Environmental Hazards */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5 text-rose-700">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          Domestic Fall Hazards & Architectural Barriers
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {HAZARD_OPTIONS.map((item) => {
            const isSelected = data.environmentalHazards.includes(item);
            return (
              <label
                key={item}
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 text-rose-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleHazard(item)}
                  className="rounded-xs text-rose-600 focus:ring-rose-500"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Environmental Recommendations */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Assistive / Environmental Modifications Recommended
        </label>
        <textarea
          rows={2}
          value={data.assistiveRequirements}
          onChange={(e) => updateField('assistiveRequirements', e.target.value)}
          placeholder="e.g. Raised toilet seat with armrests, bilateral staircase handrails, non-skid bath mats, removal of throw rugs..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
