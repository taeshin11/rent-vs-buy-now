import { MetadataRoute } from 'next';
import citiesData from '@/data/cities-fallback.json';

const BASE_URL = 'https://rent-vs-buy-now.vercel.app';
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/cities', '/states', '/calculator', '/guide', '/faq', '/about', '/how-to-use', '/privacy', '/terms'];

  const pages: MetadataRoute.Sitemap = [];

  // Static pages for all locales
  for (const page of staticPages) {
    for (const locale of locales) {
      const localePath = locale === 'en' ? page || '/' : `/${locale}${page || ''}`;
      pages.push({
        url: `${BASE_URL}${localePath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // City pages
  for (const city of citiesData) {
    for (const locale of locales) {
      const localePath = locale === 'en' ? `/cities/${city.slug}` : `/${locale}/cities/${city.slug}`;
      pages.push({
        url: `${BASE_URL}${localePath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return pages;
}
