import { NextResponse } from "next/server";
import { testDbConnection } from "@/lib/db";

export async function GET() {
  const result = await testDbConnection();

  return NextResponse.json({
    status: result.connected ? "connected" : "disconnected",
    dbHost: process.env.DB_HOST ? `${process.env.DB_HOST.slice(0, 4)}***` : "127.0.0.1",
    dbName: process.env.DB_NAME || "poketibia",
    message: result.connected
      ? "Conexão com o banco MySQL do PokéTibia estabelecida com sucesso!"
      : "Banco de dados MySQL desconectado ou inacessível no momento.",
    error: result.error,
  });
}
