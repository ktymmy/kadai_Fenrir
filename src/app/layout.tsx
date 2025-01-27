import { Metadata } from "next";
import { RestaurantProvider } from './context/RestaurantContext';
import "./globals.css"; 
import { Inter } from "next/font/google";
import { ReactNode } from 'react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  //TODO:名前考える
  title: 'ぱくぱく',
  description: '説明'
}

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="ja">
      <body className={inter.className}>
      <RestaurantProvider>
            {children}
        </RestaurantProvider>
      </body>
      
    </html>
  );
}
