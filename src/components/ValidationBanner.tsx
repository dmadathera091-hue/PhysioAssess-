import React from 'react';
import { ValidationReport } from '../utils/calculations';
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  validation: ValidationReport;
  onNavigateToSection?: (sectionId: string) => void;
}

export const ValidationBanner: React.FC<Props> = ({ validation }) => {
  const [expanded, setExpanded] = React.useState<boolean>(validation.requiredMissing.length > 0);

  const { requiredMissing, recommendedAssessments, completedSections, hasRedFlags, completionPercentage } =
    validation;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              requiredMissing.length === 0 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
            }`}
          />
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              Clinical Quality & Completeness Validation
              {hasRedFlags && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  ⚠️ RED FLAG FLAGGED
                </span>
              )}
            </h4>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>{completionPercentage}% Essential Documentation Completed</span>
              <span>•</span>
              <span className={requiredMissing.length > 0 ? 'text-amber-700 font-semibold' : 'text-emerald-700'}>
                {requiredMissing.length === 0 ? 'All essential findings documented' : `${requiredMissing.length} required findings missing`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Bar Mini */}
          <div className="w-24 bg-slate-200 rounded-full h-2 hidden sm:block overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                completionPercentage >= 90 ? 'bg-emerald-500' : completionPercentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Required Missing */}
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>⚠️ REQUIRED INFORMATION MISSING ({requiredMissing.length})</span>
            </div>
            {requiredMissing.length === 0 ? (
              <p className="text-[11px] text-emerald-700 font-medium">✓ No essential clinical findings missing.</p>
            ) : (
              <ul className="space-y-1 text-[11px] text-amber-800 list-disc list-inside">
                {requiredMissing.map((item, idx) => (
                  <li key={idx} className="leading-tight">
                    <span className="font-semibold text-amber-950">⚠️ MISSING REQUIRED FINDING:</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recommended Additional Assessments */}
          <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>⚠️ RECOMMENDED ADDITIONAL ASSESSMENTS ({recommendedAssessments.length})</span>
            </div>
            {recommendedAssessments.length === 0 ? (
              <p className="text-[11px] text-blue-700">No additional condition-specific recommendations pending.</p>
            ) : (
              <ul className="space-y-1 text-[11px] text-blue-800 list-disc list-inside">
                {recommendedAssessments.map((item, idx) => (
                  <li key={idx} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Completed Sections */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>✓ COMPLETED SECTIONS ({completedSections.length})</span>
            </div>
            <div className="space-y-0.5 text-[11px] text-emerald-800 max-h-36 overflow-y-auto">
              {completedSections.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
