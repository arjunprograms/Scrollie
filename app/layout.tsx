import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "SCROLLIE - AI Content Intelligence Platform",
  description: "SCROLLIE: The AI carousel creator and content intelligence platform for social media growth. Create viral carousels, adapt content for every platform, and track your growth.",
  keywords: [
    "SCROLLIE",
    "AI carousel creator",
    "social media content",
    "content intelligence",
    "Instagram carousels",
    "LinkedIn content",
    "growth analytics",
    "multi-platform content"
  ],
  generator: 'v0.dev',
  // Add basic schema markup for organization
  openGraph: {
    title: "SCROLLIE - AI Content Intelligence Platform",
    description: "SCROLLIE: The AI carousel creator and content intelligence platform for social media growth. Create viral carousels, adapt content for every platform, and track your growth.",
    url: "https://scrollie.ai",
    siteName: "SCROLLIE",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SCROLLIE - AI Content Intelligence Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
