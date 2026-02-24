import type { Metadata } from "next";
import { Inter, Caveat, Source_Code_Pro } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Yan Liu — Product Designer",
  description:
    "Design like a strategist. Ship like a builder. Senior Product Designer with 7+ years of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${sourceCodePro.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
