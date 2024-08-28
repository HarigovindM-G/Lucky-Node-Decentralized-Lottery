import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lucky Node ",
  description: "A Decentralized Lottery Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>
       <Provider>{children}</Provider>
      </body>
    </html>
  );
}
