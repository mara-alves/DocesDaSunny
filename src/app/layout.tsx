import "~/styles/globals.css";

import { type Metadata } from "next";
import { Nunito } from "next/font/google";
import { Brygada_1918 } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import SessionWrapper from "./_providers/SessionWrapper";

export const metadata: Metadata = {
  title: "Doces da Sunny",
  description: "Receitas de sobremesas da minha irmã Sunny",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-sans",
});

const brygada = Brygada_1918({
  subsets: ["latin"],
  style: ["normal", "italic"],
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
            <SessionWrapper>{children}</SessionWrapper>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
