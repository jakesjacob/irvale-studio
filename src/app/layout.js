import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import TransitionLayout from "@/components/TransitionLayout";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <TransitionLayout>
            {children}
          </TransitionLayout>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
