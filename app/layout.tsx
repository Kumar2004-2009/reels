import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { Video } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reelify",
  description: "Upload your Reels and show your creativity to world",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}