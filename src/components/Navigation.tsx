import React, { useRef } from 'react';
import { CompleteAssessment } from '../types/assessment';
import { SAMPLE_TEMPLATES } from '../data/defaultAssessment';
import {
  Download,
  Upload,
  FilePlus,
  Activity,
  CheckCircle,
  Clock,
  Layers,
  FileText,
  UserCheck,
} from 'lucide-react';

interface Props {
  assessment: CompleteAssessment;
  activeView: 'form' | 'report';
  onViewChange: (view: 'form' | 'report') => void;
  onDownloadJSON: () => void;
  onUploadJSON: (fileContent: string) => void;
  onNewAssessment: () => void;
  onLoadTemplate: (templateId: string) => void;
  activeSection: string;
  onJumpToSection: (sectionId: string) => void;
  lastSavedTime: string | null;
  isSaving: boolean;
}

export const SECTIONS_LIST = [
  { id: 'sec-1', label: '1. Patient Identification', number: '1' },
  { id: 'sec-2', label: '2. Vital Signs', number: '2' },
  { id: 'sec-3', label: '3. Chief Complaints', number: '3' },
  { id: 'sec-4', label: '4. History of Present Illness', number: '4' },
  { id: 'sec-5', label: '5. Past Medical History', number: '5' },
  { id: 'sec-6', label: '6. Present History (Diet, Sleep, Habits, Bowel/Bladder)', number: '6' },
  { id: 'sec-7', label: '7. Surgical History', number: '7' },
  { id: 'sec-8', label: '8. Socioeconomic (Kuppuswamy)', number: '8' },
  { id: 'sec-9', label: '9. Environmental History', number: '9' },
  { id: 'sec-10', label: '10 & 11. Pain History & Scales (VAS/NPRS)', number: '10' },
  { id: 'sec-12', label: '12. Objective Observation', number: '12' },
  { id: 'sec-13', label: '13. Palpation', number: '13' },
  { id: 'sec-14', label: '14. Detailed Specialty Examination', number: '14' },
  { id: 'sec-15', label: '15. Diagnostic Investigations', number: '15' },
  { id: 'sec-16', label: '16 & 17. Medical & ICF Physiotherapy Diagnosis', number: '16' },
  { id: 'sec-18', label: '18. Special Tests Battery', number: '18' },
  { id: 'sec-19', label: '19 & 20. ICF Matrix & Prioritized Problem List', number: '19' },
  { id: 'sec-21', label: '21 & 22. SMART Goals & Management (HEP)', number: '21' },
  { id: 'sec-23', label: '23 & 24. Red Flags, Precautions & Follow-Up', number: '23' },
];

export const Navigation: React.FC<Props> = ({
  assessment,
  activeView,
  onViewChange,
  onDownloadJSON,
  onUploadJSON,
  onNewAssessment,
  onLoadTemplate,
  activeSection,
  onJumpToSection,
  lastSavedTime,
  isSaving,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onUploadJSON(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-2.5 gap-2">
          {/* Brand & Patient Snapshot */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  PhysioAssess<span className="text-emerald-600">Pro</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded-sm">
                  Clinical Edition
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span className="font-medium text-slate-700">
                  {assessment.identification.name ? assessment.identification.name : 'New Patient Record'}
                </span>
                {assessment.identification.age && (
                  <span>• {assessment.identification.age} yrs</span>
                )}
                <span>• {assessment.specialty.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Local Storage Indicator & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-save Status Pill */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
              title="State is persisted automatically to browser LocalStorage to protect against page reload"
            >
              {isSaving ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auto-saved {lastSavedTime || 'locally'}</span>
                </>
              )}
            </div>

            {/* Template Selector */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onLoadTemplate(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium cursor-pointer hover:border-slate-400"
              title="Load standard clinical exemplar case"
            >
              <option value="" disabled>
                📋 Load Clinical Template...
              </option>
              {SAMPLE_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tmpl.name}
                </option>
              ))}
            </select>

            {/* Download JSON Button */}
            <button
              type="button"
              onClick={onDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg cursor-pointer transition-colors shadow-xs"
              title="Export complete session data as a JSON file"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              Download JSON
            </button>

            {/* Import JSON Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg cursor-pointer transition-colors"
              title="Import previously saved assessment JSON file"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />

            {/* New Patient Button */}
            <button
              type="button"
              onClick={onNewAssessment}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer transition-colors"
              title="Clear current form and start new patient assessment"
            >
              <FilePlus className="w-3.5 h-3.5" />
              New Patient
            </button>
          </div>
        </div>

        {/* View Mode Switcher and Fast Jump Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-t border-slate-100 gap-2">
          {/* View Mode Toggle: Form vs Report */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 w-fit">
            <button
              type="button"
              onClick={() => onViewChange('form')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeView === 'form'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              VIEW 1 — Assessment Form
            </button>

            <button
              type="button"
              onClick={() => onViewChange('report')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeView === 'report'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              VIEW 2 — Professional Report
            </button>
          </div>

          {/* Quick Jump Dropdown for Form View */}
          {activeView === 'form' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Jump to Section:</span>
              <select
                value={activeSection}
                onChange={(e) => onJumpToSection(e.target.value)}
                className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                {SECTIONS_LIST.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
