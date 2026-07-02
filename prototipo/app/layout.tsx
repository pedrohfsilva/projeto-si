import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolyLink — Plataforma de Integração e Rastreabilidade",
  description:
    "Protótipo do sistema PolyLink para orquestração e observabilidade da cadeia de abastecimento da PolymerForge 3D.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
