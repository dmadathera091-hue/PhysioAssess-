import React from 'react';
import { BODY_PARTS_DIAGRAM } from '../data/clinicalKnowledge';
import { MapPin, Check } from 'lucide-react';

interface BodyDiagramProps {
  selectedSites: string[];
  primarySite: string;
  onToggleSite: (site: string) => void;
  onSetPrimarySite: (site: string) => void;
}

export const BodyDiagram: React.FC<BodyDiagramProps> = ({
  selectedSites,
  primarySite,
  onToggleSite,
  onSetPrimarySite,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            Interactive Anatomical Site Selector
          </h4>
          <p className="text-xs text-slate-500">
            Click on anatomical regions to map pain sites. Radio-select the primary symptom driver.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {selectedSites.length} {selectedSites.length === 1 ? 'region' : 'regions'} tagged
        </div>
      </div>

      {/* Anatomical Regions Grid with Front/Back or Region groupings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {BODY_PARTS_DIAGRAM.map((part) => {
          const isSelected = selectedSites.includes(part.id);
          const isPrimary = primarySite === part.id;

          return (
            <div
              key={part.id}
              className={`relative flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                isSelected
                  ? isPrimary
                    ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-xs'
                    : 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <button
                  type="button"
                  onClick={() => onToggleSite(part.id)}
                  className="flex-1 font-medium text-xs text-left cursor-pointer focus:outline-hidden"
                >
                  {part.label}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSite(part.id)}
                  className={`w-4 h-4 rounded-sm flex items-center justify-center text-[10px] shrink-0 ${
                    isSelected ? (isPrimary ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white') : 'border border-slate-300'
                  }`}
                  title={isSelected ? 'Remove site' : 'Select site'}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              </div>

              {isSelected && (
                <div className="mt-1 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                  <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="primarySiteSelector"
                      checked={isPrimary}
                      onChange={() => onSetPrimarySite(part.id)}
                      className="text-rose-600 focus:ring-rose-500 h-3 w-3"
                    />
                    Primary
                  </label>
                  <span className="text-[9px] uppercase px-1 py-0.5 rounded-xs bg-white text-slate-500 border border-slate-200">
                    {part.side}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {primarySite && (
        <div className="mt-3 text-xs bg-rose-50/70 border border-rose-200 rounded-lg p-2.5 flex items-center gap-2 text-rose-900">
          <span className="font-semibold">Primary Site:</span>
          <span>{primarySite}</span>
        </div>
      )}
    </div>
  );
};
