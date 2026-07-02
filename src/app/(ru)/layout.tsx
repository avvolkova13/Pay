import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { MotionReveal } from "@/components/MotionReveal";
import { SiteLoader } from "@/components/SiteLoader";
import "../globals.css";
import "../site-loader.css";

export const metadata: Metadata = {
  title: "PAYWAYS INTERNATIONAL - FZCO",
  description: "Corporate website for PAYWAYS INTERNATIONAL - FZCO payment services."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteLoader />
        <MotionReveal />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
