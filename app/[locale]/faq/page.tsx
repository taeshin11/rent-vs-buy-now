'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'What is the price-to-rent ratio and how do I use it?',
    a: 'The price-to-rent ratio is the median home price divided by annual rent (monthly rent × 12). Under 15 = generally better to buy. 15–20 = neutral, depends on your situation. Over 20 = generally better to rent and invest the difference.'
  },
  {
    q: 'How many years does it take to break even on a home purchase?',
    a: 'Nationally, the average breakeven period is about 10 years. It ranges from 5–6 years in affordable cities like Memphis and Pittsburgh, to 15–18 years in expensive markets like San Francisco and New York.'
  },
  {
    q: 'Is buying always better than renting long-term?',
    a: 'Not necessarily. In high price-to-rent markets (above 20x), renting and investing the difference in a diversified portfolio can build more wealth than buying, even over 20–30 years. This is because the opportunity cost of a large down payment, combined with high carrying costs, can outweigh home appreciation.'
  },
  {
    q: 'What is the 5% rule for renting vs buying?',
    a: 'The 5% rule states: multiply the home price by 5%, divide by 12 to get a monthly "cost of ownership." If this number is higher than your monthly rent, renting may be better. Example: $600K home × 5% = $30,000/yr ÷ 12 = $2,500/mo. If rent is under $2,500, renting likely wins.'
  },
  {
    q: 'Should I buy a house if I plan to move in 3 years?',
    a: 'Generally no. Closing costs alone (2–5% of the purchase price) typically require 4–7 years to recoup. Unless you plan to rent the property out, buying for less than 4 years is usually not financially advantageous.'
  },
  {
    q: 'What mortgage rate should I use in my calculations?',
    a: 'As of 2025, 30-year fixed mortgage rates are around 6.5–7.0%. Use current rates from your lender for the most accurate analysis. Even a 0.5% difference in rate can significantly change your breakeven timeline.'
  },
  {
    q: 'Does the rent vs buy decision change with inflation?',
    a: 'Yes. Higher inflation typically benefits homeowners through home price appreciation and fixed mortgage payments becoming cheaper in real terms. Renters face rising rents. However, high inflation often comes with high mortgage rates, which increases the cost of buying.'
  },
  {
    q: 'What about the tax benefits of homeownership?',
    a: 'The mortgage interest deduction and property tax deduction can reduce ownership costs, but only if you itemize deductions. Since the 2017 tax law doubled the standard deduction, fewer than 15% of homeowners now itemize. For most buyers, the tax benefit is minimal.'
  },
  {
    q: 'How does down payment size affect the buy vs rent decision?',
    a: 'A larger down payment reduces monthly payments and eliminates PMI (required below 20% down), but also increases your opportunity cost. A 20% down payment on a $500K home ties up $100K that could earn 7%/yr invested. This is factored into our net worth calculation.'
  },
  {
    q: 'Which cities are best to buy in 2025?',
    a: 'Based on price-to-rent ratios under 15 and short breakeven periods: Memphis, TN (14x, 6 yrs); Birmingham, AL (14x, 6 yrs); Detroit, MI (13x, 5 yrs); Pittsburgh, PA (14x, 6 yrs); Cleveland, OH (13x, 5 yrs). These cities offer the strongest case for buying.'
  },
  {
    q: 'Which cities are best to rent in 2025?',
    a: 'Cities with price-to-rent ratios above 22 where renting typically wins: San Francisco (28x); Los Angeles (27x); New York City (25x); Boston (22x); Seattle (24x). In these markets, renting and investing the difference often builds more wealth.'
  },
  {
    q: 'How accurate is the calculator?',
    a: 'The calculator uses well-established financial models but is simplified for educational purposes. It does not account for local HOA fees, neighborhood-specific appreciation, your specific tax situation, or behavioral factors. Use it as a starting point, then consult a financial advisor and real estate agent for your specific situation.'
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-orange-100 rounded-xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-orange-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-stone-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 py-4 bg-white border-t border-orange-50 text-stone-600 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-orange-100">Common questions about renting vs buying a home in 2025.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </>
  );
}
