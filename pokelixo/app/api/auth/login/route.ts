import { NextRequest, NextResponse } from "next/server";
import { executeQuery, hashPassword, testDbConnection } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface AccountLoginRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  premdays: number;
}

interface PlayerRow extends RowDataPacket {
  id: number;
  name: string;
  level: number;
  vocation: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, password, server } = body;

    if (!account || !password) {
      return NextResponse.json(
        { success: false, message: "Informe a conta e a senha." },
        { status: 400 }
      );
    }

    // 1. Testa a conexão com o banco MySQL
    const connTest = await testDbConnection();
    if (!connTest.connected) {
      return NextResponse.json(
        {
          success: false,
          isDbOffline: true,
          message:
            "Aviso: Não foi possível conectar ao banco de dados MySQL. Verifique as credenciais DB_HOST e DB_PASSWORD no .env ou na Vercel.",
          debugError: connTest.error,
        },
        { status: 503 }
      );
    }

    // 2. Busca a conta no banco de dados
    const hashedPassword = hashPassword(password);
    const rows = await executeQuery<AccountLoginRow[]>(
      "SELECT id, name, email, premdays FROM accounts WHERE name = ? AND password = ? LIMIT 1",
      [account, hashedPassword]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nome de conta ou senha incorretos." },
        { status: 401 }
      );
    }

    const userAccount = rows[0];

    // 3. Busca os personagens da conta (se a tabela 'players' existir)
    let players: PlayerRow[] = [];
    try {
      players = await executeQuery<PlayerRow[]>(
        "SELECT id, name, level, vocation FROM players WHERE account_id = ? ORDER BY level DESC",
        [userAccount.id]
      );
    } catch {
      // Caso a tabela players ainda não tenha sido populada
      players = [];
    }

    return NextResponse.json({
      success: true,
      message: `Bem-vindo de volta, Treinador ${userAccount.name}!`,
      account: {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        premdays: userAccount.premdays,
        server: server || "Valaria",
      },
      players,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao realizar login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro interno ao verificar a conta no banco de dados.",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
