import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import citiesData from '@/data/cities-fallback.json';
import CityTable from '@/components/CityTable';
import { City } from '@/lib/types';

interface CitiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All Cities — Rent vs Buy Rankings 2025 | RentVsBuyNow',
    description: '50 major US cities ranked by rent vs buy verdict. Find the best cities to buy or rent in 2025 based on price-to-rent ratio and breakeven years.',
    openGraph: {
      title: 'US Cities Rent vs Buy Rankings 2025',
      description: '50 cities ranked by price-to-rent ratio and breakeven years.',
    }
  };
}

export default async function CitiesPage({ params }: CitiesPageProps) {
  const { locale } = await params;
  const t = await getTranslations('cities');
  const cities = citiesData as City[];

  const buyCities = cities.filter(c => c.verdict === 'buy');
  const rentCities = cities.filter(c => c.verdict === 'rent');
  const neutralCities = cities.filter(c => c.verdict === 'neutral');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'US Cities Rent vs Buy Rankings 2025',
    description: '50 major US cities ranked by price-to-rent ratio',
    numberOfItems: cities.length,
    itemListElement: cities.slice(0, 10).map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${city.name}, ${city.state}`,
      url: `https://rent-vs-buy-now.vercel.app/cities/${city.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-orange-600 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('title')}</h1>
          <p className="text-orange-100">{t('subtitle')}</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white border-b border-orange-100 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-700">{buyCities.length}</div>
            <div className="text-sm text-stone-500">Best to Buy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-700">{neutralCities.length}</div>
            <div className="text-sm text-stone-500">Neutral</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">{rentCities.length}</div>
            <div className="text-sm text-stone-500">Best to Rent</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <CityTable cities={cities} locale={locale} showFilter={true} />
      </div>
    </>
  );
}
