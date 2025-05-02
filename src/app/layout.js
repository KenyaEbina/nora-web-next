import localFont from "next/font/local";
import "./globals.css";

import Menu from "./components/Menu/Menu";

export const metadata = {
  title: "Nora",
  description: "Nora",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
