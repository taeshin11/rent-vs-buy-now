import { Metadata } from 'next';
import Link from 'next/link';

interface GuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Rent vs Buy Decision Guide 2025 — Complete Guide | RentVsBuyNow',
    description: 'Complete guide to the rent vs buy decision in 2025. Learn about price-to-rent ratio, breakeven analysis, and when buying or renting makes more sense.',
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Rent vs Buy Decision Guide 2025</h1>
          <p className="text-orange-100">Everything you need to know to make the right housing decision.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Understanding the Price-to-Rent Ratio</h2>
          <p className="text-stone-600 mb-4">
            The price-to-rent ratio is the most widely used metric to compare the relative cost of buying vs. renting in a given market. It is calculated by dividing the median home price by the annual median rent:
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-4 font-mono text-center">
            Price-to-Rent Ratio = Median Home Price ÷ (Monthly Rent × 12)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-700 mb-1">Under 15</div>
              <div className="font-semibold text-green-800 mb-2">Buy Zone</div>
              <p className="text-sm text-stone-600">Strong case for buying. The home price is low relative to rents, so your mortgage may cost less than rent.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-700 mb-1">15–20</div>
              <div className="font-semibold text-yellow-800 mb-2">Neutral Zone</div>
              <p className="text-sm text-stone-600">Depends on personal factors: how long you plan to stay, your down payment, and local appreciation trends.</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-700 mb-1">Over 20</div>
              <div className="font-semibold text-red-800 mb-2">Rent Zone</div>
              <p className="text-sm text-stone-600">Renting and investing the difference typically builds more wealth over time in expensive markets.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">When Does Buying Make Financial Sense?</h2>
          <div className="space-y-3 text-stone-600">
            <p>Buying is generally more advantageous when:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>You plan to stay 5+ years.</strong> Closing costs (3–6% of home price) need time to amortize.</li>
              <li><strong>The price-to-rent ratio is below 15.</strong> Memphis, Detroit, and Cleveland are examples where buying often wins.</li>
              <li><strong>You have a 20% down payment.</strong> Avoids PMI and results in lower monthly payments.</li>
              <li><strong>Home appreciation is expected to outpace investment returns.</strong> Strong local job markets and limited housing supply support this.</li>
              <li><strong>Mortgage rates are relatively low.</strong> Higher rates significantly increase monthly ownership costs.</li>
              <li><strong>You value stability and customization.</strong> Non-financial factors also matter.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">When Does Renting Make Financial Sense?</h2>
          <div className="space-y-3 text-stone-600">
            <p>Renting is generally more advantageous when:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>The price-to-rent ratio exceeds 20.</strong> San Francisco (28x), NYC (25x), and LA (27x) are prime examples.</li>
              <li><strong>You plan to move within 3–5 years.</strong> Transaction costs make short-term buying expensive.</li>
              <li><strong>You can invest the difference.</strong> Investing down payment + monthly savings in diversified index funds (7% avg return) often beats home appreciation (3–4% avg).</li>
              <li><strong>Your job or life situation is uncertain.</strong> Renting preserves flexibility.</li>
              <li><strong>Local rent is dramatically below mortgage costs.</strong> The monthly payment gap reduces the appeal of buying.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">How to Calculate Breakeven Years</h2>
          <p className="text-stone-600 mb-4">
            The breakeven year is when cumulative ownership costs (mortgage, taxes, insurance, maintenance, closing costs) equal cumulative rent costs. After this year, buying starts generating more wealth.
          </p>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 font-mono text-sm mb-4">
            <p className="text-stone-500 mb-2">{'// Simplified breakeven formula'}</p>
            <p>monthly_cost = mortgage + property_tax/12 + insurance/12</p>
            <p>monthly_diff = monthly_cost - rent</p>
            <p>breakeven_years = closing_costs / (monthly_diff × 12)</p>
          </div>
          <p className="text-stone-600 text-sm">
            Note: This simplified formula doesn&apos;t account for rent increases, home appreciation, or opportunity cost. Our full calculator includes all these factors.
          </p>
          <div className="mt-6">
            <Link
              href={`${prefix}/calculator`}
              className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors inline-block"
            >
              Try the Full Calculator →
            </Link>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">The Opportunity Cost of a Down Payment</h2>
          <p className="text-stone-600 mb-4">
            One often-overlooked factor is the opportunity cost of your down payment. If you put $100,000 down on a house, that money could instead be invested in a diversified stock portfolio averaging ~7% annual returns.
          </p>
          <div className="bg-orange-50 rounded-xl p-5 text-sm text-stone-600">
            <p className="font-semibold text-stone-800 mb-2">Example: $100K down payment over 10 years</p>
            <p>• Invested at 7%/yr: <strong className="text-orange-700">$196,715</strong></p>
            <p>• Home appreciation at 3.5%/yr: <strong className="text-orange-700">$141,060</strong> (on the portion of equity attributable to down payment)</p>
            <p className="mt-2 text-xs text-stone-400">This is why buying in expensive markets (high P/R ratio) often underperforms renting+investing.</p>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">2025 Market Context</h2>
          <div className="prose prose-stone text-stone-600 space-y-3">
            <p>
              In 2025, mortgage rates remain elevated at around 6.5–7%, making monthly payments significantly higher than pre-pandemic levels. Meanwhile, home prices have held firm or declined slightly in some markets, improving affordability in secondary cities.
            </p>
            <p>
              <strong>Best markets to buy in 2025:</strong> Memphis, Birmingham, Detroit, Pittsburgh, and Cleveland — all with price-to-rent ratios under 15 and breakeven periods under 7 years.
            </p>
            <p>
              <strong>Markets where renting wins:</strong> San Francisco, Los Angeles, NYC, Boston, and Seattle — all with price-to-rent ratios above 22 and long breakeven periods.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
