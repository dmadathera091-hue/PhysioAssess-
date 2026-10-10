import React from 'react';
import { ChiefComplaintItem } from '../../types/assessment';
import { MessageSquareText, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface Props {
  complaints: ChiefComplaintItem[];
  generalComplaint: string;
  onComplaintsChange: (complaints: ChiefComplaintItem[]) => void;
  onGeneralChange: (general: string) => void;
}

export const SectionChiefComplaints: React.FC<Props> = ({
  complaints,
  generalComplaint,
  onComplaintsChange,
  onGeneralChange,
}) => {
  const addComplaint = () => {
    const newItem: ChiefComplaintItem = {
      id: `cc-${Date.now()}`,
      complaint: '',
      site: '',
      duration: '',
      severity: '',
      frequency: '',
      functionalLimitation: '',
      mainConcern: '',
    };
    onComplaintsChange([...complaints, newItem]);
  };

  const updateComplaint = (id: string, field: keyof ChiefComplaintItem, value: string) => {
    onComplaintsChange(
      complaints.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeComplaint = (id: string) => {
    onComplaintsChange(complaints.filter((item) => item.id !== id));
  };

  const hasAnyComplaint = complaints.some((c) => c.complaint.trim()) || generalComplaint.trim();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-emerald-600" />
            Section 3 — Chief Complaints (Patient-Reported)
          </h3>
          <p className="text-xs text-slate-500">
            Document presenting symptoms in the patient's own words, chronological order, and functional limitations.
          </p>
        </div>
        {!hasAnyComplaint && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Chief Complaint
          </span>
        )}
      </div>

      {/* Free-text summary */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Chief Complaints Summary (Narrative Free-Text) <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          value={generalComplaint}
          onChange={(e) => onGeneralChange(e.target.value)}
          placeholder="e.g. Pain in right low back radiating down the right leg for 3 weeks, aggravated by prolonged sitting and lifting; unable to sit at desk for work."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Structured Complaints List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Individual Structured Complaints ({complaints.length})
          </h4>
          <button
            type="button"
            onClick={addComplaint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Complaint
          </button>
        </div>

        {complaints.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Complaint #{idx + 1}
              </span>
              {complaints.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeComplaint(item.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Remove this complaint"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Primary Complaint Description
              </label>
              <input
                type="text"
                value={item.complaint}
                onChange={(e) => updateComplaint(item.id, 'complaint', e.target.value)}
                placeholder="e.g. Inability to raise right arm overhead with sharp shoulder twinges"
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Anatomical Site</label>
                <input
                  type="text"
                  value={item.site}
                  onChange={(e) => updateComplaint(item.id, 'site', e.target.value)}
                  placeholder="e.g. Right shoulder / Anterior joint line"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Duration</label>
                <input
                  type="text"
                  value={item.duration}
                  onChange={(e) => updateComplaint(item.id, 'duration', e.target.value)}
                  placeholder="e.g. 2 months / 3 weeks"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Severity & Quality</label>
                <input
                  type="text"
                  value={item.severity}
                  onChange={(e) => updateComplaint(item.id, 'severity', e.target.value)}
                  placeholder="e.g. Moderate ache, sharp on rotation"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Frequency / Behaviour</label>
                <input
                  type="text"
                  value={item.frequency}
                  onChange={(e) => updateComplaint(item.id, 'frequency', e.target.value)}
                  placeholder="e.g. Constant ache / Intermittent with overhead reach"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Functional Limitation</label>
                <input
                  type="text"
                  value={item.functionalLimitation}
                  onChange={(e) => updateComplaint(item.id, 'functionalLimitation', e.target.value)}
                  placeholder="e.g. Difficult combing hair, putting on shirt"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Patient's Main Concern</label>
                <input
                  type="text"
                  value={item.mainConcern}
                  onChange={(e) => updateComplaint(item.id, 'mainConcern', e.target.value)}
                  placeholder="e.g. Wants to sleep on right side without waking up"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
