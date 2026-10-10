import React from 'react';
import { PastMedicalConditionItem } from '../../types/assessment';
import { PAST_CONDITIONS_LIST } from '../../data/clinicalKnowledge';
import { ClipboardList, Plus, Trash2 } from 'lucide-react';

interface Props {
  selectedConditions: string[];
  conditionItems: PastMedicalConditionItem[];
  additionalNotes: string;
  onSelectedConditionsChange: (conditions: string[]) => void;
  onConditionItemsChange: (items: PastMedicalConditionItem[]) => void;
  onAdditionalNotesChange: (notes: string) => void;
}

export const SectionPastMedicalHistory: React.FC<Props> = ({
  selectedConditions,
  conditionItems,
  additionalNotes,
  onSelectedConditionsChange,
  onConditionItemsChange,
  onAdditionalNotesChange,
}) => {
  const toggleCondition = (condition: string) => {
    let nextSelected: string[];
    let nextItems: PastMedicalConditionItem[] = [...conditionItems];

    if (selectedConditions.includes(condition)) {
      nextSelected = selectedConditions.filter((c) => c !== condition);
      nextItems = nextItems.filter((i) => i.condition !== condition);
    } else {
      nextSelected = [...selectedConditions, condition];
      // Add structured row if not present
      if (!nextItems.some((i) => i.condition === condition)) {
        nextItems.push({
          id: `pmh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          condition,
          yearDiagnosed: '',
          currentStatus: 'Controlled',
          treatmentMedication: '',
          complications: '',
        });
      }
    }
    onSelectedConditionsChange(nextSelected);
    onConditionItemsChange(nextItems);
  };

  const addCustomCondition = () => {
    const newItem: PastMedicalConditionItem = {
      id: `pmh-${Date.now()}`,
      condition: '',
      yearDiagnosed: '',
      currentStatus: 'Controlled',
      treatmentMedication: '',
      complications: '',
    };
    onConditionItemsChange([...conditionItems, newItem]);
  };

  const updateItem = (id: string, field: keyof PastMedicalConditionItem, value: any) => {
    onConditionItemsChange(
      conditionItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    const itemToRemove = conditionItems.find((i) => i.id === id);
    if (itemToRemove && selectedConditions.includes(itemToRemove.condition)) {
      onSelectedConditionsChange(selectedConditions.filter((c) => c !== itemToRemove.condition));
    }
    onConditionItemsChange(conditionItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            Section 5 — Past Medical History & Comorbidities
          </h3>
          <p className="text-xs text-slate-500">
            Systemic health history, preexisting medical conditions, ongoing pharmacotherapy and clinical complications.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {selectedConditions.length} comorbidities documented
        </div>
      </div>

      {/* Quick Selectable Conditions Chips */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Select Applicable Medical Conditions (Click to Add / Remove):
        </label>
        <div className="flex flex-wrap gap-2">
          {PAST_CONDITIONS_LIST.map((cond) => {
            const isSelected = selectedConditions.includes(cond);
            return (
              <button
                key={cond}
                type="button"
                onClick={() => toggleCondition(cond)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected ? `✓ ${cond}` : `+ ${cond}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Details Table / Rows */}
      {conditionItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Documented Condition Specifics ({conditionItems.length})
            </h4>
            <button
              type="button"
              onClick={addCustomCondition}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Custom Condition
            </button>
          </div>

          <div className="space-y-3">
            {conditionItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Condition</label>
                  <input
                    type="text"
                    value={item.condition}
                    onChange={(e) => updateItem(item.id, 'condition', e.target.value)}
                    placeholder="Condition name"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Year Diagnosed</label>
                  <input
                    type="text"
                    value={item.yearDiagnosed}
                    onChange={(e) => updateItem(item.id, 'yearDiagnosed', e.target.value)}
                    placeholder="e.g. 2018 or ~5 yrs ago"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Current Status</label>
                  <select
                    value={item.currentStatus}
                    onChange={(e) => updateItem(item.id, 'currentStatus', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="Controlled">Controlled / Stable</option>
                    <option value="Active">Active / Symptomatic</option>
                    <option value="Resolved">Resolved / Cured</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Not assessed">Not assessed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Treatment / Medication</label>
                  <input
                    type="text"
                    value={item.treatmentMedication}
                    onChange={(e) => updateItem(item.id, 'treatmentMedication', e.target.value)}
                    placeholder="e.g. Metformin 500mg BD"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Complications</label>
                    <input
                      type="text"
                      value={item.complications}
                      onChange={(e) => updateItem(item.id, 'complications', e.target.value)}
                      placeholder="e.g. Peripheral neuropathy"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Additional Medical Notes / Immunization / Allergy / Family History
        </label>
        <textarea
          rows={2}
          value={additionalNotes}
          onChange={(e) => onAdditionalNotesChange(e.target.value)}
          placeholder="Any other significant past hospitalizations, childhood illnesses, or drug allergies..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
