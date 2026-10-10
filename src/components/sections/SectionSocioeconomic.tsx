import React from 'react';
import { KuppuswamySocioeconomic } from '../../types/assessment';
import {
  KUPPUSWAMY_EDUCATION_SCALE,
  KUPPUSWAMY_OCCUPATION_SCALE,
  KUPPUSWAMY_SCALE_VERSION,
  calculateKuppuswamyIncomeScore,
  getKuppuswamyClass,
} from '../../data/clinicalKnowledge';
import { IndianRupee, Layers, Info } from 'lucide-react';

interface Props {
  data: KuppuswamySocioeconomic;
  onChange: (data: KuppuswamySocioeconomic) => void;
}

export const SectionSocioeconomic: React.FC<Props> = ({ data, onChange }) => {
  const handleEduChange = (score: number) => {
    const occScore = data.occupationScore;
    const incScore = data.incomeScore;
    const total = score + occScore + incScore;
    const socioClass = getKuppuswamyClass(total);

    onChange({
      ...data,
      educationLevel: score,
      educationScore: score,
      totalScore: total,
      socioeconomicClass: socioClass,
    });
  };

  const handleOccChange = (score: number) => {
    const eduScore = data.educationScore;
    const incScore = data.incomeScore;
    const total = eduScore + score + incScore;
    const socioClass = getKuppuswamyClass(total);

    onChange({
      ...data,
      occupationLevel: score,
      occupationScore: score,
      totalScore: total,
      socioeconomicClass: socioClass,
    });
  };

  const handleIncomeChange = (inrStr: string) => {
    const income = parseFloat(inrStr) || 0;
    const incScore = calculateKuppuswamyIncomeScore(income);
    const eduScore = data.educationScore;
    const occScore = data.occupationScore;
    const total = eduScore + occScore + incScore;
    const socioClass = getKuppuswamyClass(total);

    onChange({
      ...data,
      monthlyIncomeINR: income,
      incomeScore: incScore,
      totalScore: total,
      socioeconomicClass: socioClass,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Section 8 — Socioeconomic Status (Modified Kuppuswamy Scale)
          </h3>
          <p className="text-xs text-slate-500">
            Standardized socio-demographic stratification for clinical epidemiology, rehab adherence & discharge planning.
          </p>
        </div>
        <div className="text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <span>{data.scaleVersion || KUPPUSWAMY_SCALE_VERSION}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Factor A: Education */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              A. Education of Head of Family
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
              Score: {data.educationScore}
            </span>
          </div>
          <div className="space-y-1.5">
            {KUPPUSWAMY_EDUCATION_SCALE.map((item) => (
              <label
                key={item.score}
                className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  data.educationScore === item.score
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <input
                  type="radio"
                  name="kuppuswamyEdu"
                  checked={data.educationScore === item.score}
                  onChange={() => handleEduChange(item.score)}
                  className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex-1 leading-snug">{item.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">[{item.score}]</span>
              </label>
            ))}
          </div>
        </div>

        {/* Factor B: Occupation */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              B. Occupation of Head of Family
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
              Score: {data.occupationScore}
            </span>
          </div>
          <div className="space-y-1.5">
            {KUPPUSWAMY_OCCUPATION_SCALE.map((item) => (
              <label
                key={item.score}
                className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  data.occupationScore === item.score
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <input
                  type="radio"
                  name="kuppuswamyOcc"
                  checked={data.occupationScore === item.score}
                  onChange={() => handleOccChange(item.score)}
                  className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex-1 leading-snug">{item.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">[{item.score}]</span>
              </label>
            ))}
          </div>
        </div>

        {/* Factor C: Income & Summary Results */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                C. Monthly Family Income (₹)
              </label>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                Score: {data.incomeScore}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-medium text-xs">₹</span>
              <input
                type="number"
                value={data.monthlyIncomeINR || ''}
                onChange={(e) => handleIncomeChange(e.target.value)}
                placeholder="Enter monthly income in ₹"
                className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-semibold"
              />
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-2.5 border border-slate-200 rounded-lg space-y-1">
              <div className="font-medium text-slate-700">Current CPI Thresholds:</div>
              <div className="flex justify-between"><span>≥ ₹93,680</span><span className="font-semibold text-slate-700">12 pts</span></div>
              <div className="flex justify-between"><span>₹46,840 – 93,679</span><span className="font-semibold text-slate-700">10 pts</span></div>
              <div className="flex justify-between"><span>₹35,130 – 46,839</span><span className="font-semibold text-slate-700">6 pts</span></div>
              <div className="flex justify-between"><span>₹23,420 – 35,129</span><span className="font-semibold text-slate-700">4 pts</span></div>
              <div className="flex justify-between"><span>₹14,050 – 23,419</span><span className="font-semibold text-slate-700">3 pts</span></div>
              <div className="flex justify-between"><span>₹4,690 – 14,049</span><span className="font-semibold text-slate-700">2 pts</span></div>
              <div className="flex justify-between"><span>≤ ₹4,689</span><span className="font-semibold text-slate-700">1 pt</span></div>
            </div>
          </div>

          {/* Calculated Output Card */}
          <div className="p-4 bg-emerald-900 text-white rounded-xl shadow-xs space-y-2">
            <div className="text-xs font-medium text-emerald-200 uppercase tracking-wider">
              Kuppuswamy Composite Classification
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl font-bold">{data.socioeconomicClass}</div>
                <div className="text-xs text-emerald-300">Socioeconomic Class</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">{data.totalScore} / 29</div>
                <div className="text-xs text-emerald-300">Composite Score</div>
              </div>
            </div>
            <div className="pt-2 border-t border-emerald-800 text-[10px] text-emerald-300">
              Upper (26-29) • Upper-Middle (16-25) • Lower-Middle (11-15) • Upper-Lower (5-10) • Lower (&lt;5)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
