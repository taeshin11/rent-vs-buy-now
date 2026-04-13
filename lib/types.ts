export interface City {
  slug: string;
  name: string;
  state: string;
  medianHomePrice: number;
  medianRent: number;
  priceToRentRatio: number;
  breakevenYears: number;
  mortgageRate: number;
  propertyTax: number;
  verdict: 'buy' | 'rent' | 'neutral';
}

export interface Factors {
  mortgageRate: number;
  downPaymentPercent: number;
  loanTermYears: number;
  propertyTaxRate: number;
  homeInsuranceRate: number;
  maintenanceRate: number;
  homeAppreciationRate: number;
  rentIncreaseRate: number;
  investmentReturnRate: number;
  closingCostsPercent: number;
  sellingCostsPercent: number;
  opportunityCostRate: number;
  nationalMedianRent: number;
  nationalMedianHomePrice: number;
  nationalBreakevenYears: number;
  nationalPriceToRentRatio: number;
  lastUpdated: string;
}
