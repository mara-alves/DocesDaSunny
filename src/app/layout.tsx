import "~/styles/globals.css";

import { type Metadata } from "next";
import { Nunito } from "next/font/google";
import { Brygada_1918 } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Topbar from "./_components/layout/Topbar";

export const metadata: Metadata = {
  title: "Doces da Sunny",
  description: "Receitas de sobremesas da minha irmã Sunny",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const brygada = Brygada_1918({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${brygada.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <div className="bg-background text-base-content h-screen w-screen overflow-auto">
              <Topbar />
              <div className="container mx-auto mt-8 h-full w-full">
                {children}
              </div>
            </div>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
