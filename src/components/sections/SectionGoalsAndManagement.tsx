import React from 'react';
import { SmartGoalItem, ManagementPlan, HomeExerciseItem } from '../../types/assessment';
import { Target, Dumbbell, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface Props {
  goals: SmartGoalItem[];
  management: ManagementPlan;
  onGoalsChange: (goals: SmartGoalItem[]) => void;
  onManagementChange: (management: ManagementPlan) => void;
}

export const SectionGoalsAndManagement: React.FC<Props> = ({
  goals,
  management,
  onGoalsChange,
  onManagementChange,
}) => {
  // Goals Helpers
  const addGoal = (type: SmartGoalItem['type'] = 'Short-Term') => {
    const newGoal: SmartGoalItem = {
      id: `goal-${Date.now()}`,
      type,
      target: '',
      measurement: '',
      timeframe: type === 'Short-Term' ? '2 weeks' : '6 weeks',
      goalCategory: '',
    };
    onGoalsChange([...goals, newGoal]);
  };

  const updateGoal = (id: string, field: keyof SmartGoalItem, value: string) => {
    onGoalsChange(
      goals.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const removeGoal = (id: string) => {
    onGoalsChange(goals.filter((g) => g.id !== id));
  };

  // Management Field Helpers
  const updateManagementField = <K extends keyof ManagementPlan>(key: K, value: ManagementPlan[K]) => {
    onManagementChange({
      ...management,
      [key]: value,
    });
  };

  // HEP Helpers
  const addHepExercise = () => {
    const newEx: HomeExerciseItem = {
      id: `hep-${Date.now()}`,
      exerciseName: '',
      startingPosition: '',
      technique: '',
      repetitions: '10 repetitions',
      sets: '3 sets',
      frequency: 'Twice daily',
      duration: '4 weeks',
      precautions: 'Discontinue if sharp radicular pain or dizziness occurs',
      progressionRegression: '',
    };
    onManagementChange({
      ...management,
      homeExerciseProgramme: [...management.homeExerciseProgramme, newEx],
    });
  };

  const updateHepExercise = (id: string, field: keyof HomeExerciseItem, value: string) => {
    onManagementChange({
      ...management,
      homeExerciseProgramme: management.homeExerciseProgramme.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      ),
    });
  };

  const removeHepExercise = (id: string) => {
    onManagementChange({
      ...management,
      homeExerciseProgramme: management.homeExerciseProgramme.filter((ex) => ex.id !== id),
    });
  };

  const isMissingGoals = goals.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Sections 21 & 22 — SMART Physiotherapy Goals & Management Plan
          </h3>
          <p className="text-xs text-slate-500">
            Formulate Specific, Measurable, Achievable, Relevant, and Time-bound clinical goals and prescribe evidence-based therapeutic exercises.
          </p>
        </div>
        {isMissingGoals && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: SMART Goals
          </span>
        )}
      </div>

      {/* SECTION 21: SMART GOALS */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              Section 21 — SMART Physiotherapy Goals (Short-Term & Long-Term)
            </h4>
            <p className="text-[11px] text-slate-500">
              Target (What will change), Measurement (Objective metric/scale), Time frame (Weeks).
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addGoal('Short-Term')}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Short-Term Goal
            </button>
            <button
              type="button"
              onClick={() => addGoal('Long-Term')}
              className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-white border border-purple-300 hover:bg-purple-50 px-2.5 py-1.5 rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Long-Term Goal
            </button>
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-white">
            <p className="text-xs text-slate-500 mb-1">No SMART goals documented.</p>
            <p className="text-[11px] text-slate-400">Click &quot;+ Short-Term Goal&quot; or &quot;+ Long-Term Goal&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((g, idx) => (
              <div
                key={g.id}
                className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                    <select
                      value={g.type}
                      onChange={(e) => updateGoal(g.id, 'type', e.target.value)}
                      className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                        g.type === 'Short-Term'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-purple-50 text-purple-800 border-purple-300'
                      }`}
                    >
                      <option value="Short-Term">Short-Term Goal (1–4 Weeks)</option>
                      <option value="Long-Term">Long-Term Goal (4–12 Weeks)</option>
                    </select>
                    <input
                      type="text"
                      value={g.goalCategory}
                      onChange={(e) => updateGoal(g.id, 'goalCategory', e.target.value)}
                      placeholder="Category (e.g. Pain reduction / Sitting tolerance / Gait independence)"
                      className="text-xs border-b border-slate-200 px-1 py-0.5 w-60 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeGoal(g.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 mb-0.5">Target Clinical Outcome</label>
                    <input
                      type="text"
                      value={g.target}
                      onChange={(e) => updateGoal(g.id, 'target', e.target.value)}
                      placeholder="e.g. Centralize peripheral radicular symptoms and achieve pain-free sitting"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Measurement & Metric</label>
                    <input
                      type="text"
                      value={g.measurement}
                      onChange={(e) => updateGoal(g.id, 'measurement', e.target.value)}
                      placeholder="e.g. NPRS ≤ 3/10; Sitting duration ≥ 45 min"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Timeframe Target</label>
                    <input
                      type="text"
                      value={g.timeframe}
                      onChange={(e) => updateGoal(g.id, 'timeframe', e.target.value)}
                      placeholder="e.g. 2 weeks / 6 weeks"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 22: MANAGEMENT PLAN CATEGORIES */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Dumbbell className="w-4 h-4 text-emerald-600" />
          Section 22 — In-Clinic Physiotherapy Management Modalities & Interventions
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patient Education & Ergonomics Advice
            </label>
            <textarea
              rows={3}
              value={management.education}
              onChange={(e) => updateManagementField('education', e.target.value)}
              placeholder="e.g. Spine biomechanics, hip-hinge instruction, workstation setup, avoidance of prolonged sustained flexion..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pain Management Strategies
            </label>
            <textarea
              rows={3}
              value={management.painManagement}
              onChange={(e) => updateManagementField('painManagement', e.target.value)}
              placeholder="e.g. Positional unloading, ice packs post-activity, TENS for pain gate neuromodulation..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Therapeutic Exercise Regimen (In-Clinic)
            </label>
            <textarea
              rows={3}
              value={management.therapeuticExercise}
              onChange={(e) => updateManagementField('therapeuticExercise', e.target.value)}
              placeholder="e.g. McKenzie directional preference extension, progressive core stabilization (transversus abdominis), sciatic nerve sliders..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Manual Therapy Interventions (When Clinically Indicated)
            </label>
            <textarea
              rows={3}
              value={management.manualTherapy}
              onChange={(e) => updateManagementField('manualTherapy', e.target.value)}
              placeholder="e.g. Lumbar lateral shift correction, thoracic mobilization, soft tissue suboccipital release (No high-velocity manipulation)..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Specialty-Specific Rehabilitation
            </label>
            <textarea
              rows={2}
              value={management.specialtyRehab}
              onChange={(e) => updateManagementField('specialtyRehab', e.target.value)}
              placeholder="e.g. Neurofacilitation / Cardiopulmonary airway clearance / Pelvic floor biofeedback / Gait retraining..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Physical Modalities & Electrotherapy Agents
            </label>
            <textarea
              rows={2}
              value={management.modalitiesPhysicalAgents}
              onChange={(e) => updateManagementField('modalitiesPhysicalAgents', e.target.value)}
              placeholder="e.g. Cryotherapy 15 mins post-treatment; intermittent lumbar traction 20 kg pull..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* HOME EXERCISE PROGRAMME (HEP) STRUCTURED TABLE */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-600" />
              Home Exercise Programme (HEP) — Prescribed Home Protocol
            </h4>
            <p className="text-xs text-slate-500">
              Fully detailed exercise prescriptions with technique, starting position, dosage, precautions, and progression rules.
            </p>
          </div>
          <button
            type="button"
            onClick={addHepExercise}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Prescribed Exercise
          </button>
        </div>

        {management.homeExerciseProgramme.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-500 mb-1">No home exercises prescribed yet.</p>
            <button
              type="button"
              onClick={addHepExercise}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              + Click to prescribe an exercise
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {management.homeExerciseProgramme.map((ex, idx) => (
              <div
                key={ex.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      Exercise #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={ex.exerciseName}
                      onChange={(e) => updateHepExercise(ex.id, 'exerciseName', e.target.value)}
                      placeholder="Exercise Name (e.g. Prone Press-ups)"
                      className="text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1 w-64"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeHepExercise(ex.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove exercise"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Starting Position</label>
                    <input
                      type="text"
                      value={ex.startingPosition}
                      onChange={(e) => updateHepExercise(ex.id, 'startingPosition', e.target.value)}
                      placeholder="e.g. Prone on firm mattress"
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-slate-500 mb-0.5">Biomechanical Technique & Execution</label>
                    <input
                      type="text"
                      value={ex.technique}
                      onChange={(e) => updateHepExercise(ex.id, 'technique', e.target.value)}
                      placeholder="e.g. Hands under shoulders, push upper torso upward keeping pelvis relaxed..."
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Repetitions & Sets</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={ex.repetitions}
                        onChange={(e) => updateHepExercise(ex.id, 'repetitions', e.target.value)}
                        placeholder="Reps (e.g. 10)"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={ex.sets}
                        onChange={(e) => updateHepExercise(ex.id, 'sets', e.target.value)}
                        placeholder="Sets (e.g. 3)"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Frequency & Duration</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={ex.frequency}
                        onChange={(e) => updateHepExercise(ex.id, 'frequency', e.target.value)}
                        placeholder="Freq (e.g. BD/TDS)"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={ex.duration}
                        onChange={(e) => updateHepExercise(ex.id, 'duration', e.target.value)}
                        placeholder="Duration (e.g. 4 wks)"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Precautions & Stop Criteria</label>
                    <input
                      type="text"
                      value={ex.precautions}
                      onChange={(e) => updateHepExercise(ex.id, 'precautions', e.target.value)}
                      placeholder="e.g. Stop if peripheral leg pain worsens"
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] text-slate-500 mb-0.5">Progression / Regression Rule</label>
                    <input
                      type="text"
                      value={ex.progressionRegression}
                      onChange={(e) => updateHepExercise(ex.id, 'progressionRegression', e.target.value)}
                      placeholder="e.g. Regress to prone on elbows if acute; progress to standing extension once centralized"
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded-md"
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
