import { Metadata } from 'next';
import Link from 'next/link';
import citiesData from '@/data/cities-fallback.json';
import { City } from '@/lib/types';
import VerdictBadge from '@/components/VerdictBadge';

interface StatesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Rent vs Buy by State — 2025 Overview | RentVsBuyNow',
    description: 'State-by-state rent vs buy analysis. See which states are best for buying or renting a home in 2025.',
  };
}

interface StateData {
  state: string;
  cities: City[];
  avgRatio: number;
  avgBreakeven: number;
  avgRent: number;
  avgPrice: number;
  verdict: 'buy' | 'rent' | 'neutral';
}

export default async function StatesPage({ params }: StatesPageProps) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const cities = citiesData as City[];

  // Group by state
  const stateMap = new Map<string, City[]>();
  for (const city of cities) {
    if (!stateMap.has(city.state)) stateMap.set(city.state, []);
    stateMap.get(city.state)!.push(city);
  }

  const states: StateData[] = Array.from(stateMap.entries()).map(([state, stateCities]) => {
    const avgRatio = Math.round(stateCities.reduce((s, c) => s + c.priceToRentRatio, 0) / stateCities.length);
    const avgBreakeven = Math.round(stateCities.reduce((s, c) => s + c.breakevenYears, 0) / stateCities.length);
    const avgRent = Math.round(stateCities.reduce((s, c) => s + c.medianRent, 0) / stateCities.length);
    const avgPrice = Math.round(stateCities.reduce((s, c) => s + c.medianHomePrice, 0) / stateCities.length);
    const verdict: 'buy' | 'rent' | 'neutral' = avgRatio < 15 ? 'buy' : avgRatio > 20 ? 'rent' : 'neutral';
    return { state, cities: stateCities, avgRatio, avgBreakeven, avgRent, avgPrice, verdict };
  }).sort((a, b) => a.avgRatio - b.avgRatio);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'US States Rent vs Buy Overview 2025',
    numberOfItems: states.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Rent vs Buy by State — 2025</h1>
          <p className="text-orange-100">State-level aggregated rent vs buy data. Click a state to see individual cities.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="overflow-x-auto rounded-xl border border-orange-100">
          <table className="w-full text-sm">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">State</th>
                <th className="px-4 py-3 text-right font-semibold text-stone-700">Cities</th>
                <th className="px-4 py-3 text-right font-semibold text-stone-700">Avg Rent</th>
                <th className="px-4 py-3 text-right font-semibold text-stone-700">Avg Home Price</th>
                <th className="px-4 py-3 text-right font-semibold text-stone-700">Avg P/R Ratio</th>
                <th className="px-4 py-3 text-right font-semibold text-stone-700">Avg Breakeven</th>
                <th className="px-4 py-3 text-center font-semibold text-stone-700">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s, i) => (
                <tr key={s.state} className={`border-t border-orange-50 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}`}>
                  <td className="px-4 py-3 font-medium text-orange-700">{s.state}</td>
                  <td className="px-4 py-3 text-right text-stone-600">{s.cities.length}</td>
                  <td className="px-4 py-3 text-right text-stone-600">${s.avgRent.toLocaleString()}/mo</td>
                  <td className="px-4 py-3 text-right text-stone-600">${(s.avgPrice / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-right text-stone-600">{s.avgRatio}x</td>
                  <td className="px-4 py-3 text-right text-stone-600">{s.avgBreakeven} yrs</td>
                  <td className="px-4 py-3 text-center">
                    <VerdictBadge verdict={s.verdict} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cities by State */}
        <div className="mt-12 space-y-8">
          {states.map(s => (
            <div key={s.state}>
              <h2 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-3">
                {s.state}
                <VerdictBadge verdict={s.verdict} size="sm" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {s.cities.map(city => (
                  <Link
                    key={city.slug}
                    href={`${prefix}/cities/${city.slug}`}
                    className="bg-white border border-orange-100 rounded-lg p-3 hover:border-orange-300 hover:shadow-sm transition-all flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-stone-800 text-sm">{city.name}</div>
                      <div className="text-xs text-stone-400">${city.medianRent.toLocaleString()}/mo · {city.priceToRentRatio}x ratio</div>
                    </div>
                    <VerdictBadge verdict={city.verdict} size="sm" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
