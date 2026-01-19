import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/common/navbar";
import { ThemeProvider } from "@/src/components/theme/theme-provider";
import Footer from "@/src/common/footer";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sujit's Portfolio",
  description: "Welcome to Sujit's personal portfolio website, showcasing projects, skills, and experience in web development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased alata-regular tracking-wider  bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Script
            src="/oneko.js"
            strategy="afterInteractive"
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
