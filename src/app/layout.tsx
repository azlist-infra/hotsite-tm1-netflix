// src/app/layout.tsx


import "./globals.css";

import { ChakraProviderApp, ReactQueryProvider } from "@/providers";
import { Toaster } from "@/components/ui/toast";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Netflix Feito Aqui",
  description: "Netflix Feito Aqui - Nasce no Brasil, viaja pelo mundo",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AZ Staff",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props


  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ChakraProviderApp>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
          <Toaster />
        </ChakraProviderApp>
        <SpeedInsights />
      </body>
    </html>
  )
}