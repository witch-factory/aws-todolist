import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import { AmplifyProvider } from "./components/providers/amplify-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "AWS Amplify Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
