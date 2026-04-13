'use client';

import Link from 'next/link';
import { useState } from 'react';
import { City } from '@/lib/types';
import VerdictBadge from './VerdictBadge';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CityTableProps {
  cities: City[];
  locale: string;
  showFilter?: boolean;
}

type SortKey = 'name' | 'medianRent' | 'medianHomePrice' | 'priceToRentRatio' | 'breakevenYears';

export default function CityTable({ cities, locale, showFilter = false }: CityTableProps) {
  const [filter, setFilter] = useState<'all' | 'buy' | 'rent' | 'neutral'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('priceToRentRatio');
  const [sortAsc, setSortAsc] = useState(true);

  const prefix = locale === 'en' ? '' : `/${locale}`;

  const filtered = cities
    .filter(c => filter === 'all' || c.verdict === filter)
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="inline-flex flex-col ml-1">
      {sortKey === col ? (
        sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
      ) : (
        <ChevronUp className="w-3 h-3 opacity-30" />
      )}
    </span>
  );

  return (
    <div>
      {showFilter && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['all', 'buy', 'rent', 'neutral'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'
              }`}
            >
              {f === 'all' ? 'All Cities' : f === 'buy' ? 'Best to Buy' : f === 'rent' ? 'Best to Rent' : 'Neutral'}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-orange-100">
        <table className="w-full text-sm">
          <thead className="bg-orange-50">
            <tr>
              <th
                className="px-4 py-3 text-left font-semibold text-stone-700 cursor-pointer hover:text-orange-600"
                onClick={() => handleSort('name')}
              >
                City <SortIcon col="name" />
              </th>
              <th
                className="px-4 py-3 text-right font-semibold text-stone-700 cursor-pointer hover:text-orange-600"
                onClick={() => handleSort('medianRent')}
              >
                Median Rent <SortIcon col="medianRent" />
              </th>
              <th
                className="px-4 py-3 text-right font-semibold text-stone-700 cursor-pointer hover:text-orange-600"
                onClick={() => handleSort('medianHomePrice')}
              >
                Home Price <SortIcon col="medianHomePrice" />
              </th>
              <th
                className="px-4 py-3 text-right font-semibold text-stone-700 cursor-pointer hover:text-orange-600"
                onClick={() => handleSort('priceToRentRatio')}
              >
                P/R Ratio <SortIcon col="priceToRentRatio" />
              </th>
              <th
                className="px-4 py-3 text-right font-semibold text-stone-700 cursor-pointer hover:text-orange-600"
                onClick={() => handleSort('breakevenYears')}
              >
                Breakeven <SortIcon col="breakevenYears" />
              </th>
              <th className="px-4 py-3 text-center font-semibold text-stone-700">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((city, i) => (
              <tr
                key={city.slug}
                className={`border-t border-orange-50 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}`}
              >
                <td className="px-4 py-3">
                  <Link href={`${prefix}/cities/${city.slug}`} className="font-medium text-orange-700 hover:underline">
                    {city.name}, {city.state}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-stone-700">${city.medianRent.toLocaleString()}/mo</td>
                <td className="px-4 py-3 text-right text-stone-700">${(city.medianHomePrice / 1000).toFixed(0)}K</td>
                <td className="px-4 py-3 text-right text-stone-700">{city.priceToRentRatio}x</td>
                <td className="px-4 py-3 text-right text-stone-700">{city.breakevenYears} yrs</td>
                <td className="px-4 py-3 text-center">
                  <VerdictBadge verdict={city.verdict} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-stone-400 mt-2">{filtered.length} cities shown</p>
    </div>
  );
}
