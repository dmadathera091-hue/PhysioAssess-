import React from 'react';
import { PresentHistory } from '../../types/assessment';
import { DIET_OPTIONS, SLEEP_DISTURBANCE_OPTIONS } from '../../data/clinicalKnowledge';
import { Utensils, Moon, Cigarette, Droplets } from 'lucide-react';

interface Props {
  data: PresentHistory;
  onChange: (data: PresentHistory) => void;
}

export const SectionPresentHistory: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof PresentHistory>(key: K, value: PresentHistory[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const toggleSleepDisturbance = (dist: string) => {
    let next: string[];
    if (dist === 'None') {
      next = ['None'];
    } else {
      const filtered = data.sleepDisturbance.filter((d) => d !== 'None');
      if (filtered.includes(dist)) {
        next = filtered.filter((d) => d !== dist);
      } else {
        next = [...filtered, dist];
      }
    }
    updateField('sleepDisturbance', next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-600" />
            Section 6 — Present Personal History (Diet, Sleep, Habits, Bowel & Bladder)
          </h3>
          <p className="text-xs text-slate-500">
            Nutritional patterns, sleep continuity, substance use screening, and autonomic/pelvic excretory functions.
          </p>
        </div>
      </div>

      {/* A & B. Diet and Appetite */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Utensils className="w-4 h-4 text-emerald-600" />
          A. Diet & B. Appetite
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Dietary Pattern</label>
            <select
              value={data.diet}
              onChange={(e) => updateField('diet', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="">-- Select Diet --</option>
              {DIET_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Appetite</label>
            <select
              value={data.appetite}
              onChange={(e) => updateField('appetite', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="">-- Select Appetite --</option>
              <option value="Good">Good / Normal</option>
              <option value="Moderate">Moderate</option>
              <option value="Poor">Poor / Anorexia</option>
              <option value="Increased">Increased (Polyphagia)</option>
              <option value="Decreased">Decreased</option>
              <option value="Variable">Variable</option>
              <option value="No recent change">No recent change</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Meals Per Day</label>
            <input
              type="text"
              value={data.mealsPerDay}
              onChange={(e) => updateField('mealsPerDay', e.target.value)}
              placeholder="e.g. 3 main meals + 1 snack"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Daily Fluid Intake</label>
            <input
              type="text"
              value={data.fluidIntake}
              onChange={(e) => updateField('fluidIntake', e.target.value)}
              placeholder="e.g. 2.5 Litres/day"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Dietary Restrictions</label>
            <input
              type="text"
              value={data.dietaryRestrictions}
              onChange={(e) => updateField('dietaryRestrictions', e.target.value)}
              placeholder="e.g. Low sodium, gluten-free, renal protein restricted"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Special Nutritional Concerns</label>
            <input
              type="text"
              value={data.specialNutritionalConcerns}
              onChange={(e) => updateField('specialNutritionalConcerns', e.target.value)}
              placeholder="e.g. Sarcopenia, dysphagia, recent weight loss"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* C. Sleep */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Moon className="w-4 h-4 text-emerald-600" />
          C. Sleep Quality & Rest Patterns
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Sleep Quality</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Good', 'Fair', 'Poor', 'Disturbed'] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => updateField('sleepQuality', q)}
                  className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                    data.sleepQuality === q
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Sleep Duration (hours/night)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={data.sleepDurationHours}
              onChange={(e) => updateField('sleepDurationHours', e.target.value)}
              placeholder="e.g. 7"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Sleep Disturbance Factors (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {SLEEP_DISTURBANCE_OPTIONS.map((dist) => {
              const isSelected = data.sleepDisturbance.includes(dist);
              return (
                <button
                  key={dist}
                  type="button"
                  onClick={() => toggleSleepDisturbance(dist)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${dist}` : dist}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* D. Habits */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Cigarette className="w-4 h-4 text-emerald-600" />
          D. Personal Habits & Substance History
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alcohol */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Alcohol Consumption</label>
            <select
              value={data.alcoholStatus}
              onChange={(e) => updateField('alcoholStatus', e.target.value)}
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Status --</option>
              <option value="Never">Never / Teetotaler</option>
              <option value="Occasional">Occasional / Social</option>
              <option value="Regular">Regular</option>
              <option value="Former user">Former user (Abstinent)</option>
              <option value="Current use">Current use</option>
            </select>
            <input
              type="text"
              value={data.alcoholDetails}
              onChange={(e) => updateField('alcoholDetails', e.target.value)}
              placeholder="Quantity / Frequency / Duration"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>

          {/* Smoking */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Smoking</label>
            <select
              value={data.smokingStatus}
              onChange={(e) => updateField('smokingStatus', e.target.value)}
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Status --</option>
              <option value="Never">Never smoked</option>
              <option value="Occasional">Occasional</option>
              <option value="Regular">Regular</option>
              <option value="Former smoker">Former smoker</option>
              <option value="Current smoker">Current smoker</option>
            </select>
            <input
              type="text"
              value={data.smokingDetails}
              onChange={(e) => updateField('smokingDetails', e.target.value)}
              placeholder="Pack-years / Cigarettes per day"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>

          {/* Tobacco */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Smokeless / Chewing Tobacco</label>
            <select
              value={data.tobaccoStatus}
              onChange={(e) => updateField('tobaccoStatus', e.target.value)}
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Status --</option>
              <option value="Never">Never</option>
              <option value="Current">Current user</option>
              <option value="Former">Former user</option>
              <option value="Oral / Chewing">Oral / Chewing tobacco</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              value={data.tobaccoDetails}
              onChange={(e) => updateField('tobaccoDetails', e.target.value)}
              placeholder="Frequency & product type"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>

          {/* Drugs & Other */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Recreational Substances / Other</label>
            <select
              value={data.drugUseStatus}
              onChange={(e) => updateField('drugUseStatus', e.target.value)}
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Status --</option>
              <option value="None">None</option>
              <option value="Current use">Current use</option>
              <option value="Previous use">Previous use</option>
            </select>
            <input
              type="text"
              value={data.drugDetails}
              onChange={(e) => updateField('drugDetails', e.target.value)}
              placeholder="Substance type / frequency / notes"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* E. Bowel and Bladder */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Droplets className="w-4 h-4 text-emerald-600" />
          E. Bowel and Bladder Autonomic Function
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Bowel Function</label>
            <select
              value={data.bowelStatus}
              onChange={(e) => updateField('bowelStatus', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Bowel Status --</option>
              <option value="Normal">Normal (Regular, Continent)</option>
              <option value="Constipation">Constipation</option>
              <option value="Diarrhoea">Diarrhoea</option>
              <option value="Incontinence">Incontinence (Faecal)</option>
              <option value="Urgency">Urgency</option>
              <option value="Altered frequency">Altered frequency</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              value={data.bowelOther}
              onChange={(e) => updateField('bowelOther', e.target.value)}
              placeholder="Additional notes / laxative dependence"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-800">Bladder Function</label>
            <select
              value={data.bladderStatus}
              onChange={(e) => updateField('bladderStatus', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md"
            >
              <option value="">-- Bladder Status --</option>
              <option value="Normal">Normal (Continent, Good Stream)</option>
              <option value="Frequency">Increased Frequency</option>
              <option value="Urgency">Urgency / Urge incontinence</option>
              <option value="Incontinence">Stress / Urge Incontinence</option>
              <option value="Retention">Retention / Hesitancy</option>
              <option value="Dysuria">Dysuria / Painful micturition</option>
              <option value="Nocturia">Nocturia (&gt;2 times/night)</option>
              <option value="Catheterized">Catheterized (Foley / SPC / CIC)</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              value={data.bladderOther}
              onChange={(e) => updateField('bladderOther', e.target.value)}
              placeholder="Additional bladder notes / leakage details"
              className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
