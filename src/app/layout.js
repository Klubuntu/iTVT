import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import { CookiesProvider } from 'next-client-cookies/server';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iTVT Hub | iTVT + More",
  description: "iTVT Hub | All Channels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://scripts.itvt.xyz/hub/" async></script>
      </head>
      <body className={`${inter.className} dark text-foreground bg-black`} suppressHydrationWarning>
        <CookiesProvider>
          <Providers>{children}</Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
