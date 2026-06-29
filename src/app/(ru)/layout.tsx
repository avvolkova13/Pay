import type { Metadata } from "next";
import { MotionReveal } from "@/components/MotionReveal";
import "../globals.css";

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
    <html lang="ru">
      <body>
        <MotionReveal />
        {children}
      </body>
    </html>
  );
}
