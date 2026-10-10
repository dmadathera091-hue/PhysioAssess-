import React from 'react';
import { IcfProblemItem, PrioritizedProblemItem } from '../../types/assessment';
import { Network, Plus, Trash2, ArrowUpRight } from 'lucide-react';

interface Props {
  icfProblems: IcfProblemItem[];
  prioritizedProblems: PrioritizedProblemItem[];
  onIcfProblemsChange: (problems: IcfProblemItem[]) => void;
  onPrioritizedChange: (problems: PrioritizedProblemItem[]) => void;
}

const ICF_CATALOG: { [key in IcfProblemItem['category']]: string[] } = {
  'Body Functions': [
    'Pain (Acute / Chronic / Neuropathic)',
    'Reduced Range of Motion (ROM)',
    'Reduced Muscle Strength',
    'Altered Muscle Tone (Spasticity/Rigidity/Flaccidity)',
    'Reduced Muscular Endurance',
    'Reduced Balance / Postural Instability',
    'Reduced Coordination / Ataxia',
    'Altered Sensation (Numbness/Dysesthesia)',
    'Reduced Cardiopulmonary Capacity',
    'Reduced Motor Control / Biomechanical Alignment',
    'Reduced Tissue Flexibility / Contracture',
  ],
  'Body Structures': [
    'Joint Capsule & Cartilage',
    'Muscle Belly & Myofascia',
    'Tendon & Enthesis',
    'Ligamentous Stabilizers',
    'Bone & Skeletal Architecture',
    'Peripheral Nerve / Spinal Nerve Root',
    'Brain & Cerebrum',
    'Spinal Cord & Spinal Canal',
    'Cardiovascular & Vascular System',
    'Respiratory & Bronchial System',
    'Pelvic Floor & Pelvic Viscera',
  ],
  'Activity Limitations': [
    'Bed Mobility (Rolling, Supine-to-sit)',
    'Transfers (Sit-to-stand, Bed-to-chair)',
    'Prolonged Sitting Tolerance',
    'Prolonged Standing Tolerance',
    'Walking / Ambulation on Flat Ground',
    'Stair Climbing & Descent',
    'Running / Agility Locomotion',
    'Overhead Reaching & Manipulative Hand Tasks',
    'Lifting & Carrying Heavy Loads',
    'Dressing & Footwear Donning',
    'Bathing & Personal Hygiene',
    'Toileting & Intimate Care',
  ],
  'Participation Restrictions': [
    'Work / Full-time Employment Duties',
    'Education & School / University Participation',
    'Family Caregiver & Domestic Roles',
    'Social & Community Gatherings',
    'Recreational Pursuits & Hobbies',
    'Competitive / Leisure Sports Participation',
    'Public Transportation & Driving Commute',
  ],
  'Environmental Factors': [
    'Family Support & Caregiver Assistance',
    'Home Architecture & Staircase Barriers',
    'Workplace Ergonomics & Seating Setup',
    'Assistive Device / Mobility Aid Availability',
    'Financial Barriers & Rehabilitation Affordability',
    'Transportation Accessibility',
  ],
  'Personal Factors': [
    'High Motivation & Rehab Engagement',
    'Kinesiophobia & Fear-Avoidance Beliefs',
    'Low Self-Efficacy & Confidence',
    'Sedentary Lifestyle & Conditioning',
    'Exercise Adherence History',
  ],
};

export const SectionICFAndProblemList: React.FC<Props> = ({
  icfProblems,
  prioritizedProblems,
  onIcfProblemsChange,
  onPrioritizedChange,
}) => {
  const toggleIcfItem = (category: IcfProblemItem['category'], item: string) => {
    const exists = icfProblems.some((p) => p.category === category && p.item === item);
    if (exists) {
      onIcfProblemsChange(icfProblems.filter((p) => !(p.category === category && p.item === item)));
    } else {
      const newItem: IcfProblemItem = {
        category,
        item,
        severity: 'Moderate',
        notes: '',
      };
      onIcfProblemsChange([...icfProblems, newItem]);
    }
  };

  const updateIcfSeverity = (index: number, severity: IcfProblemItem['severity']) => {
    const updated = icfProblems.map((p, idx) => (idx === index ? { ...p, severity } : p));
    onIcfProblemsChange(updated);
  };

  // Prioritized problem list helpers
  const addPrioritizedProblem = (priority: PrioritizedProblemItem['priority'] = 'Priority 1 — Immediate') => {
    const newProblem: PrioritizedProblemItem = {
      id: `prob-${Date.now()}`,
      priority,
      problemDescription: '',
      clinicalJustification: '',
    };
    onPrioritizedChange([...prioritizedProblems, newProblem]);
  };

  const updateProblem = (id: string, field: keyof PrioritizedProblemItem, value: any) => {
    onPrioritizedChange(
      prioritizedProblems.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProblem = (id: string) => {
    onPrioritizedChange(prioritizedProblems.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-600" />
            Sections 19 & 20 — ICF Problem Matrix & Triaged Problem List
          </h3>
          <p className="text-xs text-slate-500">
            Systematic bio-psycho-social mapping under WHO ICF codes, prioritized by acute clinical urgency and functional consequence.
          </p>
        </div>
      </div>

      {/* SECTION 19: ICF CHECKLIST BY DOMAIN */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-5">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Section 19 — International Classification of Functioning (ICF) Problem Selection
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(ICF_CATALOG) as Array<IcfProblemItem['category']>).map((category) => (
            <div key={category} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-xs font-bold text-slate-800">{category}</span>
                <span className="text-[10px] text-slate-400">
                  {icfProblems.filter((p) => p.category === category).length} selected
                </span>
              </div>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                {ICF_CATALOG[category].map((item) => {
                  const isSelected = icfProblems.some((p) => p.category === category && p.item === item);
                  return (
                    <label
                      key={item}
                      className={`flex items-start gap-1.5 p-1.5 rounded-md text-[11px] cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-950 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleIcfItem(category, item)}
                        className="mt-0.5 rounded-xs text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="flex-1 leading-snug">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected ICF Problems with Severity Rating */}
      {icfProblems.length > 0 && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Documented ICF Impairments & Functional Impact ({icfProblems.length})
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {icfProblems.map((prob, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider truncate">
                    {prob.category}
                  </div>
                  <div className="text-xs font-semibold text-slate-800 truncate" title={prob.item}>
                    {prob.item}
                  </div>
                </div>
                <select
                  value={prob.severity}
                  onChange={(e) => updateIcfSeverity(idx, e.target.value as any)}
                  className="text-[10px] font-semibold bg-white border border-slate-300 rounded-md px-1.5 py-1"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 20: PRIORITIZED PROBLEM LIST */}
      <div className="p-5 bg-slate-900 text-white rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Section 20 — Triaged Clinical Problem List (Priority Hierarchy)
            </h4>
            <p className="text-xs text-slate-300">
              Stratified according to acute risk, biomechanical dysfunction, and patient functional goals.
            </p>
          </div>
          <button
            type="button"
            onClick={() => addPrioritizedProblem()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Problem Entry
          </button>
        </div>

        {prioritizedProblems.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            No prioritized problems listed yet. Click &quot;Add Problem Entry&quot; to classify Priority 1, 2, or 3 issues.
          </div>
        ) : (
          <div className="space-y-3">
            {prioritizedProblems.map((p, idx) => (
              <div
                key={p.id}
                className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                    <select
                      value={p.priority}
                      onChange={(e) => updateProblem(p.id, 'priority', e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded-md border ${
                        p.priority.includes('Priority 1')
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : p.priority.includes('Priority 2')
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-700 text-slate-200 border-slate-600'
                      }`}
                    >
                      <option value="Priority 1 — Immediate">Priority 1 — Immediate (Pain / Safety / Acute)</option>
                      <option value="Priority 2 — Important">Priority 2 — Important (Functional Mobility / Strength)</option>
                      <option value="Priority 3 — Secondary">Priority 3 — Secondary (Ergonomics / Prevention / Conditioning)</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeProblem(p.id)}
                    className="text-slate-400 hover:text-rose-400 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Problem Description</label>
                    <input
                      type="text"
                      value={p.problemDescription}
                      onChange={(e) => updateProblem(p.id, 'problemDescription', e.target.value)}
                      placeholder="e.g. Acute neuropathic lumbar radicular pain & limited sitting tolerance"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Clinical Justification</label>
                    <input
                      type="text"
                      value={p.clinicalJustification}
                      onChange={(e) => updateProblem(p.id, 'clinicalJustification', e.target.value)}
                      placeholder="e.g. Prevents patient from working and performing basic domestic activities"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
