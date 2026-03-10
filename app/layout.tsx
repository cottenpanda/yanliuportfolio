import type { Metadata } from "next";
import { Inter, Caveat, Source_Code_Pro, Noto_Sans, Courier_Prime } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

export const metadata: Metadata = {
  title: "Yan Liu — Product Designer",
  description:
    "Design like a strategist. Ship like a builder. Senior Product Designer with 7+ years of experience.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${sourceCodePro.variable} ${notoSans.variable} ${courierPrime.variable}`}>
      <head>
        <link rel="preload" href="/mac-folder-back-opt.svg" as="image" />
        <link rel="preload" href="/mac-folder-front-opt.svg" as="image" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
