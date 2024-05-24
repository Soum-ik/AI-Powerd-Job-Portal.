import Navbar from "@/components/shared/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin deshboard",
  description: "This is a job search platform for sylhet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${inter.className} min-w-[350px] `}>
        <Navbar />
        <div className=" mt-28">{children}</div>
      </body>
    </html>
  );
}
