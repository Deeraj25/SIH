import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "e-Mandi Setu | AI-Powered Grain Procurement & Queue Orchestration (SIH26032)",
  description: "Digital system for procurement schedules, farmer queues and real-time procurement status under the Ministry of Consumer Affairs, Food & Public Distribution.",
  keywords: ["SIH26032", "e-Mandi", "Grain Procurement", "Farmer Queue", "Smart India Hackathon", "DBT Payment", "AI Logistics Router"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#f8f9fa] text-[#1e293b] font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
