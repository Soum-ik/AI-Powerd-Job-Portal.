import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/shared/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post Your Job's",
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
        <div className="">{children}</div>
      </body>
    </html>
  );
}
