import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import AuthProvider from "@/provider/AuthProvider";
import Authorization from "@/components/authentication/Authorization";
import StoreProvider from "@/provider/StoreProvider";
import Navbar from "@/components/navbar/Navbar";
import { EdgeStoreProvider } from "../edgestore/edgestore";
import Head from "next/head";

const font = Lato({
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: "Talent Hive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-100">

      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <title>Talent Hive</title>
      </Head>

      <body className={`${font.className}`}>
        <EdgeStoreProvider>
          <StoreProvider>
            <AuthProvider>
              <Authorization>
                <Navbar />
                <div className=" mx-auto max-w-[1440px] px-1 md:px-6 py-20 min-h-screen">
                  {children}
                </div>
              </Authorization>
            </AuthProvider>
            <Toaster />
          </StoreProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
