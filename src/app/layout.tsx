// src/app/layout.tsx


import "./globals.css";

import { ChakraProviderApp, ReactQueryProvider } from "@/providers";
import { Toaster } from "@/components/ui/toast";
import { ModalProvider } from "@/contexts/ModalContext";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";


export const metadata: Metadata = {
  title: "Feito Aqui",
  description: "Feito Aqui - Nasce no Brasil, viaja pelo mundo",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
  themeColor: "#000000",
  colorScheme: "light",
};


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props


  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ChakraProviderApp>
          <ReactQueryProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </ReactQueryProvider>
          <Toaster />
        </ChakraProviderApp>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}