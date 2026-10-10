import React from 'react';
import { PainAssessment } from '../../types/assessment';
import { BodyDiagram } from '../BodyDiagram';
import {
  PAIN_TYPES,
  AGGRAVATING_FACTORS_LIST,
  RELIEVING_FACTORS_LIST,
  PAIN_BEHAVIOUR_LIST,
} from '../../data/clinicalKnowledge';
import { Flame, ShieldAlert } from 'lucide-react';

interface Props {
  data: PainAssessment;
  onChange: (data: PainAssessment) => void;
}

export const SectionPainHistory: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof PainAssessment>(key: K, value: PainAssessment[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleToggleSite = (site: string) => {
    const isSelected = data.sites.includes(site);
    let nextSites: string[];
    let nextPrimary = data.primarySite;

    if (isSelected) {
      nextSites = data.sites.filter((s) => s !== site);
      if (nextPrimary === site) {
        nextPrimary = nextSites[0] || '';
      }
    } else {
      nextSites = [...data.sites, site];
      if (!nextPrimary) {
        nextPrimary = site;
      }
    }

    onChange({
      ...data,
      sites: nextSites,
      primarySite: nextPrimary,
    });
  };

  const handleSetPrimarySite = (site: string) => {
    updateField('primarySite', site);
  };

  const togglePainType = (type: string) => {
    const next = data.painType.includes(type)
      ? data.painType.filter((t) => t !== type)
      : [...data.painType, type];
    updateField('painType', next);
  };

  const toggleAggravating = (factor: string) => {
    const next = data.aggravatingFactors.includes(factor)
      ? data.aggravatingFactors.filter((f) => f !== factor)
      : [...data.aggravatingFactors, factor];
    updateField('aggravatingFactors', next);
  };

  const toggleRelieving = (factor: string) => {
    const next = data.relievingFactors.includes(factor)
      ? data.relievingFactors.filter((f) => f !== factor)
      : [...data.relievingFactors, factor];
    updateField('relievingFactors', next);
  };

  const toggleBehaviour = (behaviour: string) => {
    const next = data.painBehaviour.includes(behaviour)
      ? data.painBehaviour.filter((b) => b !== behaviour)
      : [...data.painBehaviour, behaviour];
    updateField('painBehaviour', next);
  };

  const isMissingPain = data.sites.length === 0 && !data.primarySite && !data.freeTextLocation;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            Sections 10 & 11 — Pain History & Standardized Pain Scales (VAS / NPRS)
          </h3>
          <p className="text-xs text-slate-500">
            Multidimensional pain assessment including anatomical mapping, mechanosensitivity, chronobiology and quantified scales.
          </p>
        </div>
        {isMissingPain && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Pain Site
          </span>
        )}
      </div>

      {/* Body Diagram & Anatomical Mapping */}
      <BodyDiagram
        selectedSites={data.sites}
        primarySite={data.primarySite}
        onToggleSite={handleToggleSite}
        onSetPrimarySite={handleSetPrimarySite}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Free-Text Anatomical Site / Radiation Pattern <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.freeTextLocation}
            onChange={(e) => updateField('freeTextLocation', e.target.value)}
            placeholder="e.g. Right lower back with lancinating radiation to posterior thigh, lateral calf and 1st web space"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mode of Onset
          </label>
          <select
            value={data.modeOfOnset}
            onChange={(e) => updateField('modeOfOnset', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          >
            <option value="">-- Select Mode --</option>
            <option value="Sudden">Sudden / Acute</option>
            <option value="Gradual">Gradual</option>
            <option value="Traumatic">Traumatic</option>
            <option value="Insidious">Insidious / Spontaneous</option>
            <option value="Post-operative">Post-operative</option>
            <option value="Recurrent">Recurrent</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Type / Character of Pain */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Type / Character of Pain (Select all that describe the quality)
        </label>
        <div className="flex flex-wrap gap-2">
          {PAIN_TYPES.map((type) => {
            const isSelected = data.painType.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => togglePainType(type)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isSelected ? `✓ ${type}` : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Severity Category */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <label className="block text-xs font-bold text-slate-800">
          Subjective Pain Intensity Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['Mild', 'Moderate', 'Severe', 'Very severe'] as const).map((intensity) => (
            <button
              key={intensity}
              type="button"
              onClick={() => updateField('intensity', intensity)}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                data.intensity === intensity
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {intensity}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 11 — STANDARDIZED PAIN SCALES (VAS & NPRS) */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Section 11 — Visual Analogue Scale (VAS) & Numeric Pain Rating Scale (NPRS)
            </h4>
            <p className="text-xs text-slate-300">
              Validated psychometric scores for baseline documentation and reassessment tracking.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-rose-400 font-mono">{data.vasScore}</span>
            <span className="text-xs text-slate-400 font-mono"> / 10</span>
          </div>
        </div>

        {/* VAS Horizontal Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>0 = No Pain</span>
            <span>1–3 = Mild</span>
            <span>4–6 = Moderate</span>
            <span>7–9 = Severe</span>
            <span>10 = Worst Possible Pain</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={data.vasScore}
            onChange={(e) => updateField('vasScore', parseInt(e.target.value, 10))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          {/* Visual ticks */}
          <div className="flex justify-between text-[10px] text-slate-400 px-1 font-mono">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <span
                key={num}
                onClick={() => updateField('vasScore', num)}
                className={`cursor-pointer ${data.vasScore === num ? 'text-rose-400 font-bold scale-125' : ''}`}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* NPRS (Current, Best, Worst) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-700">
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-center">
            <label className="block text-xs font-medium text-slate-300 mb-1">Current NPRS</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                min="0"
                max="10"
                value={data.nprsCurrent}
                onChange={(e) => updateField('nprsCurrent', Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-16 px-2 py-1 text-center text-lg font-bold bg-slate-900 border border-slate-600 rounded-md text-white font-mono"
              />
              <span className="text-xs text-slate-400 font-mono">/ 10</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-center">
            <label className="block text-xs font-medium text-slate-300 mb-1">Best (Least Pain in 24h)</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                min="0"
                max="10"
                value={data.nprsBest}
                onChange={(e) => updateField('nprsBest', Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-16 px-2 py-1 text-center text-lg font-bold bg-slate-900 border border-slate-600 rounded-md text-white font-mono"
              />
              <span className="text-xs text-slate-400 font-mono">/ 10</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-center">
            <label className="block text-xs font-medium text-slate-300 mb-1">Worst (Peak Pain in 24h)</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                min="0"
                max="10"
                value={data.nprsWorst}
                onChange={(e) => updateField('nprsWorst', Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-16 px-2 py-1 text-center text-lg font-bold bg-slate-900 border border-slate-600 rounded-md text-rose-400 font-mono"
              />
              <span className="text-xs text-slate-400 font-mono">/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggravating & Relieving Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Aggravating Factors
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AGGRAVATING_FACTORS_LIST.map((factor) => {
              const isSelected = data.aggravatingFactors.includes(factor);
              return (
                <button
                  key={factor}
                  type="button"
                  onClick={() => toggleAggravating(factor)}
                  className={`text-[11px] px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${factor}` : factor}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Relieving Factors
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RELIEVING_FACTORS_LIST.map((factor) => {
              const isSelected = data.relievingFactors.includes(factor);
              return (
                <button
                  key={factor}
                  type="button"
                  onClick={() => toggleRelieving(factor)}
                  className={`text-[11px] px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${factor}` : factor}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pain Behaviour & Additional Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Pain Behaviour & Diurnal Variation
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PAIN_BEHAVIOUR_LIST.map((b) => {
              const isSelected = data.painBehaviour.includes(b);
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBehaviour(b)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? `✓ ${b}` : b}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Clinical Pain Notes / 24-Hour Behaviour
          </label>
          <textarea
            rows={2}
            value={data.painNotes}
            onChange={(e) => updateField('painNotes', e.target.value)}
            placeholder="e.g. Morning stiffness lasting 15 mins, sharp catches on sudden extension, eased by slow walking..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
