import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "@/shared/lib/styles/null.scss";
import "@/shared/lib/styles/base.scss";

import { Footer } from "@/shared/ui/components/footer/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarity Global Inc",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
