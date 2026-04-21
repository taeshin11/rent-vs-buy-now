import { Metadata } from 'next';
import Link from 'next/link';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === 'en' ? '/about' : `/${locale}/about`;
  return {
    title: 'About RentVsBuyNow — Free Rent vs Buy Calculator & Market Analysis',
    description: 'RentVsBuyNow is a free rent vs buy calculator and housing market analysis tool. We use current mortgage rates, median home prices, and opportunity cost calculations to help you make informed housing decisions.',
    alternates: {
      canonical: `https://rent-vs-buy-now.vercel.app${path}`,
    },
    openGraph: {
      title: 'About RentVsBuyNow — Free Rent vs Buy Calculator',
      description: 'Free rent vs buy calculator using real mortgage rates, median home prices, and opportunity cost analysis.',
      url: `https://rent-vs-buy-now.vercel.app${path}`,
      siteName: 'RentVsBuyNow',
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About RentVsBuyNow</h1>
          <p className="text-orange-100">The free rent vs buy calculator built on real data.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">What Is RentVsBuyNow?</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            RentVsBuyNow is a free, data-driven tool that helps you answer one of the biggest financial questions of your life: <strong>should you rent or buy a home?</strong> We combine current mortgage rates, median home prices, local rental costs, and opportunity cost calculations to give you an honest, numbers-based answer for your specific situation.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Unlike oversimplified advice you find elsewhere, we do not have a one-size-fits-all answer. Whether buying or renting wins depends on your city, your timeline, your down payment, and the broader market. Our goal is to give you the tools and data to figure it out yourself.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">What We Analyze</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Market Data</h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>Current 30-year fixed mortgage rates (updated for 2025)</li>
                <li>Median home prices for 50+ US cities</li>
                <li>Median rental costs by city and region</li>
                <li>Price-to-rent ratios updated regularly</li>
                <li>Historical home appreciation rates by market</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Calculator Inputs</h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>Home purchase price and down payment</li>
                <li>Mortgage rate and loan term</li>
                <li>Monthly rent comparison</li>
                <li>Annual home appreciation assumption</li>
                <li>Opportunity cost of down payment invested</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">The Costs We Account For</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            A complete rent vs buy comparison goes well beyond the mortgage payment vs monthly rent. Here is what we include in our analysis:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Buying Costs</h3>
              <ul className="space-y-1 text-stone-600 text-sm list-disc list-inside">
                <li>Mortgage principal and interest</li>
                <li>Property taxes (typically 1–1.5% annually)</li>
                <li>Homeowners insurance</li>
                <li>Maintenance and repairs (1–2% of value per year)</li>
                <li>Private mortgage insurance (PMI) if down payment is under 20%</li>
                <li>Closing costs (2–5% of purchase price)</li>
                <li>Opportunity cost of the down payment</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Renting Costs</h3>
              <ul className="space-y-1 text-stone-600 text-sm list-disc list-inside">
                <li>Monthly rent payments</li>
                <li>Annual rent increases (historically 3–5%)</li>
                <li>Renters insurance</li>
                <li>Opportunity gain from investing the down payment equivalent</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Opportunity Cost: The Hidden Factor</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            One of the most overlooked factors in the rent vs buy debate is <strong>opportunity cost</strong>. When you put a $100,000 down payment on a home, that money is no longer available to invest in the stock market, which has historically returned around 7% per year after inflation.
          </p>
          <p className="text-stone-600 leading-relaxed mb-4">
            Our calculator factors in this opportunity cost explicitly, showing you how a renter who invests the equivalent of a down payment could accumulate wealth over time, and comparing that to the equity a homeowner builds through mortgage payments and appreciation.
          </p>
          <p className="text-stone-600 leading-relaxed">
            This is why in high price-to-rent markets like San Francisco or New York, renting and investing the difference often builds more long-term wealth than buying, even when accounting for home appreciation.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Why We Built This</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            The housing market is one of the most consequential financial decisions most people will ever make. Yet most advice online is oversimplified (&ldquo;buying always builds wealth&rdquo;) or driven by industry incentives (real estate agents and mortgage brokers benefit when you buy).
          </p>
          <p className="text-stone-600 leading-relaxed mb-4">
            We built RentVsBuyNow to provide an honest, data-driven alternative. Our calculator has no hidden agenda. Sometimes buying wins. Sometimes renting wins. We show you the numbers and let you decide.
          </p>
          <p className="text-stone-600 leading-relaxed">
            For personalized advice tailored to your complete financial picture, we always recommend consulting with a licensed real estate agent and a certified financial planner. Our tools are a starting point, not a substitute for professional guidance.
          </p>
        </section>

        <section className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-stone-800 mb-4">Start Analyzing Your Situation</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${prefix}/calculator`}
              className="bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors text-center"
            >
              Use the Calculator
            </Link>
            <Link
              href={`${prefix}/cities`}
              className="border border-orange-200 text-orange-700 font-semibold px-6 py-3 rounded-xl hover:bg-orange-100 transition-colors text-center"
            >
              Browse City Rankings
            </Link>
            <Link
              href={`${prefix}/how-to-use`}
              className="border border-orange-200 text-orange-700 font-semibold px-6 py-3 rounded-xl hover:bg-orange-100 transition-colors text-center"
            >
              How to Use This Tool
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
