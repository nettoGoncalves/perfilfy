import "./globals.css";

import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "../components/landing-page/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} bg-gray-50 text-content-body antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-6J7T37DMR4" />
    </html>
  );
}
