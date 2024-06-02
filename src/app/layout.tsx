import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "@/components/shared/Footer";
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
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar />
        <div className=" mt-28">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
