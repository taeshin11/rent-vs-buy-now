import { Metadata } from 'next';
import Link from 'next/link';

interface HowToUsePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HowToUsePageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === 'en' ? '/how-to-use' : `/${locale}/how-to-use`;
  return {
    title: 'How to Use the Rent vs Buy Calculator — FAQ | RentVsBuyNow',
    description: 'Learn how to use the RentVsBuyNow rent vs buy calculator. Answers to frequently asked questions: price-to-rent ratio, opportunity cost, breakeven analysis, and more.',
    alternates: {
      canonical: `https://rent-vs-buy-now.vercel.app${path}`,
    },
    openGraph: {
      title: 'How to Use the Rent vs Buy Calculator | RentVsBuyNow',
      description: 'Step-by-step guide and FAQ for the RentVsBuyNow rent vs buy calculator.',
      url: `https://rent-vs-buy-now.vercel.app${path}`,
      siteName: 'RentVsBuyNow',
      type: 'website',
    },
  };
}

const faqs = [
  {
    q: 'How does the rent vs buy calculator work?',
    a: 'The calculator compares the total cost of renting versus buying over a chosen time horizon. For buying, it adds up mortgage interest, property taxes, insurance, maintenance, PMI (if applicable), and closing costs, then subtracts equity built through principal payments and home appreciation. For renting, it tracks cumulative rent paid and adds the investment growth of the down payment equivalent. The result shows you which option leaves you with more net worth at the end of your chosen period.',
  },
  {
    q: 'What is the price-to-rent ratio?',
    a: 'The price-to-rent ratio is the median home price divided by annual median rent (monthly rent multiplied by 12). It is the fastest way to assess a housing market. A ratio under 15 generally favors buying. A ratio between 15 and 20 is neutral and depends on your personal situation. A ratio above 20 generally favors renting and investing the difference. For example, if a home costs $400,000 and rents for $2,000/month ($24,000/year), the price-to-rent ratio is 16.7 — in the neutral zone.',
  },
  {
    q: 'Is it better to rent or buy in 2025?',
    a: 'It depends heavily on your city, your timeline, and your financial situation. With mortgage rates around 6.5–7% in 2025, buying has become more expensive relative to renting in many markets. In cities with price-to-rent ratios above 20 (San Francisco, New York, Los Angeles, Seattle), renting and investing the difference is often the stronger financial choice. In affordable markets with ratios below 15 (Memphis, Pittsburgh, Detroit, Birmingham), buying still makes strong financial sense. Use our city rankings and calculator to find your answer.',
  },
  {
    q: 'What costs are included in buying a home?',
    a: 'A true cost comparison must include: (1) mortgage principal and interest, (2) property taxes (typically 1–1.5% of home value per year), (3) homeowners insurance (0.5–1% per year), (4) maintenance and repairs (budget 1–2% of home value per year), (5) private mortgage insurance or PMI if your down payment is under 20%, (6) closing costs of 2–5% of the purchase price paid upfront, and (7) the opportunity cost of your down payment — the investment returns you forgo by tying that money up in home equity.',
  },
  {
    q: 'What is opportunity cost in buying a home?',
    a: 'Opportunity cost is the return you give up by choosing one use of money over another. When you put $80,000 into a down payment, that money is no longer available to invest in stocks or other assets. Historically, a diversified stock portfolio earns around 7% per year after inflation. Over 20 years, $80,000 invested would grow to roughly $310,000. This foregone return is the opportunity cost of buying, and it is factored into our calculator to give you a complete picture. In expensive markets, this opportunity cost can make renting surprisingly competitive.',
  },
  {
    q: 'How long do I need to stay to make buying worthwhile?',
    a: 'The breakeven period is how many years you must stay in a home before the total cost of buying equals the total cost of renting. Closing costs alone (2–5% of purchase price) typically take 4–7 years to recoup through equity gains. Nationally, the average breakeven period is about 10 years. In expensive coastal cities, it can be 15–20 years. In affordable midwestern cities, it can be as short as 5–6 years. As a general rule: if you plan to move within 4 years, renting is almost always the better financial choice.',
  },
  {
    q: 'Does buying always build equity?',
    a: 'No. Home equity grows in two ways: through mortgage principal payments (the portion of your payment that reduces the loan balance) and through home price appreciation. In the early years of a mortgage, the vast majority of your payment goes to interest, not principal. If home prices stay flat or fall — as they did in many markets between 2007 and 2012 — you may have little or negative equity even after several years. Additionally, high transaction costs (closing costs, real estate commissions of 5–6%) mean you often need significant appreciation just to break even when you sell.',
  },
  {
    q: 'What is a starter home?',
    a: 'A starter home is typically a smaller, more affordable first property — often a one- or two-bedroom house or condo — purchased by first-time buyers who plan to upgrade to a larger home in 5–10 years. Starter homes are usually priced at the lower end of a local market. The strategy works best in markets with strong appreciation and when you plan to hold long enough to recoup transaction costs. With home prices elevated in 2025, the traditional "starter home" concept has become harder to execute in many cities, as entry-level prices often exceed what first-time buyers can comfortably afford.',
  },
  {
    q: 'Should I buy if mortgage rates are high?',
    a: 'High mortgage rates increase your monthly payment and total interest paid, making buying more expensive. However, high rates often slow home price appreciation and can give buyers more negotiating power. The key question is not the rate itself, but whether the total cost of ownership (including taxes, insurance, and maintenance) makes financial sense relative to renting in your specific market. If you buy when rates are high, you can always refinance if rates fall significantly. You can also negotiate a seller rate buydown. What you cannot easily change is the purchase price — so in a high-rate environment, focus on buying in a market where prices still make sense at current rates.',
  },
  {
    q: 'How does inflation affect the rent vs buy decision?',
    a: 'Inflation affects renters and buyers differently. Homeowners with a fixed-rate mortgage benefit because their largest housing cost (the mortgage payment) stays constant in nominal terms while inflation erodes its real value over time. They also benefit if home prices rise with inflation. Renters face rent increases that typically track or exceed general inflation. However, high inflation usually brings high mortgage rates, which increases the cost of new home purchases. The net effect: existing homeowners with fixed mortgages tend to benefit from inflation, while new buyers and renters both face headwinds. Our calculator lets you model different inflation and rent-growth scenarios.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default async function HowToUsePage({ params }: HowToUsePageProps) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">How to Use the Rent vs Buy Calculator</h1>
          <p className="text-orange-100">A step-by-step guide plus answers to the most common questions.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Quick Start */}
        <section className="card">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Quick Start Guide</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</span>
              <div>
                <p className="font-semibold text-stone-800">Enter the home purchase price</p>
                <p className="text-stone-500 text-sm mt-1">Use the current listing price or the median home price for your city (find it in our city rankings).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</span>
              <div>
                <p className="font-semibold text-stone-800">Enter your down payment</p>
                <p className="text-stone-500 text-sm mt-1">20% avoids PMI. Lower down payments increase monthly costs but require less cash upfront.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</span>
              <div>
                <p className="font-semibold text-stone-800">Enter the current mortgage rate</p>
                <p className="text-stone-500 text-sm mt-1">As of 2025, 30-year fixed rates are roughly 6.5–7.0%. Check with your lender for a precise quote.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</span>
              <div>
                <p className="font-semibold text-stone-800">Enter your monthly rent (or the equivalent rent for this home)</p>
                <p className="text-stone-500 text-sm mt-1">This is what you currently pay or would pay to rent a comparable home in the same area.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">5</span>
              <div>
                <p className="font-semibold text-stone-800">Set your time horizon</p>
                <p className="text-stone-500 text-sm mt-1">How many years do you plan to stay? This is the most important variable. Longer = stronger case for buying.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">6</span>
              <div>
                <p className="font-semibold text-stone-800">Review your results</p>
                <p className="text-stone-500 text-sm mt-1">The calculator shows total cost of each path, net worth difference, and the breakeven year when buying starts to win.</p>
              </div>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href={`${prefix}/calculator`}
              className="bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors inline-block"
            >
              Open the Calculator
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-stone-800 mb-3 text-lg">{faq.q}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-2">Important Disclaimer</h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            The RentVsBuyNow calculator provides estimates based on general financial models and assumptions. Results are for educational and informational purposes only and do not constitute financial, real estate, or tax advice. Your actual costs will vary based on your specific property, location, lender, tax situation, and market conditions. Always consult a licensed real estate agent and a certified financial planner before making a housing decision.
          </p>
        </section>

      </div>
    </>
  );
}
