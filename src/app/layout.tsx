import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Doces da Sunny",
  description: "Receitas de sobremesas da Sunny",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <div className="bg-background text-base-content h-screen w-screen">
              <div className="container mx-auto">{children}</div>
            </div>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
