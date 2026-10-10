import React from 'react';
import {
  SpecialtyType,
  OrthopaedicExam,
  NeurologicalExam,
  CardiopulmonaryExam,
  GeriatricExam,
  WomensHealthExam,
  PaediatricExam,
  RomMeasurement,
  MuscleStrengthItem,
} from '../../types/assessment';
import { SPECIALTIES } from '../../data/clinicalKnowledge';
import { Stethoscope, Plus, Trash2, Brain, Activity, HeartHandshake, UserCheck, Baby, Trophy, ShieldAlert } from 'lucide-react';

interface Props {
  specialty: SpecialtyType;
  specialtyOther: string;
  onSpecialtyChange: (specialty: SpecialtyType) => void;
  onSpecialtyOtherChange: (other: string) => void;
  orthoData: OrthopaedicExam;
  onOrthoChange: (data: OrthopaedicExam) => void;
  neuroData: NeurologicalExam;
  onNeuroChange: (data: NeurologicalExam) => void;
  cardioData: CardiopulmonaryExam;
  onCardioChange: (data: CardiopulmonaryExam) => void;
  geriatricData: GeriatricExam;
  onGeriatricChange: (data: GeriatricExam) => void;
  womensHealthData: WomensHealthExam;
  onWomensHealthChange: (data: WomensHealthExam) => void;
  paediatricData: PaediatricExam;
  onPaediatricChange: (data: PaediatricExam) => void;
}

export const SectionSpecialtyExam: React.FC<Props> = ({
  specialty,
  specialtyOther,
  onSpecialtyChange,
  onSpecialtyOtherChange,
  orthoData,
  onOrthoChange,
  neuroData,
  onNeuroChange,
  cardioData,
  onCardioChange,
  geriatricData,
  onGeriatricChange,
  womensHealthData,
  onWomensHealthChange,
  paediatricData,
  onPaediatricChange,
}) => {
  // Orthopaedic ROM Helpers
  const addRomMeasurement = () => {
    const newRom: RomMeasurement = {
      joint: '',
      movement: '',
      side: 'Right',
      activeRom: '',
      passiveRom: '',
      normalRange: '',
      endFeel: 'Tissue stretch',
      painfulArc: '',
    };
    onOrthoChange({
      ...orthoData,
      romList: [...orthoData.romList, newRom],
    });
  };

  const updateRom = (index: number, field: keyof RomMeasurement, value: string) => {
    const updated = orthoData.romList.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    onOrthoChange({ ...orthoData, romList: updated });
  };

  const removeRom = (index: number) => {
    onOrthoChange({
      ...orthoData,
      romList: orthoData.romList.filter((_, idx) => idx !== index),
    });
  };

  // Orthopaedic MMT Helpers
  const addMmtItem = () => {
    const newMmt: MuscleStrengthItem = {
      muscleGroup: '',
      side: 'Right',
      mmtGrade: '5',
      dynamometry: '',
    };
    onOrthoChange({
      ...orthoData,
      muscleStrengthList: [...orthoData.muscleStrengthList, newMmt],
    });
  };

  const updateMmt = (index: number, field: keyof MuscleStrengthItem, value: string) => {
    const updated = orthoData.muscleStrengthList.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    onOrthoChange({ ...orthoData, muscleStrengthList: updated });
  };

  const removeMmt = (index: number) => {
    onOrthoChange({
      ...orthoData,
      muscleStrengthList: orthoData.muscleStrengthList.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            Section 14 — Detailed Specialty Physiotherapy Examination
          </h3>
          <p className="text-xs text-slate-500">
            Dynamically adapts clinical examination modules based on the selected specialty discipline.
          </p>
        </div>
      </div>

      {/* Specialty Selector Pills */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-2">
          Select Clinical Specialty (Dynamically Swaps Objective Examination Module):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SPECIALTIES.map((spec) => {
            const isSelected = specialty === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => onSpecialtyChange(spec.id)}
                className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-xs">{spec.label}</span>
                <span className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {spec.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {specialty === 'other' && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Specify Custom Clinical Specialty
          </label>
          <input
            type="text"
            value={specialtyOther}
            onChange={(e) => onSpecialtyOtherChange(e.target.value)}
            placeholder="e.g. Oncology Rehabilitation / Vestibular Physical Therapy"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE A: ORTHOPAEDIC / MUSCULOSKELETAL / SPORTS / TRAUMA */}
      {/* ──────────────────────────────────────────────────────────── */}
      {(specialty === 'orthopaedic' || specialty === 'sports' || specialty === 'trauma' || specialty === 'brain_spine' || specialty === 'other') && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Orthopaedic & Musculoskeletal Biomechanical Examination
            </h4>
            <span className="text-xs text-slate-500 font-medium">Goniometry & MMT</span>
          </div>

          {/* Range of Motion (Goniometry) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Range of Motion (Active & Passive Goniometry)
                </h5>
                <p className="text-[11px] text-slate-500">AROM, PROM comparison, end-feel and painful arc.</p>
              </div>
              <button
                type="button"
                onClick={addRomMeasurement}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-2.5 py-1 rounded-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Joint Movement
              </button>
            </div>

            <div className="space-y-2">
              {orthoData.romList.map((rom, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 items-end"
                >
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Joint</label>
                    <input
                      type="text"
                      value={rom.joint}
                      onChange={(e) => updateRom(idx, 'joint', e.target.value)}
                      placeholder="e.g. Knee / Shoulder"
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Movement</label>
                    <input
                      type="text"
                      value={rom.movement}
                      onChange={(e) => updateRom(idx, 'movement', e.target.value)}
                      placeholder="e.g. Flexion / Abduction"
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Side</label>
                    <select
                      value={rom.side}
                      onChange={(e) => updateRom(idx, 'side', e.target.value as any)}
                      className="w-full px-1.5 py-1 text-xs border border-slate-300 rounded-md"
                    >
                      <option value="Right">Right</option>
                      <option value="Left">Left</option>
                      <option value="Bilateral">Bilateral</option>
                      <option value="Spine">Spine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">AROM</label>
                    <input
                      type="text"
                      value={rom.activeRom}
                      onChange={(e) => updateRom(idx, 'activeRom', e.target.value)}
                      placeholder="e.g. 0–110°"
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">PROM</label>
                    <input
                      type="text"
                      value={rom.passiveRom}
                      onChange={(e) => updateRom(idx, 'passiveRom', e.target.value)}
                      placeholder="e.g. 0–120°"
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">End-Feel</label>
                    <select
                      value={rom.endFeel}
                      onChange={(e) => updateRom(idx, 'endFeel', e.target.value)}
                      className="w-full px-1.5 py-1 text-xs border border-slate-300 rounded-md"
                    >
                      <option value="Tissue stretch">Tissue stretch (Normal firm)</option>
                      <option value="Bone-to-bone">Bone-to-bone (Hard)</option>
                      <option value="Soft tissue approx">Soft tissue approximation</option>
                      <option value="Capsular">Capsular restriction</option>
                      <option value="Spasm / Guarding">Muscle spasm / Guarding</option>
                      <option value="Empty (Pain)">Empty (Limited by severe pain)</option>
                      <option value="Springy block">Springy block (Meniscus/loose body)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Painful Arc</label>
                    <input
                      type="text"
                      value={rom.painfulArc}
                      onChange={(e) => updateRom(idx, 'painfulArc', e.target.value)}
                      placeholder="e.g. 60°–120° / Nil"
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="flex justify-end pb-0.5">
                    <button
                      type="button"
                      onClick={() => removeRom(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Muscle Strength (Manual Muscle Testing - MRC 0 to 5) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Muscle Strength (MMT Grade 0–5 & Dynamometry)
                </h5>
                <p className="text-[11px] text-slate-500">Grading 0 (Zero) to 5 (Normal resistance).</p>
              </div>
              <button
                type="button"
                onClick={addMmtItem}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-2.5 py-1 rounded-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Muscle Group
              </button>
            </div>

            <div className="space-y-2">
              {orthoData.muscleStrengthList.map((mmt, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 items-end"
                >
                  <div className="col-span-2">
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Muscle Group / Movement</label>
                    <input
                      type="text"
                      value={mmt.muscleGroup}
                      onChange={(e) => updateMmt(idx, 'muscleGroup', e.target.value)}
                      placeholder="e.g. Quadriceps / Deltoid / Tibialis Anterior"
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Side</label>
                    <select
                      value={mmt.side}
                      onChange={(e) => updateMmt(idx, 'side', e.target.value as any)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                    >
                      <option value="Right">Right</option>
                      <option value="Left">Left</option>
                      <option value="Bilateral">Bilateral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-0.5">MMT Grade (0–5)</label>
                    <select
                      value={mmt.mmtGrade}
                      onChange={(e) => updateMmt(idx, 'mmtGrade', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md font-bold text-slate-800"
                    >
                      <option value="5">5 (Normal - Holds against strong resistance)</option>
                      <option value="4+">4+ (Good plus)</option>
                      <option value="4">4 (Good - Holds against moderate resistance)</option>
                      <option value="4-">4- (Good minus)</option>
                      <option value="3+">3+ (Fair plus)</option>
                      <option value="3">3 (Fair - Full ROM against gravity)</option>
                      <option value="3-">3- (Fair minus)</option>
                      <option value="2+">2+ (Poor plus)</option>
                      <option value="2">2 (Poor - Full ROM gravity eliminated)</option>
                      <option value="2-">2- (Poor minus)</option>
                      <option value="1">1 (Trace - Flicker of contraction)</option>
                      <option value="0">0 (Zero - Complete paralysis)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">Dynamometry (kg/N)</label>
                      <input
                        type="text"
                        value={mmt.dynamometry}
                        onChange={(e) => updateMmt(idx, 'dynamometry', e.target.value)}
                        placeholder="Optional (kg)"
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMmt(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Joint Examination & Stability */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Joint Mechanics & Accessory Movements
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Joint Alignment</label>
                <input
                  type="text"
                  value={orthoData.jointExam.alignment}
                  onChange={(e) =>
                    onOrthoChange({
                      ...orthoData,
                      jointExam: { ...orthoData.jointExam, alignment: e.target.value },
                    })
                  }
                  placeholder="e.g. Normal / Subluxation / Valgus"
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Joint Stability</label>
                <input
                  type="text"
                  value={orthoData.jointExam.stability}
                  onChange={(e) =>
                    onOrthoChange({
                      ...orthoData,
                      jointExam: { ...orthoData.jointExam, stability: e.target.value },
                    })
                  }
                  placeholder="e.g. Stable / Hypermobile / Lax"
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Joint Mobility</label>
                <input
                  type="text"
                  value={orthoData.jointExam.mobility}
                  onChange={(e) =>
                    onOrthoChange({
                      ...orthoData,
                      jointExam: { ...orthoData.jointExam, mobility: e.target.value },
                    })
                  }
                  placeholder="e.g. Hypomobile / Normal / Hypermobile"
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Accessory Movements</label>
                <input
                  type="text"
                  value={orthoData.jointExam.accessoryMovements}
                  onChange={(e) =>
                    onOrthoChange({
                      ...orthoData,
                      jointExam: { ...orthoData.jointExam, accessoryMovements: e.target.value },
                    })
                  }
                  placeholder="e.g. AP glide restricted, PA normal"
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Limb Length & Functional Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Limb Length Discrepancy (LLD)
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">True Length R (ASIS to Medial Malleolus)</label>
                  <input
                    type="text"
                    value={orthoData.limbLength.trueLimbLengthR}
                    onChange={(e) =>
                      onOrthoChange({
                        ...orthoData,
                        limbLength: { ...orthoData.limbLength, trueLimbLengthR: e.target.value },
                      })
                    }
                    placeholder="e.g. 84 cm"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">True Length L (ASIS to Medial Malleolus)</label>
                  <input
                    type="text"
                    value={orthoData.limbLength.trueLimbLengthL}
                    onChange={(e) =>
                      onOrthoChange({
                        ...orthoData,
                        limbLength: { ...orthoData.limbLength, trueLimbLengthL: e.target.value },
                      })
                    }
                    placeholder="e.g. 84 cm"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Apparent Length R (Umbilicus to Malleolus)</label>
                  <input
                    type="text"
                    value={orthoData.limbLength.apparentLimbLengthR}
                    onChange={(e) =>
                      onOrthoChange({
                        ...orthoData,
                        limbLength: { ...orthoData.limbLength, apparentLimbLengthR: e.target.value },
                      })
                    }
                    placeholder="e.g. 90 cm"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Apparent Length L (Umbilicus to Malleolus)</label>
                  <input
                    type="text"
                    value={orthoData.limbLength.apparentLimbLengthL}
                    onChange={(e) =>
                      onOrthoChange({
                        ...orthoData,
                        limbLength: { ...orthoData.limbLength, apparentLimbLengthL: e.target.value },
                      })
                    }
                    placeholder="e.g. 91 cm"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Functional Tasks & Flexibility Tests
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Muscle Flexibility Tests</label>
                  <input
                    type="text"
                    value={orthoData.flexibilityTests}
                    onChange={(e) => onOrthoChange({ ...orthoData, flexibilityTests: e.target.value })}
                    placeholder="e.g. Thomas test: tight iliopsoas; Popliteal angle 30°"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Functional Movement (Squat / Sit-to-Stand / Stairs)</label>
                  <input
                    type="text"
                    value={orthoData.functionalAssessment.squat}
                    onChange={(e) =>
                      onOrthoChange({
                        ...orthoData,
                        functionalAssessment: { ...orthoData.functionalAssessment, squat: e.target.value },
                      })
                    }
                    placeholder="e.g. Half-squat limited by right knee pain at 60°; requires arm support for sit-to-stand"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE B: NEUROLOGICAL EXAMINATION */}
      {/* ──────────────────────────────────────────────────────────── */}
      {specialty === 'neurological' && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              Neurological Comprehensive Physical Examination
            </h4>
            <span className="text-xs text-slate-500 font-medium">Cranial, Motor, Sensory & Reflexes</span>
          </div>

          {/* Higher Mental Functions */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Higher Mental Functions
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Consciousness</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.consciousness}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, consciousness: e.target.value },
                    })
                  }
                  placeholder="e.g. Alert / Conscious"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Orientation</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.orientation}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, orientation: e.target.value },
                    })
                  }
                  placeholder="e.g. Oriented to T/P/P"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Attention</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.attention}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, attention: e.target.value },
                    })
                  }
                  placeholder="e.g. Sustained"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Memory</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.memory}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, memory: e.target.value },
                    })
                  }
                  placeholder="e.g. Intact immediate/recent"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Speech</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.speech}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, speech: e.target.value },
                    })
                  }
                  placeholder="e.g. Fluent / Dysarthria / Aphasia"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Cognition</label>
                <input
                  type="text"
                  value={neuroData.higherMentalFunctions.cognition}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      higherMentalFunctions: { ...neuroData.higherMentalFunctions, cognition: e.target.value },
                    })
                  }
                  placeholder="e.g. Comprehension intact"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Motor Examination & Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Motor Exam & Muscle Tone
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Muscle Tone (MAS / Ashworth Scale)</label>
                  <input
                    type="text"
                    value={neuroData.motorTone}
                    onChange={(e) => onNeuroChange({ ...neuroData, motorTone: e.target.value })}
                    placeholder="e.g. Right biceps MAS Grade 1+ (Catch & release); Right quadriceps MAS 1"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Motor Power / Voluntary Control</label>
                  <input
                    type="text"
                    value={neuroData.motorPower}
                    onChange={(e) => onNeuroChange({ ...neuroData, motorPower: e.target.value })}
                    placeholder="e.g. Brunnstrom Stage 4 right upper extremity; Stage 5 lower extremity"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Muscle Bulk & Involuntary Movements</label>
                  <input
                    type="text"
                    value={neuroData.motorBulk}
                    onChange={(e) => onNeuroChange({ ...neuroData, motorBulk: e.target.value })}
                    placeholder="e.g. Generalized disuse atrophy; tremor / dystonia / none"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Reflexes & Pathological Signs
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Deep Tendon Reflexes (DTR 0–4+)</label>
                  <input
                    type="text"
                    value={neuroData.reflexesDTR}
                    onChange={(e) => onNeuroChange({ ...neuroData, reflexesDTR: e.target.value })}
                    placeholder="e.g. Biceps (C5-6): 3+ R / 2+ L; Knee (L3-4): 3+ R / 2+ L"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Pathological Reflexes (Babinski / Hoffmann / Clonus)</label>
                  <input
                    type="text"
                    value={neuroData.reflexesPathological}
                    onChange={(e) => onNeuroChange({ ...neuroData, reflexesPathological: e.target.value })}
                    placeholder="e.g. Right Babinski positive (extensor response); Hoffmann positive right"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Cranial Nerve Screen</label>
                  <input
                    type="text"
                    value={neuroData.cranialNerves}
                    onChange={(e) => onNeuroChange({ ...neuroData, cranialNerves: e.target.value })}
                    placeholder="e.g. Mild right facial droop (UMN VII); intact swallow and extraocular movements"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coordination, Balance & Gait */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Sensory, Coordination, Balance & Functional Mobility
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Sensory Examination</label>
                <input
                  type="text"
                  value={neuroData.sensoryExam.lightTouch}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      sensoryExam: { ...neuroData.sensoryExam, lightTouch: e.target.value },
                    })
                  }
                  placeholder="e.g. Impaired touch & proprioception R leg"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Coordination (Finger-Nose / Heel-Shin)</label>
                <input
                  type="text"
                  value={neuroData.coordination.fingerNose}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      coordination: { ...neuroData.coordination, fingerNose: e.target.value },
                    })
                  }
                  placeholder="e.g. Mild dysmetria right side"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Static & Dynamic Balance</label>
                <input
                  type="text"
                  value={neuroData.balance.standing}
                  onChange={(e) =>
                    onNeuroChange({
                      ...neuroData,
                      balance: { ...neuroData.balance, standing: e.target.value },
                    })
                  }
                  placeholder="e.g. Standing balance fair; Romberg +ve"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Neurological Gait & Mobility</label>
                <input
                  type="text"
                  value={neuroData.neuroGait}
                  onChange={(e) => onNeuroChange({ ...neuroData, neuroGait: e.target.value })}
                  placeholder="e.g. Hemiplegic gait with circumduction R leg"
                  className="w-full px-2 py-1 border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE C: CARDIOPULMONARY EXAMINATION */}
      {/* ──────────────────────────────────────────────────────────── */}
      {specialty === 'cardiopulmonary' && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-600" />
              Cardiopulmonary Physical Examination
            </h4>
            <span className="text-xs text-slate-500 font-medium">Respiratory, Auscultation & 6MWT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Chest Expansion (Tape Measurement)</label>
              <input
                type="text"
                value={cardioData.chestExpansion}
                onChange={(e) => onCardioChange({ ...cardioData, chestExpansion: e.target.value })}
                placeholder="e.g. 2.5 cm at 4th ICS (Subnormal)"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Auscultation / Breath Sounds</label>
              <input
                type="text"
                value={cardioData.breathSounds}
                onChange={(e) => onCardioChange({ ...cardioData, breathSounds: e.target.value })}
                placeholder="e.g. Bilateral expiratory wheezing; decreased bases"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Cough & Sputum Characteristics</label>
              <input
                type="text"
                value={cardioData.cough}
                onChange={(e) => onCardioChange({ ...cardioData, cough: e.target.value })}
                placeholder="e.g. Productive, tenacious mucoid sputum"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">SpO₂ Rest vs Exertion</label>
              <input
                type="text"
                value={cardioData.spo2Rest}
                onChange={(e) => onCardioChange({ ...cardioData, spo2Rest: e.target.value })}
                placeholder="e.g. Rest: 94% room air; Post-walk: 89%"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">6-Minute Walk Test (6MWT)</label>
              <input
                type="text"
                value={cardioData.exerciseTolerance6MWT}
                onChange={(e) => onCardioChange({ ...cardioData, exerciseTolerance6MWT: e.target.value })}
                placeholder="e.g. 340 meters (Predicted: 520m, 65%)"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Borg Dyspnoea & RPE</label>
              <input
                type="text"
                value={cardioData.borgDyspnoea}
                onChange={(e) => onCardioChange({ ...cardioData, borgDyspnoea: e.target.value })}
                placeholder="e.g. Resting: 1; Peak exercise: 5 (Severe)"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE D: GERIATRIC EXAMINATION */}
      {/* ──────────────────────────────────────────────────────────── */}
      {specialty === 'geriatric' && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              Geriatric Comprehensive Functional & Fall Assessment
            </h4>
            <span className="text-xs text-slate-500 font-medium">TUG, Katz ADL & Lawton IADL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Fall Risk & Balance Screening
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Timed Up & Go (TUG Test seconds)</label>
                  <input
                    type="text"
                    value={geriatricData.fallRiskScore}
                    onChange={(e) => onGeriatricChange({ ...geriatricData, fallRiskScore: e.target.value })}
                    placeholder="e.g. 16.4 seconds (>12s signifies high fall risk)"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Fall History (Past 12 Months)</label>
                  <input
                    type="text"
                    value={geriatricData.fallHistory.numberOfFallsPastYear}
                    onChange={(e) =>
                      onGeriatricChange({
                        ...geriatricData,
                        fallHistory: { ...geriatricData.fallHistory, numberOfFallsPastYear: e.target.value },
                      })
                    }
                    placeholder="e.g. 2 falls: slipped in bathroom, tripped over rug"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Fear of Falling</label>
                  <input
                    type="text"
                    value={geriatricData.fallHistory.fearOfFalling}
                    onChange={(e) =>
                      onGeriatricChange({
                        ...geriatricData,
                        fallHistory: { ...geriatricData.fallHistory, fearOfFalling: e.target.value },
                      })
                    }
                    placeholder="e.g. High fear of falling; self-restricts outdoor walking"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Functional ADL (Katz) & Cognitive Screen
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Katz ADL Independence Score (out of 6)</label>
                  <input
                    type="text"
                    value={geriatricData.adlKatz.feeding}
                    onChange={(e) =>
                      onGeriatricChange({
                        ...geriatricData,
                        adlKatz: { ...geriatricData.adlKatz, feeding: e.target.value },
                      })
                    }
                    placeholder="e.g. 4/6 (Independent in feeding/dressing; requires aid for bathing/transfers)"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Lawton IADL Functional Independence</label>
                  <input
                    type="text"
                    value={geriatricData.iadlLawton.cooking}
                    onChange={(e) =>
                      onGeriatricChange({
                        ...geriatricData,
                        iadlLawton: { ...geriatricData.iadlLawton, cooking: e.target.value },
                      })
                    }
                    placeholder="e.g. Dependent for shopping and meal prep; independent medication"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Cognitive Screen (MMSE / MoCA)</label>
                  <input
                    type="text"
                    value={geriatricData.cognitiveScreening}
                    onChange={(e) => onGeriatricChange({ ...geriatricData, cognitiveScreening: e.target.value })}
                    placeholder="e.g. MMSE 27/30 (Mild memory recall deficit)"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE E: WOMEN'S HEALTH EXAMINATION */}
      {/* ──────────────────────────────────────────────────────────── */}
      {specialty === 'womens_health' && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-pink-600" />
              Women's Health & Pelvic Floor Examination
            </h4>
            <span className="text-xs text-slate-500 font-medium">Obstetric, Pelvic Floor & Diastasis Recti</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Gynecological & Obstetric History
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Obstetric / Delivery History</label>
                  <input
                    type="text"
                    value={womensHealthData.obstetricHistory}
                    onChange={(e) => onWomensHealthChange({ ...womensHealthData, obstetricHistory: e.target.value })}
                    placeholder="e.g. G2P2, normal vaginal delivery with episiotomy"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Pelvic & Urinary Symptoms</label>
                  <input
                    type="text"
                    value={womensHealthData.urinarySymptoms}
                    onChange={(e) => onWomensHealthChange({ ...womensHealthData, urinarySymptoms: e.target.value })}
                    placeholder="e.g. Stress urinary incontinence with coughing, pelvic heaviness"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Pelvic Floor & Diastasis Recti Assessment
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Pelvic Floor Muscle Strength (Modified Oxford 0–5)</label>
                  <input
                    type="text"
                    value={womensHealthData.pelvicFloorStrengthModifiedOxford}
                    onChange={(e) =>
                      onWomensHealthChange({
                        ...womensHealthData,
                        pelvicFloorStrengthModifiedOxford: e.target.value,
                      })
                    }
                    placeholder="e.g. Grade 2/5 (Weak squeeze, no lift)"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Diastasis Recti Abdominis (Inter-recti distance)</label>
                  <input
                    type="text"
                    value={womensHealthData.diastasisRectiAssessment}
                    onChange={(e) =>
                      onWomensHealthChange({
                        ...womensHealthData,
                        diastasisRectiAssessment: e.target.value,
                      })
                    }
                    placeholder="e.g. 2.5 finger widths supraumbilical with soft linea alba"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MODULE F: PAEDIATRIC EXAMINATION */}
      {/* ──────────────────────────────────────────────────────────── */}
      {specialty === 'paediatric' && (
        <div className="space-y-6 p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Baby className="w-4 h-4 text-cyan-600" />
              Paediatric Developmental & Neuromotor Examination
            </h4>
            <span className="text-xs text-slate-500 font-medium">Milestones, Tone & Reflexes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Developmental Milestones
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Gross Motor</label>
                  <input
                    type="text"
                    value={paediatricData.developmentalMilestones.grossMotor}
                    onChange={(e) =>
                      onPaediatricChange({
                        ...paediatricData,
                        developmentalMilestones: {
                          ...paediatricData.developmentalMilestones,
                          grossMotor: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Sits with support at 8 months; delayed pulling to stand"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Fine Motor & Hand Function</label>
                  <input
                    type="text"
                    value={paediatricData.developmentalMilestones.fineMotor}
                    onChange={(e) =>
                      onPaediatricChange({
                        ...paediatricData,
                        developmentalMilestones: {
                          ...paediatricData.developmentalMilestones,
                          fineMotor: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Palmar grasp present; fisted right thumb"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Neuromotor & Postural Reactions
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Muscle Tone & Primitive Reflexes</label>
                  <input
                    type="text"
                    value={paediatricData.neuromotorTone}
                    onChange={(e) => onPaediatricChange({ ...paediatricData, neuromotorTone: e.target.value })}
                    placeholder="e.g. Hypertonia lower limbs (scissoring); persistent ATNR"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Paediatric Scales (GMFCS / PBS)</label>
                  <input
                    type="text"
                    value={paediatricData.outcomeMeasures}
                    onChange={(e) => onPaediatricChange({ ...paediatricData, outcomeMeasures: e.target.value })}
                    placeholder="e.g. GMFCS Level II (Walks with limitations)"
                    className="w-full px-2 py-1 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
