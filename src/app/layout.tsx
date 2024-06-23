import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "@/components/shared/Footer";
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: "Job Search",
  description: "This is a job search platform for sylhet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${inter.className} min-w-[350px] relative`}>
        <NextTopLoader color="#262626" shadow="true" />

        <Navbar />
        <div className=" mt-28">{children}</div>
        <Footer />
        <div className=" md:block hidden">
          <div className="absolute left-0 top-0 size-[500px] rounded-full bg-gradient-to-r from-rose-400 to-orange-300 opacity-20 blur-3xl"></div>
          <div className="absolute top-10 right-0 size-[500px] rounded-full bg-gradient-to-r z-0 from-violet-200 to-pink-200   opacity-50 blur-3xl"></div>
        </div>
      </body>
    </html>
  );
}
