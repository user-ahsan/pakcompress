import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pakcompress.example.com"),
  title: "PakCompress - Compress Photo and PDF to Exact KB for Pakistan Forms",
  description: "Compress a photo or PDF to 20 KB, 50 KB, 100 KB or 200 KB in your browser. No upload. Free for FPSC, PPSC, NTS, NADRA, HEC and university forms in Pakistan.",
  openGraph: { title: "PakCompress", description: "Photo and PDF compressor to exact KB. No upload. Built for Pakistan forms.", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
