import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora, Lora, Fraunces, DM_Sans, DM_Mono } from 'next/font/google';
import { UserProvider } from '@/lib/auth/index';
import { getUser } from '@/lib/db/queries';
import { AppChrome } from '@/components/layout/app-chrome';
import Script from 'next/script';
import { LandingLocaleProvider } from '@/lib/landing/locale';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure JetBrains Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['200', '400', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-mono',
  weight: ['300', '400'],
});

export const metadata: Metadata = {
  title: {
    default: 'Building Bridges - Empowering Girls & FLINTA* of Colour',
    template: '%s | Building Bridges',
  },
  description: 'Building Bridges empowers Girls and FLINTA* of Colour through mentorship, education, and community support. Join our community for workshops, mentoring programs, and scholarships.',
  keywords: ['Mentoring', 'Empowerment', 'FLINTA', 'Girls of Colour', 'Education', 'Workshops', 'Berlin', 'Mädchen', 'Bildung'],
  authors: [{ name: 'Building Bridges Team' }],
  creator: 'Building Bridges',
  publisher: 'Building Bridges',
  metadataBase: new URL('https://www.building-bridges.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.building-bridges.app',
    title: 'Building Bridges - Empowering Girls & FLINTA* of Colour',
    description: 'Empowerment und Mentoring für Mädchen & FLINTA of Color',
    siteName: 'Building Bridges',
    images: [
      {
        url: '/logo_graphic.png',
        width: 1200,
        height: 630,
        alt: 'Building Bridges Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Bridges - Empowering Girls & FLINTA* of Colour',
    description: 'Empowerment und Mentoring für Mädchen & FLINTA of Color',
    images: ['/logo_graphic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo_round.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/logo_round.svg',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="de"
      className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} ${lora.variable} ${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-primary antialiased min-h-[100dvh]">
        {/* Auto-reload on chunk load failure to avoid blank screen after deployments */}
        <Script id="chunk-error-reload" strategy="beforeInteractive">
          {`
          (function(){
            var refreshOnceKey='__bb_chunk_refresh_done__';
            window.addEventListener('error', function(e){
              var m=e && e.message || '';
              if(m.includes('Loading chunk') || m.includes('ChunkLoadError')){
                if(!sessionStorage.getItem(refreshOnceKey)){
                  sessionStorage.setItem(refreshOnceKey,'1');
                  location.reload();
                }
              }
            }, true);
          })();
          `}
        </Script>
        <UserProvider userPromise={userPromise}>
          <LandingLocaleProvider>
            <AppChrome>{children}</AppChrome>
          </LandingLocaleProvider>
        </UserProvider>
      </body>
    </html>
  );
}
