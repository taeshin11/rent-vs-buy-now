import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import citiesData from '@/data/cities-fallback.json';
import { City } from '@/lib/types';
import VerdictBadge from '@/components/VerdictBadge';
import RentVsBuyCalc from '@/components/RentVsBuyCalc';

interface CityPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const cities = citiesData as City[];
  return locales.flatMap(locale =>
    cities.map(city => ({ locale, slug: city.slug }))
  );
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = (citiesData as City[]).find(c => c.slug === slug);
  if (!city) return {};

  return {
    title: `Rent vs Buy in ${city.name}, ${city.state} — Is It Worth It in 2025? | RentVsBuyNow`,
    description: `Rent vs buy analysis for ${city.name}, ${city.state}. Median rent: $${city.medianRent.toLocaleString()}/mo, median home: $${(city.medianHomePrice / 1000).toFixed(0)}K, breakeven in ${city.breakevenYears} years. Use our free calculator.`,
    openGraph: {
      title: `${city.name}, ${city.state}: Rent or Buy in 2025?`,
      description: `Price-to-rent ratio: ${city.priceToRentRatio}x. Breakeven: ${city.breakevenYears} years. Verdict: ${city.verdict}.`,
      type: 'website',
    }
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('city');
  const cities = citiesData as City[];
  const city = cities.find(c => c.slug === slug);

  if (!city) notFound();

  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Related cities: same state or similar price range
  const relatedCities = cities
    .filter(c => c.slug !== city.slug && (c.state === city.state || Math.abs(c.medianHomePrice - city.medianHomePrice) < 100000))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        name: `${city.name}, ${city.state}`,
        description: `Rent vs buy analysis for ${city.name}, ${city.state} — 2025`,
      },
      {
        '@type': 'Dataset',
        name: `${city.name} Rent vs Buy Data 2025`,
        description: `Median rent, home price, price-to-rent ratio, and breakeven years for ${city.name}, ${city.state}`,
        variableMeasured: [
          { '@type': 'PropertyValue', name: 'Median Rent', value: city.medianRent },
          { '@type': 'PropertyValue', name: 'Median Home Price', value: city.medianHomePrice },
          { '@type': 'PropertyValue', name: 'Price-to-Rent Ratio', value: city.priceToRentRatio },
          { '@type': 'PropertyValue', name: 'Breakeven Years', value: city.breakevenYears },
        ]
      }
    ]
  };

  const verdictColor = city.verdict === 'buy' ? 'text-green-700' : city.verdict === 'rent' ? 'text-red-700' : 'text-yellow-700';
  const verdictBg = city.verdict === 'buy' ? 'bg-green-50' : city.verdict === 'rent' ? 'bg-red-50' : 'bg-yellow-50';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-orange-200 mb-4">
            <Link href={`${prefix}/`} className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`${prefix}/cities`} className="hover:text-white">Cities</Link>
            <span className="mx-2">/</span>
            <span>{city.name}, {city.state}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t('rentVsBuyIn')} {city.name}, {city.state} ({t('year2025')})
          </h1>
          <p className="text-orange-100">
            {t('ratioExplain')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('medianRent')}</div>
            <div className="text-xl font-bold text-stone-800">${city.medianRent.toLocaleString()}</div>
            <div className="text-xs text-stone-400">/month</div>
          </div>
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('medianHomePrice')}</div>
            <div className="text-xl font-bold text-stone-800">${(city.medianHomePrice / 1000).toFixed(0)}K</div>
          </div>
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('priceToRentRatio')}</div>
            <div className="text-xl font-bold text-stone-800">{city.priceToRentRatio}x</div>
          </div>
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('breakevenYears')}</div>
            <div className="text-xl font-bold text-stone-800">{city.breakevenYears} yrs</div>
          </div>
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('mortgageRate')}</div>
            <div className="text-xl font-bold text-stone-800">{city.mortgageRate}%</div>
          </div>
          <div className="bg-white border border-orange-100 rounded-xl p-4 text-center">
            <div className="text-xs text-stone-500 mb-1">{t('propertyTax')}</div>
            <div className="text-xl font-bold text-stone-800">{city.propertyTax}%</div>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className={`${verdictBg} border rounded-2xl p-6`}>
          <div className="flex items-center gap-4">
            <VerdictBadge verdict={city.verdict} size="lg" />
            <div>
              <h2 className={`text-xl font-bold ${verdictColor}`}>
                {city.verdict === 'buy'
                  ? `Buying in ${city.name} makes financial sense`
                  : city.verdict === 'rent'
                  ? `Renting in ${city.name} is likely smarter`
                  : `It's a toss-up in ${city.name}`}
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                {city.verdict === 'buy'
                  ? `With a price-to-rent ratio of ${city.priceToRentRatio}x and breakeven at ${city.breakevenYears} years, buyers who stay 5+ years typically come out ahead.`
                  : city.verdict === 'rent'
                  ? `A price-to-rent ratio of ${city.priceToRentRatio}x means buying requires ${city.breakevenYears}+ years to break even. Renters who invest the difference often build more wealth.`
                  : `At ${city.priceToRentRatio}x price-to-rent ratio, the decision depends heavily on your timeline, down payment, and personal situation.`}
              </p>
            </div>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div id="adsterra-native" data-ad="native-banner" className="my-4 h-16 bg-stone-100 rounded-lg flex items-center justify-center text-sm text-stone-400 border border-stone-200">
          Ad
        </div>

        {/* Calculator */}
        <RentVsBuyCalc
          cityName={`${city.name}, ${city.state}`}
          initialInputs={{
            homePrice: city.medianHomePrice,
            monthlyRent: city.medianRent,
            mortgageRate: city.mortgageRate,
            propertyTaxRate: city.propertyTax,
          }}
        />

        {/* Related Cities */}
        {relatedCities.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">{t('relatedCities')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCities.map(rc => (
                <Link
                  key={rc.slug}
                  href={`${prefix}/cities/${rc.slug}`}
                  className="bg-white border border-orange-100 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition-all flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-stone-800">{rc.name}, {rc.state}</div>
                    <div className="text-sm text-stone-500">Breakeven: {rc.breakevenYears} yrs | P/R: {rc.priceToRentRatio}x</div>
                  </div>
                  <VerdictBadge verdict={rc.verdict} size="sm" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div>
          <Link href={`${prefix}/cities`} className="text-orange-600 hover:underline text-sm">
            ← Back to all cities
          </Link>
        </div>
      </div>
    </>
  );
}
