import "./globals.css";

import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    <html lang="en">
      <body
        className={`${poppins.className} bg-white text-content-body antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-6J7T37DMR4" />
    </html>
  );
}
