import type { Metadata, Viewport } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/providers/Providers";

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: "SkyCast",
  description: "SkyCast is a simple app for checking the weather in your cities.",
  icons: {
    icon: "/weather-icon.svg",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="appContainer">
            <Header />
            <main className="mainContent">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};
