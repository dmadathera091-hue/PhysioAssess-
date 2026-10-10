import React from 'react';
import { SurgicalHistoryItem } from '../../types/assessment';
import { Scissors, Plus, Trash2 } from 'lucide-react';

interface Props {
  surgeries: SurgicalHistoryItem[];
  currentSurgicalStatus: string;
  onSurgeriesChange: (surgeries: SurgicalHistoryItem[]) => void;
  onCurrentStatusChange: (status: string) => void;
}

export const SectionSurgicalHistory: React.FC<Props> = ({
  surgeries,
  currentSurgicalStatus,
  onSurgeriesChange,
  onCurrentStatusChange,
}) => {
  const addSurgery = () => {
    const newItem: SurgicalHistoryItem = {
      id: `surg-${Date.now()}`,
      procedure: '',
      bodyRegion: '',
      date: '',
      indication: '',
      complications: '',
      rehabilitationReceived: '',
    };
    onSurgeriesChange([...surgeries, newItem]);
  };

  const updateSurgery = (id: string, field: keyof SurgicalHistoryItem, value: string) => {
    onSurgeriesChange(
      surgeries.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeSurgery = (id: string) => {
    onSurgeriesChange(surgeries.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-emerald-600" />
            Section 7 — Surgical History & Operative Milestones
          </h3>
          <p className="text-xs text-slate-500">
            Past surgeries, anatomical region, postoperative complications and previous physical therapy received.
          </p>
        </div>
        <button
          type="button"
          onClick={addSurgery}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Surgical Entry
        </button>
      </div>

      {surgeries.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-xs text-slate-500 mb-2">No prior surgeries recorded.</p>
          <button
            type="button"
            onClick={addSurgery}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            + Click here to add surgical history
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {surgeries.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Procedure #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeSurgery(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove surgery"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Surgical Procedure Name
                  </label>
                  <input
                    type="text"
                    value={item.procedure}
                    onChange={(e) => updateSurgery(item.id, 'procedure', e.target.value)}
                    placeholder="e.g. Left Total Knee Arthroplasty / Microdiscectomy L4-L5"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date / Year</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateSurgery(item.id, 'date', e.target.value)}
                    placeholder="DD/MM/YYYY or Year"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Body Region</label>
                  <input
                    type="text"
                    value={item.bodyRegion}
                    onChange={(e) => updateSurgery(item.id, 'bodyRegion', e.target.value)}
                    placeholder="e.g. Left Knee / Lumbar Spine"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Indication</label>
                  <input
                    type="text"
                    value={item.indication}
                    onChange={(e) => updateSurgery(item.id, 'indication', e.target.value)}
                    placeholder="e.g. Severe Grade IV Osteoarthritis"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Complications</label>
                  <input
                    type="text"
                    value={item.complications}
                    onChange={(e) => updateSurgery(item.id, 'complications', e.target.value)}
                    placeholder="e.g. Nil / Superficial wound infection"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Rehabilitation Received (Duration & Response)
                  </label>
                  <input
                    type="text"
                    value={item.rehabilitationReceived}
                    onChange={(e) => updateSurgery(item.id, 'rehabilitationReceived', e.target.value)}
                    placeholder="e.g. 6 weeks outpatient physiotherapy; achieved 110 deg flexion"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Surgical Status */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Current Surgical Status / Postoperative Recovery Notes
        </label>
        <textarea
          rows={2}
          value={currentSurgicalStatus}
          onChange={(e) => onCurrentStatusChange(e.target.value)}
          placeholder="e.g. Wounds well healed, implants in situ without loosening, or current post-op Day 7 mobilization protocol..."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
};
