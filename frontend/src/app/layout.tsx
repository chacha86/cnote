import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./clientLayout";

const pretandard = localFont({
  src: "./fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CNote",
  description: "차태진 개인 노트/블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretandard.variable}`}>
      <body className={`${pretandard.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
