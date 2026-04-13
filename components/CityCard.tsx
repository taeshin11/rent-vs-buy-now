import Link from 'next/link';
import { City } from '@/lib/types';
import VerdictBadge from './VerdictBadge';

interface CityCardProps {
  city: City;
  locale: string;
}

export default function CityCard({ city, locale }: CityCardProps) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return (
    <Link
      href={`${prefix}/cities/${city.slug}`}
      className="block bg-white border border-orange-100 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-stone-800 text-lg">{city.name}</h3>
          <p className="text-sm text-stone-500">{city.state}</p>
        </div>
        <VerdictBadge verdict={city.verdict} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-stone-500">Median Rent</span>
          <p className="font-semibold text-stone-800">${city.medianRent.toLocaleString()}/mo</p>
        </div>
        <div>
          <span className="text-stone-500">Home Price</span>
          <p className="font-semibold text-stone-800">${(city.medianHomePrice / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <span className="text-stone-500">P/R Ratio</span>
          <p className="font-semibold text-stone-800">{city.priceToRentRatio}x</p>
        </div>
        <div>
          <span className="text-stone-500">Breakeven</span>
          <p className="font-semibold text-stone-800">{city.breakevenYears} yrs</p>
        </div>
      </div>
    </Link>
  );
}
