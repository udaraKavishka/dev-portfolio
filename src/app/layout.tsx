import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://udaradev.me'),
  title: {
    default: 'Udara Nalawansa | DevOps Engineer & Full Stack Developer',
    template: '%s | Udara Nalawansa'
  },
  description: 'DevOps Engineer and Full Stack Developer specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, Docker, AWS, and MLOps. Based in Sri Lanka with expertise in scalable systems and automation.',
  keywords: [
    'DevOps Engineer',
    'Full Stack Developer',
    'Cloud Engineer',
    'Kubernetes Expert',
    'Docker Containerization',
    'AWS Cloud',
    'CI/CD Pipelines',
    'MLOps Engineer',
    'Software Engineer Sri Lanka',
    'DevOps Sri Lanka',
    'Terraform Infrastructure',
    'Jenkins Automation',
    'Python Developer',
    'Go Developer',
    'React Developer',
    'Next.js Developer',
    'University of Vavuniya',
    'Infrastructure as Code',
    'Cloud Native Development',
    'Microservices Architecture'
  ],
  authors: [{ name: 'Udara Nalawansa', url: 'https://udaradev.me' }],
  creator: 'Udara Nalawansa',
  publisher: 'Udara Nalawansa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://udaradev.me',
    siteName: 'Udara Nalawansa Portfolio',
    title: 'Udara Nalawansa | DevOps Engineer & Full Stack Developer',
    description: 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, Docker, and scalable system architecture. Passionate about automation and MLOps.',
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
    title: 'Udara Nalawansa | DevOps Engineer',
    description: 'DevOps Engineer specializing in cloud infrastructure, Kubernetes, Docker, and CI/CD automation',
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
    canonical: 'https://udaradev.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
