import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import TransitionLayout from "@/components/TransitionLayout";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://irvale.studio'),
  title: "Irvale Studio",
  description: "Where luxury brands meet their digital moment.",
  openGraph: {
    title: "Irvale Studio",
    description: "Where luxury brands meet their digital moment.",
    siteName: "Irvale Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    'content-language': 'en',
    'google': 'notranslate',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body className={`${cormorant.variable} ${raleway.variable} antialiased notranslate`}>
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <TransitionLayout>
            {children}
          </TransitionLayout>
          <Footer />
        </SmoothScroll>
        <FloatingCTA />
      </body>
    </html>
  );
}
