import { Metadata } from 'next';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === 'en' ? '/privacy' : `/${locale}/privacy`;
  return {
    title: 'Privacy Policy | RentVsBuyNow',
    description: 'Privacy policy for RentVsBuyNow. Learn how we collect, use, and protect your information when you use our rent vs buy calculator and housing market tools.',
    alternates: {
      canonical: `https://rent-vs-buy-now.vercel.app${path}`,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  await params;
  const lastUpdated = 'April 13, 2025';

  return (
    <>
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-orange-100">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">1. Introduction</h2>
          <p className="text-stone-600 leading-relaxed">
            Welcome to RentVsBuyNow (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We operate the website at rent-vs-buy-now.vercel.app (the &ldquo;Site&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site. Please read this policy carefully. If you do not agree with its terms, please discontinue use of the Site.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">2. Information We Collect</h2>
          <h3 className="font-semibold text-stone-700 mb-2">Information You Provide</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            Our calculator and tools are designed to operate without requiring you to create an account or provide personal information. Any values you enter into the calculator (home price, down payment, rent, etc.) are processed locally in your browser and are not transmitted to or stored on our servers.
          </p>
          <h3 className="font-semibold text-stone-700 mb-2">Automatically Collected Information</h3>
          <p className="text-stone-600 leading-relaxed mb-3">
            When you visit the Site, we may automatically collect certain information, including:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>Your IP address (used only for aggregate visitor counting)</li>
            <li>Browser type and version</li>
            <li>Pages viewed and time spent on those pages</li>
            <li>Referring URLs</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">3. How We Use Your Information</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>Operate and maintain the Site</li>
            <li>Monitor and analyze usage and trends to improve the Site</li>
            <li>Display aggregate visitor statistics (total visitors and visitors today)</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            We do not sell, trade, or otherwise transfer your personally identifiable information to third parties.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">4. Cookies and Tracking Technologies</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            We may use cookies and similar tracking technologies to improve your experience on our Site. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of the Site may not function properly.
          </p>
          <h3 className="font-semibold text-stone-700 mb-2">Google AdSense</h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our Site or other sites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Google Ads Settings</a>. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">5. Third-Party Services</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            Our Site may use the following third-party services, each with their own privacy policies:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>
              <strong>Google AdSense</strong> — advertising platform. See{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Vercel</strong> — hosting and deployment. See{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                Vercel Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">6. Data Retention</h2>
          <p className="text-stone-600 leading-relaxed">
            Aggregate visitor counts are stored in a database to display site statistics. This data contains no personally identifiable information — it consists only of a running total of page visits and a daily visit counter. Individual IP addresses used for deduplication are not stored permanently and are not linked to any personal profile.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">7. Children&apos;s Privacy</h2>
          <p className="text-stone-600 leading-relaxed">
            Our Site is not intended for use by anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so that we can take appropriate action.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">8. Your Privacy Rights</h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of the sale of your personal information (we do not sell personal data)</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            Since we collect minimal personal information and do not store calculator inputs, most requests will be addressed by confirming that no personal data is retained.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">9. Changes to This Policy</h2>
          <p className="text-stone-600 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-stone-800 mb-3">10. Contact Us</h2>
          <p className="text-stone-600 leading-relaxed">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us through the Site. We aim to respond to all inquiries within a reasonable timeframe.
          </p>
        </section>

      </div>
    </>
  );
}
