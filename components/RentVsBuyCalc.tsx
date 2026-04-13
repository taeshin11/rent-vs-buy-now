'use client';

import { useState } from 'react';
import { fullCalc, CalcInputs, CalcResults } from '@/lib/calc';
import BreakevenChart from './BreakevenChart';
import VerdictBadge from './VerdictBadge';

interface RentVsBuyCalcProps {
  initialInputs?: Partial<CalcInputs>;
  cityName?: string;
}

const defaultInputs: CalcInputs = {
  homePrice: 420000,
  downPaymentPct: 20,
  mortgageRate: 6.8,
  loanTermYears: 30,
  propertyTaxRate: 1.1,
  homeInsuranceMonthly: 150,
  maintenanceRate: 1.0,
  monthlyRent: 1700,
  rentIncreaseRate: 3.0,
  appreciationRate: 3.5,
  investmentReturnRate: 7.0,
  timelineYears: 10
};

export default function RentVsBuyCalc({ initialInputs, cityName }: RentVsBuyCalcProps) {
  const [inputs, setInputs] = useState<CalcInputs>({ ...defaultInputs, ...initialInputs });
  const [results, setResults] = useState<CalcResults | null>(null);

  const set = (key: keyof CalcInputs, val: number) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const calculate = () => {
    setResults(fullCalc(inputs));
  };

  const reset = () => {
    setInputs({ ...defaultInputs, ...initialInputs });
    setResults(null);
  };

  const InputField = ({ label, fieldKey, min, max, step, prefix: pfx, suffix }: {
    label: string;
    fieldKey: keyof CalcInputs;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden focus-within:border-orange-400">
        {pfx && <span className="px-3 py-2 bg-stone-50 text-stone-500 text-sm border-r border-stone-200">{pfx}</span>}
        <input
          type="number"
          min={min}
          max={max}
          step={step ?? 1}
          value={inputs[fieldKey]}
          onChange={e => set(fieldKey, parseFloat(e.target.value) || 0)}
          className="flex-1 px-3 py-2 text-sm focus:outline-none"
        />
        {suffix && <span className="px-3 py-2 bg-stone-50 text-stone-500 text-sm border-l border-stone-200">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        {cityName ? `${cityName} — Rent vs Buy Calculator` : 'Rent vs Buy Calculator'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <InputField label="Home Price" fieldKey="homePrice" min={50000} max={5000000} step={1000} prefix="$" />
        <InputField label="Down Payment" fieldKey="downPaymentPct" min={3} max={100} step={0.5} suffix="%" />
        <InputField label="Mortgage Rate" fieldKey="mortgageRate" min={1} max={20} step={0.05} suffix="%" />
        <InputField label="Loan Term" fieldKey="loanTermYears" min={10} max={30} step={5} suffix="yrs" />
        <InputField label="Property Tax Rate" fieldKey="propertyTaxRate" min={0.1} max={5} step={0.1} suffix="%" />
        <InputField label="Home Insurance" fieldKey="homeInsuranceMonthly" min={50} max={1000} step={10} prefix="$" suffix="/mo" />
        <InputField label="Maintenance Rate" fieldKey="maintenanceRate" min={0.1} max={3} step={0.1} suffix="%" />
        <InputField label="Current Monthly Rent" fieldKey="monthlyRent" min={500} max={10000} step={50} prefix="$" />
        <InputField label="Rent Increase Rate" fieldKey="rentIncreaseRate" min={0} max={10} step={0.5} suffix="%" />
        <InputField label="Home Appreciation" fieldKey="appreciationRate" min={0} max={10} step={0.5} suffix="%" />
        <InputField label="Investment Return" fieldKey="investmentReturnRate" min={1} max={15} step={0.5} suffix="%" />
        <InputField label="Years You Plan to Stay" fieldKey="timelineYears" min={1} max={30} step={1} suffix="yrs" />
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={calculate}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={reset}
          className="px-6 border border-orange-200 text-stone-600 hover:bg-orange-50 rounded-xl transition-colors"
        >
          Reset
        </button>
      </div>

      {results && (
        <div className="space-y-6">
          {/* Key Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">${results.monthlyOwnership.toLocaleString()}</div>
              <div className="text-xs text-stone-500 mt-1">Monthly Ownership Cost</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">${inputs.monthlyRent.toLocaleString()}</div>
              <div className="text-xs text-stone-500 mt-1">Monthly Rent</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">
                {results.breakevenYears ? `Yr ${results.breakevenYears}` : 'N/A'}
              </div>
              <div className="text-xs text-stone-500 mt-1">Breakeven Year</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <VerdictBadge verdict={results.recommendation} size="lg" />
              <div className="text-xs text-stone-500 mt-1">Recommendation ({results.confidence})</div>
            </div>
          </div>

          {/* Net Worth Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-purple-100 rounded-xl p-4">
              <div className="text-sm text-stone-500 mb-1">Buy — Net Worth after {inputs.timelineYears} yrs</div>
              <div className="text-xl font-bold text-purple-700">${results.buyNetWorth.toLocaleString()}</div>
            </div>
            <div className="border border-orange-100 rounded-xl p-4">
              <div className="text-sm text-stone-500 mb-1">Rent+Invest — Net Worth after {inputs.timelineYears} yrs</div>
              <div className="text-xl font-bold text-orange-700">${results.rentNetWorth.toLocaleString()}</div>
            </div>
          </div>

          {/* Chart */}
          <BreakevenChart
            yearlyCosts={results.yearlyCosts}
            breakevenYear={results.breakevenYears}
            cityName={cityName}
          />
        </div>
      )}
    </div>
  );
}
