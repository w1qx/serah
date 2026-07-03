import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سراة — منصة التوعية المالية",
  description: "منصة مالية توعوية تساعدك على فهم أثر قرارات التمويل على وضعك المالي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
