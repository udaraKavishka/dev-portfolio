import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { defaultDescription, SITE_NAME, SITE_URL } from "@/lib/seo";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Udara Nalawansa | DevOps Engineer in Sri Lanka',
    template: '%s | Udara Nalawansa'
  },
  description: defaultDescription,
  authors: [{ name: 'Udara Nalawansa', url: SITE_URL }],
  creator: 'Udara Nalawansa',
  publisher: 'Udara Nalawansa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Udara Nalawansa | DevOps Engineer in Sri Lanka',
    description: defaultDescription,
    images: [
      {
        url: '/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Udara Nalawansa Portfolio - DevOps Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udara Nalawansa | DevOps Engineer in Sri Lanka',
    description: defaultDescription,
    images: ['/screenshot.png'],
    creator: '@udaranalawansa'
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
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#191724' },
    { media: '(prefers-color-scheme: light)', color: '#faf4ed' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head />
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
