import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import citiesData from '@/data/cities-fallback.json';
import factorsData from '@/data/factors-fallback.json';
import CityCard from '@/components/CityCard';
import CityTable from '@/components/CityTable';
import { City } from '@/lib/types';

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://rent-vs-buy-now.vercel.app${locale === 'en' ? '/' : `/${locale}/`}`;
  return {
    title: 'Rent vs Buy Calculator 2025 — Should You Buy a Home? | RentVsBuyNow',
    description: 'Use our free rent vs buy calculator to decide if buying a home makes financial sense. Compare total costs, build equity timeline, and break-even analysis.',
    keywords: ['rent vs buy', 'should I buy a home', 'rent or buy calculator', 'price to rent ratio', 'buy vs rent 2025', 'home buying calculator', 'real estate calculator'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://rent-vs-buy-now.vercel.app/',
        'ko': 'https://rent-vs-buy-now.vercel.app/ko/',
        'ja': 'https://rent-vs-buy-now.vercel.app/ja/',
        'zh': 'https://rent-vs-buy-now.vercel.app/zh/',
        'es': 'https://rent-vs-buy-now.vercel.app/es/',
        'fr': 'https://rent-vs-buy-now.vercel.app/fr/',
        'de': 'https://rent-vs-buy-now.vercel.app/de/',
        'pt': 'https://rent-vs-buy-now.vercel.app/pt/',
      }
    },
    openGraph: {
      title: 'Rent vs Buy Calculator 2025 — Should You Buy a Home? | RentVsBuyNow',
      description: 'Use our free rent vs buy calculator to decide if buying a home makes financial sense. Compare total costs, build equity timeline, and break-even analysis.',
      url: canonicalUrl,
      siteName: 'RentVsBuyNow',
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rent vs Buy Calculator 2025 — Should You Buy a Home?',
      description: 'Free rent vs buy calculator. Compare total costs, equity timeline, and break-even for 50+ US cities.',
      site: '@RentVsBuyNow',
    },
    other: {
      'google-adsense-account': 'ca-pub-7098271335538021',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const cities = citiesData as City[];

  const buyCities = cities.filter(c => c.verdict === 'buy').slice(0, 6);
  const rentCities = cities.filter(c => c.verdict === 'rent').slice(0, 6);
  const topCities = [...cities].sort((a, b) => a.priceToRentRatio - b.priceToRentRatio).slice(0, 10);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://rent-vs-buy-now.vercel.app/#website',
        url: 'https://rent-vs-buy-now.vercel.app',
        name: 'RentVsBuyNow',
        description: 'Rent vs Buy Breakeven Analysis by City',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://rent-vs-buy-now.vercel.app/cities?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the price-to-rent ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The price-to-rent ratio is the median home price divided by the annual median rent. Under 15 suggests buying is favorable; 15-20 is neutral; over 20 suggests renting is better.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many years does it take to break even on a home purchase?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Breakeven years vary by city. On average in the US, it takes about 10 years for cumulative ownership costs to equal cumulative rent costs.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${locale === 'en' ? '' : `/${locale}`}/calculator`}
              className="bg-white text-orange-700 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-lg"
            >
              {t('ctaButton')}
            </Link>
            <Link
              href={`${locale === 'en' ? '' : `/${locale}`}/cities`}
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-700 transition-colors text-lg"
            >
              Browse Cities
            </Link>
          </div>
        </div>
      </section>

      {/* National Stats */}
      <section className="py-10 px-4 bg-white border-b border-orange-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-stone-500 text-center mb-6">{t('nationalStats')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">${factorsData.nationalMedianRent.toLocaleString()}</div>
              <div className="text-sm text-stone-500 mt-1">{t('medianRent')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">${(factorsData.nationalMedianHomePrice / 1000).toFixed(0)}K</div>
              <div className="text-sm text-stone-500 mt-1">{t('medianHomePrice')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{factorsData.nationalBreakevenYears} yrs</div>
              <div className="text-sm text-stone-500 mt-1">{t('avgBreakeven')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{factorsData.nationalPriceToRentRatio}x</div>
              <div className="text-sm text-stone-500 mt-1">{t('priceToRentRatio')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Cities to Buy */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800">{t('bestCitiesToBuy')}</h2>
            <Link href={`${locale === 'en' ? '' : `/${locale}`}/cities`} className="text-orange-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {buyCities.map(city => (
              <CityCard key={city.slug} city={city} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Cities to Rent */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800">{t('bestCitiesToRent')}</h2>
            <Link href={`${locale === 'en' ? '' : `/${locale}`}/cities`} className="text-orange-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rentCities.map(city => (
              <CityCard key={city.slug} city={city} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Cities Table */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Most Affordable Cities to Buy in 2025</h2>
          <CityTable cities={topCities} locale={locale} />
        </div>
      </section>

      {/* CTA Calculator */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-orange-100 mb-8">{t('ctaDesc')}</p>
          <Link
            href={`${locale === 'en' ? '' : `/${locale}`}/calculator`}
            className="bg-white text-orange-700 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors inline-block"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-8 text-center">How the Price-to-Rent Ratio Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="text-3xl font-bold text-green-700 mb-2">&lt; 15</div>
              <div className="font-semibold text-green-800 mb-2">Buy Zone</div>
              <p className="text-sm text-stone-600">Buying is likely more financially advantageous than renting. Lower ratio = stronger case for buying.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
              <div className="text-3xl font-bold text-yellow-700 mb-2">15–20</div>
              <div className="font-semibold text-yellow-800 mb-2">Neutral Zone</div>
              <p className="text-sm text-stone-600">It depends on your personal situation — timeline, down payment, and local appreciation rates matter most.</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="text-3xl font-bold text-red-700 mb-2">&gt; 20</div>
              <div className="font-semibold text-red-800 mb-2">Rent Zone</div>
              <p className="text-sm text-stone-600">Renting and investing the difference is likely more financially advantageous in the long run.</p>
            </div>
          </div>
        </div>
      </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />
    </>
  );
}
