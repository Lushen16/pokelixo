import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéTibia Online - O Melhor Servidor MMORPG",
  description: "Crie sua conta, baixe o cliente e explore um mundo Pokémon incrível no PokéTibia! Torneios, Quests e Batalhas Épicas.",
  icons: {
    icon: "/masterball.svg",
    shortcut: "/masterball.svg",
    apple: "/masterball.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#030509] text-zinc-100 selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
