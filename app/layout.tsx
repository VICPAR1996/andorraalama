import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

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
    <html lang="ca" className={`${bricolage.variable} ${caveat.variable} ${jetBrainsMono.variable} h-full`}>
      <body
        className="h-full overflow-hidden"
        style={{
          fontFamily: "var(--font-bricolage), ui-sans-serif, system-ui, sans-serif",
          background: "#f6efe0",
          color: "#2a1f17",
        }}
      >
        {children}
      </body>
    </html>
  );
}
