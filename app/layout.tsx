import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/content";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "3D Interactive Virtual Tours | Real Estate Photography & Virtual Tours",
    template: "%s | 3D Interactive Virtual Tours",
  },
  description:
    "Professional real estate photography, 3D interactive virtual tours, and immersive property marketing solutions for realtors and home sellers.",
  keywords: [
    "real estate photography",
    "3D virtual tours",
    "interactive virtual tours",
    "property marketing",
    "architectural photography",
    "aerial property photography",
    "Central Florida real estate photography",
  ],
  authors: [{ name: "3D Interactive Virtual Tours" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "3D Interactive Virtual Tours",
    title: "3D Interactive Virtual Tours | Real Estate Photography & Virtual Tours",
    description:
      "Professional real estate photography, 3D interactive virtual tours, and immersive property marketing solutions for realtors and home sellers.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Interactive Virtual Tours | Real Estate Photography & Virtual Tours",
    description:
      "Professional real estate photography, 3D interactive virtual tours, and immersive property marketing solutions for realtors and home sellers.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07111f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      {/* Browser extensions (Grammarly, password managers) inject attributes onto
          body before React hydrates, which React reports as a mismatch. This
          suppresses that one element's attribute diff only, not its children. */}
      <body className="bg-ink text-ivory" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink focus:label"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
