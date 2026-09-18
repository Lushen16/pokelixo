import { NextResponse } from "next/server";
import { checkDbStatus } from "@/lib/db";

export async function GET() {
  const result = await checkDbStatus();

  return NextResponse.json({
    status: result.connected ? "connected" : "fallback",
    provider: result.provider,
    message: result.connected
      ? "Banco de dados Vercel Postgres conectado e operacional!"
      : "Rodando com armazenamento de contingência (Vercel Storage / Postgres não ativado no dashboard).",
    error: result.error,
  });
}
