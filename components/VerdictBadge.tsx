'use client';

interface VerdictBadgeProps {
  verdict: 'buy' | 'rent' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const labels = {
  buy: 'Buy',
  rent: 'Rent',
  neutral: 'Neutral'
};

export default function VerdictBadge({ verdict, size = 'md' }: VerdictBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${sizeClasses[size]} verdict-${verdict}`}>
      {labels[verdict]}
    </span>
  );
}
