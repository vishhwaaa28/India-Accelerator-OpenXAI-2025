import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Music Genre Classifier | AI-Powered Audio Analysis",
  description: "Discover your music's hidden patterns with advanced AI. Analyze genre, mood, and style of any audio track with precision and speed.",
  keywords: ["music classification", "genre detection", "AI audio analysis", "mood detection", "music technology"],
  authors: [{ name: "Music AI Labs" }],
  creator: "Music AI Labs",
  openGraph: {
    title: "Music Genre Classifier | AI-Powered Audio Analysis",
    description: "Discover your music's hidden patterns with advanced AI. Analyze genre, mood, and style of any audio track.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Music Genre Classifier",
    description: "AI-powered genre and mood detection for any song.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`
          ${inter.className} 
          min-h-screen
          bg-slate-950
          text-white 
          antialiased 
          selection:bg-purple-500/30 
          selection:text-purple-100
          scrollbar-thin 
          scrollbar-track-slate-950 
          scrollbar-thumb-slate-800 
          hover:scrollbar-thumb-slate-700
          font-feature-settings="cv02", "cv03", "cv04", "cv11"
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium z-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Skip to main content
        </a>
        
        {/* Global background effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-purple-950/20" />
          
          {/* Animated background orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 70%)',
            }}
          />
        </div>
        
        {/* Main content wrapper */}
        <div id="main-content" className="relative z-10">
          {children}
        </div>
        

      </body>
    </html>
  );
}