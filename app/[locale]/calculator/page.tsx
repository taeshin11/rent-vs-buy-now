import { Metadata } from 'next';
import RentVsBuyCalc from '@/components/RentVsBuyCalc';

interface CalcPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Rent vs Buy Calculator — Personalized Breakeven Analysis 2025 | RentVsBuyNow',
    description: 'Free interactive rent vs buy calculator. Enter your income, savings, and timeline to get a personalized breakeven analysis and net worth comparison.',
    openGraph: {
      title: 'Free Rent vs Buy Calculator 2025',
      description: 'Personalized breakeven analysis with net worth comparison over time.',
    }
  };
}

export default async function CalculatorPage({ params }: CalcPageProps) {
  await params; // ensure locale is resolved

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RentVsBuyNow Calculator',
    description: 'Interactive rent vs buy breakeven calculator',
    url: 'https://rent-vs-buy-now.vercel.app/calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Rent vs Buy Calculator</h1>
          <p className="text-orange-100">
            Enter your details to get a personalized breakeven analysis and net worth comparison over time.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <RentVsBuyCalc />

        {/* How it works */}
        <div className="mt-12 bg-white border border-orange-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">How This Calculator Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-600">
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Ownership Costs Include:</h3>
              <ul className="space-y-1">
                <li>• Monthly mortgage payment (PITI)</li>
                <li>• Property taxes (annual % of home value)</li>
                <li>• Home insurance</li>
                <li>• Maintenance and repairs (annual %)</li>
                <li>• Closing costs (3% of purchase price)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Rent + Invest Scenario:</h3>
              <ul className="space-y-1">
                <li>• Monthly rent (growing at rent increase rate)</li>
                <li>• Down payment invested at investment return rate</li>
                <li>• Monthly savings (if rent &lt; ownership cost) invested</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Breakeven Year:</h3>
              <p>The year when cumulative ownership costs (excluding down payment) drop below cumulative rent costs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Net Worth at End:</h3>
              <p>Buy scenario: home equity (value minus outstanding loan minus selling costs). Rent scenario: invested down payment plus invested savings.</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-orange-50 rounded-xl text-xs text-stone-500">
            <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs you provide. Actual results will vary based on market conditions, tax situation, and other factors. Consult a financial advisor before making major housing decisions.
          </div>
        </div>
      </div>
    </>
  );
}
