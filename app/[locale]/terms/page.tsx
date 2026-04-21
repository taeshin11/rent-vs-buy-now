import { Metadata } from 'next';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === 'en' ? '/terms' : `/${locale}/terms`;
  return {
    title: 'Terms of Use | RentVsBuyNow',
    description: 'Terms of use for RentVsBuyNow. Calculator results are estimates based on assumptions and are not financial or real estate advice. Consult a licensed professional for personalized guidance.',
    alternates: {
      canonical: `https://rent-vs-buy-now.vercel.app${path}`,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  await params;
  const lastUpdated = 'April 13, 2025';

  return (
    <>
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Use</h1>
          <p className="text-orange-100">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Important disclaimer — first and prominent */}
        <section className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-orange-800 mb-3">Important Disclaimer</h2>
          <p className="text-stone-700 leading-relaxed font-medium">
            The rent vs buy calculator and all related tools, data, and content on RentVsBuyNow are provided for <strong>informational and educational purposes only</strong>. Calculator results are estimates based on simplified financial models and assumptions. They do not constitute financial advice, real estate advice, tax advice, or investment advice of any kind.
          </p>
          <p className="text-stone-700 leading-relaxed mt-3 font-medium">
            Before making any housing decision, you should consult with a <strong>licensed real estate agent</strong> and a <strong>certified financial planner or financial advisor</strong> who can review your complete financial situation and provide personalized guidance.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">1. Acceptance of Terms</h2>
          <p className="text-stone-600 leading-relaxed">
            By accessing or using the RentVsBuyNow website at rent-vs-buy-now.vercel.app (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site. We reserve the right to update these terms at any time, and your continued use of the Site following any changes constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">2. Nature of the Service</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            RentVsBuyNow provides a rent vs buy calculator, city market data, price-to-rent ratios, breakeven analysis, and related educational content. The Site is designed to help users understand the general financial trade-offs between renting and buying a home.
          </p>
          <p className="text-stone-600 leading-relaxed">
            We are not a real estate brokerage, mortgage lender, financial advisory firm, or licensed financial services provider. Nothing on this Site should be construed as a recommendation, solicitation, or offer to buy, sell, or hold any real estate or financial instrument.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">3. Calculator Results Are Estimates Only</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            The calculator and analytical tools on this Site produce estimates based on inputs you provide and general financial assumptions. These estimates:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm">
            <li>Are based on simplified models that may not reflect your specific situation</li>
            <li>Do not account for your individual tax situation, filing status, or deductions</li>
            <li>Use general assumptions for maintenance costs, insurance, property taxes, and appreciation that may differ significantly from actual costs in your area</li>
            <li>Do not account for HOA fees, special assessments, or neighborhood-specific factors</li>
            <li>Assume constant returns and rates over the projection period, which will not reflect actual market volatility</li>
            <li>Do not consider your personal financial goals, risk tolerance, employment stability, or life circumstances</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            Actual financial outcomes will differ from calculator estimates. Past performance of home prices or investment returns does not guarantee future results.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">4. Accuracy of Market Data</h2>
          <p className="text-stone-600 leading-relaxed">
            The city data, price-to-rent ratios, median home prices, and rental cost figures on this Site are sourced from publicly available data and are updated periodically. We make reasonable efforts to ensure the accuracy of this data, but we do not guarantee that all information is current, complete, or accurate at all times. Real estate markets change rapidly; always verify current market conditions with local sources, real estate professionals, and lenders before making decisions.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">5. No Financial or Real Estate Advice</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            The content on this Site — including articles, guides, FAQ answers, calculator results, city rankings, and any other material — is for general informational purposes only. It is not a substitute for professional advice from:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>A licensed real estate agent or broker familiar with your local market</li>
            <li>A certified financial planner (CFP) or financial advisor</li>
            <li>A licensed mortgage professional or loan officer</li>
            <li>A certified public accountant (CPA) or tax professional</li>
            <li>A real estate attorney (for complex transactions)</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            We strongly encourage you to seek professional advice tailored to your specific circumstances before making any housing decision.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">6. Limitation of Liability</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            To the fullest extent permitted by applicable law, RentVsBuyNow and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>Your use of or inability to use the Site</li>
            <li>Reliance on any information, data, or calculator results provided by the Site</li>
            <li>Any housing, real estate, or financial decision made based on information from the Site</li>
            <li>Errors or inaccuracies in the data or calculator models</li>
            <li>Any interruption or cessation of the Site&apos;s services</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            Your use of the Site is entirely at your own risk. The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">7. Intellectual Property</h2>
          <p className="text-stone-600 leading-relaxed">
            All content on this Site — including text, graphics, data visualizations, calculator logic, and code — is the property of RentVsBuyNow and is protected by applicable intellectual property laws. You may use the Site for personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works from any content on the Site without our express written permission.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">8. Third-Party Links and Advertising</h2>
          <p className="text-stone-600 leading-relaxed">
            The Site may contain links to third-party websites and may display advertisements provided by Google AdSense or other advertising networks. We do not control the content of third-party sites and are not responsible for their accuracy, legality, or practices. The presence of an advertisement or link does not constitute an endorsement by RentVsBuyNow. Clicking on third-party links is at your own risk.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">9. Governing Law</h2>
          <p className="text-stone-600 leading-relaxed">
            These Terms of Use are governed by and construed in accordance with the laws of the United States. Any disputes arising from your use of this Site shall be resolved through good-faith negotiation or, if necessary, binding arbitration.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">10. Changes to These Terms</h2>
          <p className="text-stone-600 leading-relaxed">
            We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Site. The &ldquo;Last updated&rdquo; date at the top of this page reflects the date of the most recent revision. By continuing to use the Site after changes are posted, you agree to the revised terms.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">11. Contact</h2>
          <p className="text-stone-600 leading-relaxed">
            If you have questions about these Terms of Use, please contact us through the Site. We will make reasonable efforts to respond to your inquiry in a timely manner.
          </p>
        </section>

      </div>
    </>
  );
}
