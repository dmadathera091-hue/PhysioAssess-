import React from 'react';
import { SpecialTestItem, SpecialtyType } from '../../types/assessment';
import { SUGGESTED_SPECIAL_TESTS } from '../../data/clinicalKnowledge';
import { CheckCircle2, Plus, Trash2, Sparkles } from 'lucide-react';

interface Props {
  specialTests: SpecialTestItem[];
  specialty: SpecialtyType;
  onChange: (tests: SpecialTestItem[]) => void;
}

export const SectionSpecialTests: React.FC<Props> = ({
  specialTests,
  specialty,
  onChange,
}) => {
  const suggestedTests = SUGGESTED_SPECIAL_TESTS[specialty] || SUGGESTED_SPECIAL_TESTS['orthopaedic'];

  const addTest = (preset?: { name: string; purpose: string; region: string }) => {
    const newTest: SpecialTestItem = {
      id: `st-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      testName: preset?.name || '',
      purpose: preset?.purpose || '',
      region: preset?.region || '',
      result: 'Not performed',
      findings: '',
      side: 'Right',
      painResponse: '',
    };
    onChange([...specialTests, newTest]);
  };

  const updateTest = (id: string, field: keyof SpecialTestItem, value: any) => {
    onChange(
      specialTests.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const removeTest = (id: string) => {
    onChange(specialTests.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Section 18 — Condition-Specific Orthopaedic & Clinical Special Tests
          </h3>
          <p className="text-xs text-slate-500">
            Provocative, clearing and pathognomonic diagnostic maneuvers. Clinician records exact findings and pain responses.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addTest()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom Test
        </button>
      </div>

      {/* Dynamic Suggested Tests Catalog based on Specialty */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Clinically Suggested Special Tests for Current Specialty ({specialty.toUpperCase()}):
          </span>
          <span className="text-[11px] text-slate-500">Click to add to examination battery</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestedTests.map((test) => {
            const isAlreadyAdded = specialTests.some((t) => t.testName === test.name);
            return (
              <button
                key={test.name}
                type="button"
                onClick={() => !isAlreadyAdded && addTest(test)}
                disabled={isAlreadyAdded}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                  isAlreadyAdded
                    ? 'bg-slate-200 text-slate-500 border-slate-300 cursor-default'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer shadow-xs'
                }`}
                title={test.purpose}
              >
                {isAlreadyAdded ? `✓ ${test.name}` : `+ ${test.name}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tests Execution List */}
      {specialTests.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-xs text-slate-500 mb-2">No special tests added yet.</p>
          <p className="text-[11px] text-slate-400">
            Click any suggested test button above or click &quot;Add Custom Test&quot; to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {specialTests.map((t, idx) => (
            <div
              key={t.id}
              className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    Test #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={t.testName}
                    onChange={(e) => updateTest(t.id, 'testName', e.target.value)}
                    placeholder="Test Name"
                    className="text-sm font-bold text-slate-900 border-b border-slate-300 px-1 py-0.5 focus:border-emerald-500 focus:outline-hidden"
                  />
                  <span className="text-xs text-slate-400 font-normal">({t.region || 'Region'})</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Result selection with color tags */}
                  <select
                    value={t.result}
                    onChange={(e) => updateTest(t.id, 'result', e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                      t.result === 'Positive'
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : t.result === 'Negative'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : t.result === 'Equivocal'
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    <option value="Positive">Result: Positive (+ve)</option>
                    <option value="Negative">Result: Negative (-ve)</option>
                    <option value="Equivocal">Result: Equivocal / Inconclusive</option>
                    <option value="Not performed">Result: Not performed</option>
                    <option value="Not applicable">Result: Not applicable</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeTest(t.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove test"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Clinical Purpose / Target Structure</label>
                  <input
                    type="text"
                    value={t.purpose}
                    onChange={(e) => updateTest(t.id, 'purpose', e.target.value)}
                    placeholder="e.g. Nerve root dural tension"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Tested Side</label>
                  <select
                    value={t.side}
                    onChange={(e) => updateTest(t.id, 'side', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  >
                    <option value="Right">Right Side</option>
                    <option value="Left">Left Side</option>
                    <option value="Bilateral">Bilateral</option>
                    <option value="Not applicable">Not applicable</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-500 mb-0.5">Observed Findings & Sensitizing Maneuvers</label>
                  <input
                    type="text"
                    value={t.findings}
                    onChange={(e) => updateTest(t.id, 'findings', e.target.value)}
                    placeholder="e.g. Pain reproduced at 35° hip flexion; Braggard test positive at 30°"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>

                <div className="lg:col-span-4">
                  <label className="block text-[10px] text-slate-500 mb-0.5">Specific Pain / Concordant Symptom Response</label>
                  <input
                    type="text"
                    value={t.painResponse}
                    onChange={(e) => updateTest(t.id, 'painResponse', e.target.value)}
                    placeholder="e.g. Reproduces patient's primary lancinating calf & toe pain exactly"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
