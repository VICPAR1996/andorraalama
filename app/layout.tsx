import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Andorra a la mà",
  description: "Tot el que necessites, a la teva parròquia.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${jetBrainsMono.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="h-full overflow-hidden"
        style={{
          fontFamily: "'General Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
          background: "#0a0a0b",
          color: "#f5f5f7",
        }}
      >
        {children}
      </body>
    </html>
  );
}
