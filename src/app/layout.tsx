import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const inter = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ending Maker",
  description: "Rewrite your favourite TV and Movie endings",
  keywords: ["cloudfare", "ai", "genai", "dev.to", "image generation", "text generation", "arndom"],
  metadataBase: new URL("https://ending-maker.pages.dev/"),
  openGraph: {
    title: "Ending Maker",
    description: "Rewrite your favourite TV and Movie endings",
    url: "https://ending-maker.pages.dev/",
    siteName: "Ending Maker",
    locale: "en_US",
    type: "website",
    images: "/banner.png"
  },
  twitter: {
    title: "Ending Maker",
    description: "Rewrite your favourite TV and Movie endings",
    card: "summary_large_image",
    images: "/banner.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
