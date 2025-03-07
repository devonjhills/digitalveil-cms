// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton"; // Import the new component

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  fallback: ["serif"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "digital veil media",
  description: "mindful living in a digital world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${lora.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
              {children}
            </div>
          </main>
          <Footer />
          <BackToTopButton /> {/* Use the component here */}
        </Providers>
      </body>
    </html>
  );
}
