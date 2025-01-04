import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Interactive Node Graph",
  description:
    "Interactive Node Graph visualization app designed to display a travel booking workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        property="og:image"
        content="https://planner-node-map.vercel.app/api/static"
      ></meta>
      <meta
        property="twitter:image"
        content="https://planner-node-map.vercel.app/api/static"
      ></meta>
      <meta
        property="twitter:card"
        content="https://planner-node-map.vercel.app/api/static"
      ></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
