import React, { useEffect } from 'react';
import { PatientIdentification } from '../../types/assessment';
import { GENDER_OPTIONS, COMMON_OCCUPATIONS, MARITAL_STATUSES } from '../../data/clinicalKnowledge';
import { calculateAgeFromDOB, calculateBMI } from '../../utils/calculations';
import { User, Phone, MapPin, Calendar, Heart, ShieldAlert } from 'lucide-react';

interface Props {
  data: PatientIdentification;
  onChange: (data: PatientIdentification) => void;
}

export const SectionIdentification: React.FC<Props> = ({ data, onChange }) => {
  const updateField = <K extends keyof PatientIdentification>(key: K, value: PatientIdentification[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  // Auto calculate age when DOB changes
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    const computedAge = calculateAgeFromDOB(newDob);
    onChange({
      ...data,
      dob: newDob,
      age: computedAge || data.age,
    });
  };

  // Auto calculate BMI when height or weight changes
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value;
    const { bmi, category } = calculateBMI(newHeight, data.weightKg);
    onChange({
      ...data,
      heightCm: newHeight,
      bmi,
      bmiCategory: category,
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = e.target.value;
    const { bmi, category } = calculateBMI(data.heightCm, newWeight);
    onChange({
      ...data,
      weightKg: newWeight,
      bmi,
      bmiCategory: category,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Section 1 — Patient Identification & Demographics
          </h3>
          <p className="text-xs text-slate-500">
            Baseline clinical identification, biometrics, auto-calculated age and BMI classification.
          </p>
        </div>
        {!data.name && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            ⚠️ MISSING REQUIRED FINDING: Name
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Rajesh Sharma"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Date of Assessment */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date of Assessment (DD/MM/YYYY) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.dateOfAssessment}
              onChange={(e) => updateField('dateOfAssessment', e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date of Birth (DD/MM/YYYY)
          </label>
          <input
            type="text"
            value={data.dob}
            onChange={handleDobChange}
            placeholder="DD/MM/YYYY"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Age (Years) <span className="text-xs text-slate-400 font-normal">[Auto-calc / Editable]</span>
          </label>
          <input
            type="number"
            min="0"
            max="125"
            value={data.age}
            onChange={(e) => updateField('age', e.target.value)}
            placeholder="e.g. 42"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Gender <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">-- Select Gender --</option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {data.gender === 'Prefer to self-describe' && (
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Self-described Gender
            </label>
            <input
              type="text"
              value={data.genderOther}
              onChange={(e) => updateField('genderOther', e.target.value)}
              placeholder="Specify gender identity"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        )}

        {/* Occupation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Occupation
          </label>
          <select
            value={data.occupation}
            onChange={(e) => updateField('occupation', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">-- Select Occupation --</option>
            {COMMON_OCCUPATIONS.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>

        {data.occupation === 'Other' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Specific Occupation
            </label>
            <input
              type="text"
              value={data.occupationOther}
              onChange={(e) => updateField('occupationOther', e.target.value)}
              placeholder="e.g. Data Scientist / Warehouse Supervisor"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        )}

        {/* Marital Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Marital Status
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => updateField('maritalStatus', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">-- Select Marital Status --</option>
            {MARITAL_STATUSES.map((ms) => (
              <option key={ms} value={ms}>
                {ms}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Admission */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date of Admission (Inpatient / Day-care)
          </label>
          <input
            type="text"
            value={data.dateOfAdmission}
            onChange={(e) => updateField('dateOfAdmission', e.target.value)}
            placeholder="DD/MM/YYYY or OP Case"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Biometrics & BMI Calculation */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-emerald-600" />
          Anthropometrics & Body Mass Index (BMI)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Height (cm)</label>
            <input
              type="number"
              step="0.5"
              value={data.heightCm}
              onChange={handleHeightChange}
              placeholder="e.g. 172"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.5"
              value={data.weightKg}
              onChange={handleWeightChange}
              placeholder="e.g. 70"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Calculated BMI (kg/m²)</label>
            <div className="px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg text-slate-800">
              {data.bmi ? `${data.bmi} kg/m²` : '—'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Classification</label>
            <div className="px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg text-emerald-800 truncate">
              {data.bmiCategory || 'Awaiting height & weight'}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            Residential Address
          </label>
          <textarea
            rows={3}
            value={data.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Full postal address with locality/city"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+91 / Mobile"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                value={data.emergencyContact}
                onChange={(e) => updateField('emergencyContact', e.target.value)}
                placeholder="Name & Contact number"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
              <input
                type="text"
                value={data.relationship}
                onChange={(e) => updateField('relationship', e.target.value)}
                placeholder="e.g. Spouse / Parent / Sibling"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
