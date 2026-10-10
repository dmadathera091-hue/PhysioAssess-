/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CompleteAssessment } from './types/assessment';
import { createEmptyAssessment, SAMPLE_TEMPLATES } from './data/defaultAssessment';
import {
  saveAssessmentToLocalStorage,
  loadAssessmentFromLocalStorage,
  downloadAssessmentAsJSON,
  parseUploadedJSON,
} from './utils/storage';
import { validateAssessment } from './utils/calculations';
import { Navigation, SECTIONS_LIST } from './components/Navigation';
import { ValidationBanner } from './components/ValidationBanner';
import { SectionIdentification } from './components/sections/SectionIdentification';
import { SectionVitals } from './components/sections/SectionVitals';
import { SectionChiefComplaints } from './components/sections/SectionChiefComplaints';
import { SectionHPI } from './components/sections/SectionHPI';
import { SectionPastMedicalHistory } from './components/sections/SectionPastMedicalHistory';
import { SectionPresentHistory } from './components/sections/SectionPresentHistory';
import { SectionSurgicalHistory } from './components/sections/SectionSurgicalHistory';
import { SectionSocioeconomic } from './components/sections/SectionSocioeconomic';
import { SectionEnvironmental } from './components/sections/SectionEnvironmental';
import { SectionPainHistory } from './components/sections/SectionPainHistory';
import { SectionObservation } from './components/sections/SectionObservation';
import { SectionPalpation } from './components/sections/SectionPalpation';
import { SectionSpecialtyExam } from './components/sections/SectionSpecialtyExam';
import { SectionInvestigations } from './components/sections/SectionInvestigations';
import { SectionDiagnosis } from './components/sections/SectionDiagnosis';
import { SectionSpecialTests } from './components/sections/SectionSpecialTests';
import { SectionICFAndProblemList } from './components/sections/SectionICFAndProblemList';
import { SectionGoalsAndManagement } from './components/sections/SectionGoalsAndManagement';
import { SectionRedFlagsAndFollowUp } from './components/sections/SectionRedFlagsAndFollowUp';
import { ProfessionalReport } from './components/ProfessionalReport';
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function App() {
  const [assessment, setAssessment] = useState<CompleteAssessment>(() => {
    const saved = loadAssessmentFromLocalStorage();
    return saved || createEmptyAssessment();
  });

  const [activeView, setActiveView] = useState<'form' | 'report'>('form');
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  // Auto-save to LocalStorage with debouncing
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsSaving(true);
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveAssessmentToLocalStorage(assessment);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(timeStr);
      setIsSaving(false);
    }, 600);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [assessment]);

  const validation = validateAssessment(assessment);

  const handleDownloadJSON = () => {
    downloadAssessmentAsJSON(assessment);
  };

  const handleUploadJSON = (fileContent: string) => {
    try {
      const parsed = parseUploadedJSON(fileContent);
      setAssessment(parsed);
      setActiveView('form');
    } catch (err: any) {
      alert(`Failed to import JSON: ${err.message || 'Invalid format'}`);
    }
  };

  const handleNewAssessment = () => {
    setShowConfirmReset(true);
  };

  const confirmResetAssessment = () => {
    const empty = createEmptyAssessment();
    setAssessment(empty);
    saveAssessmentToLocalStorage(empty);
    setShowConfirmReset(false);
    setActiveView('form');
    setActiveSection('sec-1');
  };

  const handleLoadTemplate = (templateId: string) => {
    const template = SAMPLE_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      const empty = createEmptyAssessment();
      const merged: CompleteAssessment = {
        ...empty,
        ...template.data,
        specialty: template.specialty || 'orthopaedic',
        identification: { ...empty.identification, ...(template.data.identification || {}) },
        vitals: { ...empty.vitals, ...(template.data.vitals || {}) },
        chiefComplaints: template.data.chiefComplaints || empty.chiefComplaints,
        hpi: { ...empty.hpi, ...(template.data.hpi || {}) },
        pain: { ...empty.pain, ...(template.data.pain || {}) },
        observation: { ...empty.observation, ...(template.data.observation || {}) },
        palpation: { ...empty.palpation, ...(template.data.palpation || {}) },
        orthopaedicExam: { ...empty.orthopaedicExam, ...(template.data.orthopaedicExam || {}) },
        specialTests: template.data.specialTests || empty.specialTests,
        medicalDiagnosis: { ...empty.medicalDiagnosis, ...(template.data.medicalDiagnosis || {}) },
        physiotherapyDiagnosis: { ...empty.physiotherapyDiagnosis, ...(template.data.physiotherapyDiagnosis || {}) },
        goals: template.data.goals || empty.goals,
        management: { ...empty.management, ...(template.data.management || {}) },
        redFlags: { ...empty.redFlags, ...(template.data.redFlags || {}) },
        followUp: { ...empty.followUp, ...(template.data.followUp || {}) },
      };
      setAssessment(merged);
      setActiveView('form');
    }
  };

  const handleJumpToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Previous & Next navigation
  const currentIndex = SECTIONS_LIST.findIndex((s) => s.id === activeSection);
  const handleNextSection = () => {
    if (currentIndex < SECTIONS_LIST.length - 1) {
      const nextId = SECTIONS_LIST[currentIndex + 1].id;
      handleJumpToSection(nextId);
    } else {
      setActiveView('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (currentIndex > 0) {
      const prevId = SECTIONS_LIST[currentIndex - 1].id;
      handleJumpToSection(prevId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white pb-16">
      {/* Sticky Global Clinical Navigation */}
      <Navigation
        assessment={assessment}
        activeView={activeView}
        onViewChange={setActiveView}
        onDownloadJSON={handleDownloadJSON}
        onUploadJSON={handleUploadJSON}
        onNewAssessment={handleNewAssessment}
        onLoadTemplate={handleLoadTemplate}
        activeSection={activeSection}
        onJumpToSection={handleJumpToSection}
        lastSavedTime={lastSavedTime}
        isSaving={isSaving}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {/* Reset Confirmation Modal */}
        {showConfirmReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-bold text-slate-900">Start New Patient Assessment?</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                This will clear the current patient form and start a fresh session. If you wish to keep this record, please click &quot;Download JSON&quot; first to export the session file.
              </p>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmResetAssessment}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear & Start Fresh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PROFESSIONAL REPORT */}
        {activeView === 'report' ? (
          <ProfessionalReport
            assessment={assessment}
            onEditInForm={() => {
              setActiveView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* VIEW 1: STRUCTURED ASSESSMENT FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Sticky Section Directory Index */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-3">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Sections Directory</span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                    {validation.completionPercentage}% Done
                  </span>
                </div>
                <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {SECTIONS_LIST.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleJumpToSection(sec.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{sec.label}</span>
                        <ChevronRight className={`w-3 h-3 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* View Report Fast Button */}
              <button
                type="button"
                onClick={() => {
                  setActiveView('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                Generate Final Clinical Report
              </button>
            </aside>

            {/* Right Column: Main Form Sections */}
            <div className="lg:col-span-9 space-y-6">
              {/* Mandatory Clinical Completeness & Missing Findings Banner */}
              <ValidationBanner validation={validation} />

              {/* Section 1: Identification */}
              <div id="sec-1" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionIdentification
                  data={assessment.identification}
                  onChange={(identification) => setAssessment({ ...assessment, identification })}
                />
              </div>

              {/* Section 2: Vitals */}
              <div id="sec-2" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionVitals
                  data={assessment.vitals}
                  onChange={(vitals) => setAssessment({ ...assessment, vitals })}
                />
              </div>

              {/* Section 3: Chief Complaints */}
              <div id="sec-3" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionChiefComplaints
                  complaints={assessment.chiefComplaints}
                  generalComplaint={assessment.chiefComplaintsGeneral}
                  onComplaintsChange={(chiefComplaints) => setAssessment({ ...assessment, chiefComplaints })}
                  onGeneralChange={(chiefComplaintsGeneral) => setAssessment({ ...assessment, chiefComplaintsGeneral })}
                />
              </div>

              {/* Section 4: HPI */}
              <div id="sec-4" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionHPI
                  data={assessment.hpi}
                  onChange={(hpi) => setAssessment({ ...assessment, hpi })}
                />
              </div>

              {/* Section 5: Past Medical History */}
              <div id="sec-5" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionPastMedicalHistory
                  selectedConditions={assessment.pastMedicalHistory.selectedConditions}
                  conditionItems={assessment.pastMedicalHistory.conditionItems}
                  additionalNotes={assessment.pastMedicalHistory.additionalNotes}
                  onSelectedConditionsChange={(selectedConditions) =>
                    setAssessment({
                      ...assessment,
                      pastMedicalHistory: { ...assessment.pastMedicalHistory, selectedConditions },
                    })
                  }
                  onConditionItemsChange={(conditionItems) =>
                    setAssessment({
                      ...assessment,
                      pastMedicalHistory: { ...assessment.pastMedicalHistory, conditionItems },
                    })
                  }
                  onAdditionalNotesChange={(additionalNotes) =>
                    setAssessment({
                      ...assessment,
                      pastMedicalHistory: { ...assessment.pastMedicalHistory, additionalNotes },
                    })
                  }
                />
              </div>

              {/* Section 6: Present Personal History */}
              <div id="sec-6" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionPresentHistory
                  data={assessment.presentHistory}
                  onChange={(presentHistory) => setAssessment({ ...assessment, presentHistory })}
                />
              </div>

              {/* Section 7: Surgical History */}
              <div id="sec-7" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionSurgicalHistory
                  surgeries={assessment.surgicalHistory.surgeries}
                  currentSurgicalStatus={assessment.surgicalHistory.currentSurgicalStatus}
                  onSurgeriesChange={(surgeries) =>
                    setAssessment({
                      ...assessment,
                      surgicalHistory: { ...assessment.surgicalHistory, surgeries },
                    })
                  }
                  onCurrentStatusChange={(currentSurgicalStatus) =>
                    setAssessment({
                      ...assessment,
                      surgicalHistory: { ...assessment.surgicalHistory, currentSurgicalStatus },
                    })
                  }
                />
              </div>

              {/* Section 8: Socioeconomic History (Modified Kuppuswamy) */}
              <div id="sec-8" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionSocioeconomic
                  data={assessment.socioeconomic}
                  onChange={(socioeconomic) => setAssessment({ ...assessment, socioeconomic })}
                />
              </div>

              {/* Section 9: Environmental History */}
              <div id="sec-9" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionEnvironmental
                  data={assessment.environmental}
                  onChange={(environmental) => setAssessment({ ...assessment, environmental })}
                />
              </div>

              {/* Section 10 & 11: Pain Assessment & VAS/NPRS Scales */}
              <div id="sec-10" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionPainHistory
                  data={assessment.pain}
                  onChange={(pain) => setAssessment({ ...assessment, pain })}
                />
              </div>

              {/* Section 12: Observation */}
              <div id="sec-12" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionObservation
                  data={assessment.observation}
                  onChange={(observation) => setAssessment({ ...assessment, observation })}
                />
              </div>

              {/* Section 13: Palpation */}
              <div id="sec-13" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionPalpation
                  data={assessment.palpation}
                  onChange={(palpation) => setAssessment({ ...assessment, palpation })}
                />
              </div>

              {/* Section 14: Specialty Physical Examination */}
              <div id="sec-14" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionSpecialtyExam
                  specialty={assessment.specialty}
                  specialtyOther={assessment.specialtyOther}
                  onSpecialtyChange={(specialty) => setAssessment({ ...assessment, specialty })}
                  onSpecialtyOtherChange={(specialtyOther) => setAssessment({ ...assessment, specialtyOther })}
                  orthoData={assessment.orthopaedicExam}
                  onOrthoChange={(orthopaedicExam) => setAssessment({ ...assessment, orthopaedicExam })}
                  neuroData={assessment.neurologicalExam}
                  onNeuroChange={(neurologicalExam) => setAssessment({ ...assessment, neurologicalExam })}
                  cardioData={assessment.cardiopulmonaryExam}
                  onCardioChange={(cardiopulmonaryExam) => setAssessment({ ...assessment, cardiopulmonaryExam })}
                  geriatricData={assessment.geriatricExam}
                  onGeriatricChange={(geriatricExam) => setAssessment({ ...assessment, geriatricExam })}
                  womensHealthData={assessment.womensHealthExam}
                  onWomensHealthChange={(womensHealthExam) => setAssessment({ ...assessment, womensHealthExam })}
                  paediatricData={assessment.paediatricExam}
                  onPaediatricChange={(paediatricExam) => setAssessment({ ...assessment, paediatricExam })}
                />
              </div>

              {/* Section 15: Investigations */}
              <div id="sec-15" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionInvestigations
                  investigations={assessment.investigations}
                  onChange={(investigations) => setAssessment({ ...assessment, investigations })}
                />
              </div>

              {/* Section 16 & 17: Medical Diagnosis & Physiotherapy Diagnosis */}
              <div id="sec-16" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionDiagnosis
                  medicalDiagnosis={assessment.medicalDiagnosis}
                  onMedicalChange={(medicalDiagnosis) => setAssessment({ ...assessment, medicalDiagnosis })}
                  ptDiagnosis={assessment.physiotherapyDiagnosis}
                  onPtChange={(physiotherapyDiagnosis) => setAssessment({ ...assessment, physiotherapyDiagnosis })}
                />
              </div>

              {/* Section 18: Special Tests */}
              <div id="sec-18" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionSpecialTests
                  specialTests={assessment.specialTests}
                  specialty={assessment.specialty}
                  onChange={(specialTests) => setAssessment({ ...assessment, specialTests })}
                />
              </div>

              {/* Section 19 & 20: ICF Problem Matrix & Prioritized Problem List */}
              <div id="sec-19" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionICFAndProblemList
                  icfProblems={assessment.icfProblems}
                  prioritizedProblems={assessment.prioritizedProblems}
                  onIcfProblemsChange={(icfProblems) => setAssessment({ ...assessment, icfProblems })}
                  onPrioritizedChange={(prioritizedProblems) => setAssessment({ ...assessment, prioritizedProblems })}
                />
              </div>

              {/* Section 21 & 22: SMART Goals & Management (HEP) */}
              <div id="sec-21" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionGoalsAndManagement
                  goals={assessment.goals}
                  management={assessment.management}
                  onGoalsChange={(goals) => setAssessment({ ...assessment, goals })}
                  onManagementChange={(management) => setAssessment({ ...assessment, management })}
                />
              </div>

              {/* Section 23 & 24: Red Flags & Follow-Up */}
              <div id="sec-23" className="scroll-mt-36 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <SectionRedFlagsAndFollowUp
                  redFlags={assessment.redFlags}
                  followUp={assessment.followUp}
                  onRedFlagsChange={(redFlags) => setAssessment({ ...assessment, redFlags })}
                  onFollowUpChange={(followUp) => setAssessment({ ...assessment, followUp })}
                />
              </div>

              {/* Bottom Pagination & Finish Bar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={currentIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    currentIndex === 0
                      ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Section
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  Viewing Section {currentIndex + 1} of {SECTIONS_LIST.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>{currentIndex === SECTIONS_LIST.length - 1 ? 'Review & View Report' : 'Next Section'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
