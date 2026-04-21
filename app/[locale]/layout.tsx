import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={currentLocale}>
      <Navbar locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="RentVsBuyNow" />
      <Footer />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}
