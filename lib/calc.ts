export function calcMortgage(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function breakEvenYears(homePrice: number, rent: number, rate: number): number {
  const monthly = calcMortgage(homePrice * 0.8, rate, 30);
  const totalMonthly = monthly + (homePrice * 0.012) / 12; // mortgage + tax + insurance
  const monthlyDiff = totalMonthly - rent;
  if (monthlyDiff <= 0) return 0;
  const closingCosts = homePrice * 0.03;
  return closingCosts / (monthlyDiff * 12);
}

export interface CalcInputs {
  homePrice: number;
  downPaymentPct: number;
  mortgageRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  homeInsuranceMonthly: number;
  maintenanceRate: number;
  monthlyRent: number;
  rentIncreaseRate: number;
  appreciationRate: number;
  investmentReturnRate: number;
  timelineYears: number;
}

export interface CalcResults {
  monthlyMortgage: number;
  monthlyOwnership: number;
  breakevenYears: number | null;
  totalBuyCost: number;
  totalRentCost: number;
  buyNetWorth: number;
  rentNetWorth: number;
  recommendation: 'buy' | 'rent' | 'neutral';
  confidence: 'strong' | 'moderate' | 'weak';
  yearlyCosts: Array<{
    year: number;
    cumulativeBuy: number;
    cumulativeRent: number;
  }>;
}

export function fullCalc(inputs: CalcInputs): CalcResults {
  const {
    homePrice,
    downPaymentPct,
    mortgageRate,
    loanTermYears,
    propertyTaxRate,
    homeInsuranceMonthly,
    maintenanceRate,
    monthlyRent,
    rentIncreaseRate,
    appreciationRate,
    investmentReturnRate,
    timelineYears
  } = inputs;

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyMortgage = calcMortgage(loanAmount, mortgageRate, loanTermYears);
  const monthlyPropertyTax = (homePrice * propertyTaxRate) / 100 / 12;
  const monthlyMaintenance = (homePrice * maintenanceRate) / 100 / 12;
  const monthlyOwnership = monthlyMortgage + monthlyPropertyTax + homeInsuranceMonthly + monthlyMaintenance;

  const closingCosts = homePrice * 0.03;
  let totalBuyCost = closingCosts + downPayment;
  let totalRentCost = 0;
  let currentRent = monthlyRent;

  const yearlyCosts: CalcResults['yearlyCosts'] = [];
  let breakevenYear: number | null = null;

  for (let year = 1; year <= timelineYears; year++) {
    totalBuyCost += monthlyOwnership * 12;
    totalRentCost += currentRent * 12;
    currentRent *= 1 + rentIncreaseRate / 100;

    const cumulativeBuy = totalBuyCost - downPayment; // exclude down payment for cost comparison
    const cumulativeRent = totalRentCost;

    yearlyCosts.push({
      year,
      cumulativeBuy: Math.round(totalBuyCost - downPayment),
      cumulativeRent: Math.round(totalRentCost)
    });

    if (breakevenYear === null && cumulativeBuy < cumulativeRent) {
      breakevenYear = year;
    }
  }

  // Net worth calculation
  const homeValueAtEnd = homePrice * Math.pow(1 + appreciationRate / 100, timelineYears);
  const sellingCosts = homeValueAtEnd * 0.06;
  const loanBalanceAtEnd = loanAmount * (Math.pow(1 + mortgageRate / 100 / 12, loanTermYears * 12) - Math.pow(1 + mortgageRate / 100 / 12, timelineYears * 12)) / (Math.pow(1 + mortgageRate / 100 / 12, loanTermYears * 12) - 1);
  const buyNetWorth = homeValueAtEnd - sellingCosts - Math.max(0, loanBalanceAtEnd);

  // If renting, invest down payment + monthly savings
  const investedDownPayment = downPayment * Math.pow(1 + investmentReturnRate / 100, timelineYears);
  const monthlySavings = Math.max(0, monthlyOwnership - monthlyRent);
  let rentSavingsPortfolio = 0;
  for (let m = 0; m < timelineYears * 12; m++) {
    rentSavingsPortfolio = (rentSavingsPortfolio + monthlySavings) * (1 + investmentReturnRate / 100 / 12);
  }
  const rentNetWorth = investedDownPayment + rentSavingsPortfolio;

  let recommendation: 'buy' | 'rent' | 'neutral';
  let confidence: 'strong' | 'moderate' | 'weak';
  const netWorthDiff = buyNetWorth - rentNetWorth;
  const netWorthPct = Math.abs(netWorthDiff) / Math.max(buyNetWorth, rentNetWorth);

  if (netWorthDiff > 0) {
    recommendation = 'buy';
  } else if (netWorthDiff < 0) {
    recommendation = 'rent';
  } else {
    recommendation = 'neutral';
  }

  if (netWorthPct > 0.2) confidence = 'strong';
  else if (netWorthPct > 0.1) confidence = 'moderate';
  else confidence = 'weak';

  return {
    monthlyMortgage: Math.round(monthlyMortgage),
    monthlyOwnership: Math.round(monthlyOwnership),
    breakevenYears: breakevenYear,
    totalBuyCost: Math.round(totalBuyCost),
    totalRentCost: Math.round(totalRentCost),
    buyNetWorth: Math.round(buyNetWorth),
    rentNetWorth: Math.round(rentNetWorth),
    recommendation,
    confidence,
    yearlyCosts
  };
}
