import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Portfolio - Adit",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${outfit.className} antialiased leading-8 overflow-x-hidden dark:bg-zinc-800
          dark:text-white bg-[url("/footer-bg-color.png")] bg-fixed`}
      >
        {children}
        
      </body>
    </html>
  );
}
