import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CogBioAV Lab - Md Mahbub E Noor",
  description: "Assistant Professor, Department of CSE, University of Barisal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
