'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [visitors, setVisitors] = useState<{ total: number; today: number } | null>(null);

  useEffect(() => {
    fetch('/api/visitors', { method: 'POST' })
      .then(r => r.json())
      .then(data => setVisitors(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-white border-t border-orange-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-orange-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              RentVsBuyNow
            </Link>
            <p className="text-sm text-stone-500">
              The definitive free tool to answer &ldquo;Should I rent or buy in [City]?&rdquo; — with real data and interactive calculators.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-stone-700 mb-3">Tools</h3>
            <ul className="space-y-1 text-sm text-stone-500">
              <li><Link href="/calculator" className="hover:text-orange-600">Rent vs Buy Calculator</Link></li>
              <li><Link href="/cities" className="hover:text-orange-600">City Rankings</Link></li>
              <li><Link href="/states" className="hover:text-orange-600">State Overview</Link></li>
              <li><Link href="/guide" className="hover:text-orange-600">Decision Guide</Link></li>
              <li><Link href="/faq" className="hover:text-orange-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold text-stone-700 mb-3">Quick Stats</h3>
            <ul className="space-y-1 text-sm text-stone-500">
              <li>50+ cities analyzed</li>
              <li>Updated for 2025</li>
              <li>Based on real market data</li>
            </ul>
            {visitors && (
              <div className="mt-3 text-xs text-stone-400">
                <span>Visitors today: {visitors.today.toLocaleString()}</span>
                <span className="mx-2">|</span>
                <span>Total: {visitors.total.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 text-center sm:text-left">
            Data is for informational purposes only. Consult a financial advisor before making housing decisions.
          </p>
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} RentVsBuyNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
