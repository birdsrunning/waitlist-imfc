// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image for Creatives — Join the Waitlist",
  description:
    "Join the waitlist for Image for Creatives. Images made specifically for designers, creators, and brands.",
  robots: {
    index: false, // change to true at launch
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-[#231F20]
          text-white
        `}
      >
        {children}

        <Toaster
          richColors
          closeButton
          position="top-right"
          duration={5000}
        />
      </body>
    </html>
  );
}
