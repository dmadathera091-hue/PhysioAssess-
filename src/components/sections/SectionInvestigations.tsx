import React from 'react';
import { InvestigationItem } from '../../types/assessment';
import { FileCheck, Plus, Trash2 } from 'lucide-react';

interface Props {
  investigations: InvestigationItem[];
  onChange: (investigations: InvestigationItem[]) => void;
}

export const SectionInvestigations: React.FC<Props> = ({ investigations, onChange }) => {
  const addInvestigation = (category: InvestigationItem['category'] = 'Imaging') => {
    const newItem: InvestigationItem = {
      id: `inv-${Date.now()}`,
      category,
      testName: '',
      date: '',
      result: '',
      relevantFinding: '',
      clinicalSignificance: '',
    };
    onChange([...investigations, newItem]);
  };

  const updateInvestigation = (id: string, field: keyof InvestigationItem, value: string) => {
    onChange(
      investigations.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeInvestigation = (id: string) => {
    onChange(investigations.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            Section 15 — Diagnostic Investigations & Paraclinical Reports
          </h3>
          <p className="text-xs text-slate-500">
            Radiological imaging, laboratory markers, electrodiagnosis, spirometry and cardiac telemetry.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addInvestigation('Imaging')}
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Investigation
          </button>
        </div>
      </div>

      {investigations.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-xs text-slate-500 mb-2">No investigations entered.</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => addInvestigation('Imaging')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              + Add Imaging (X-Ray / MRI / CT)
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => addInvestigation('Blood')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              + Add Blood Work
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {investigations.map((inv, idx) => (
            <div
              key={inv.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    Report #{idx + 1}
                  </span>
                  <select
                    value={inv.category}
                    onChange={(e) => updateInvestigation(inv.id, 'category', e.target.value)}
                    className="text-xs font-medium bg-white border border-slate-300 rounded-md px-2 py-0.5"
                  >
                    <option value="Imaging">Imaging (X-ray, MRI, CT, USG, DEXA)</option>
                    <option value="Blood">Blood (CBC, ESR, CRP, HbA1c, Renal, Liver)</option>
                    <option value="Cardiopulmonary">Cardiopulmonary (ECG, Echo, PFT, ABG)</option>
                    <option value="Neurological">Neurological (EMG, NCS, EEG, evoked)</option>
                    <option value="Other">Other Paraclinical</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeInvestigation(inv.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Investigation Test Name
                  </label>
                  <input
                    type="text"
                    value={inv.testName}
                    onChange={(e) => updateInvestigation(inv.id, 'testName', e.target.value)}
                    placeholder="e.g. MRI Lumbar Spine (1.5T) / Knee X-Ray Standing AP & Lateral"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date Conducted</label>
                  <input
                    type="text"
                    value={inv.date}
                    onChange={(e) => updateInvestigation(inv.id, 'date', e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Key Radiological / Laboratory Finding
                  </label>
                  <input
                    type="text"
                    value={inv.relevantFinding}
                    onChange={(e) => updateInvestigation(inv.id, 'relevantFinding', e.target.value)}
                    placeholder="e.g. L4-L5 disc extrusion with descending right L5 nerve root impingement"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Physiotherapy Clinical Significance
                  </label>
                  <input
                    type="text"
                    value={inv.clinicalSignificance}
                    onChange={(e) => updateInvestigation(inv.id, 'clinicalSignificance', e.target.value)}
                    placeholder="e.g. Directly substantiates right dermatomal sciatica and positive SLR at 35 degrees"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
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
