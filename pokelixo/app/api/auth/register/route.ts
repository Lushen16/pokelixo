import { NextRequest, NextResponse } from "next/server";
import { executeQuery, hashPassword, testDbConnection } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface AccountRow extends RowDataPacket {
  id: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, email, password, server, starterPokemon } = body;

    // Validações básicas
    if (!account || !password) {
      return NextResponse.json(
        { success: false, message: "Nome da conta e senha são obrigatórios." },
        { status: 400 }
      );
    }

    if (account.length < 3 || account.length > 32) {
      return NextResponse.json(
        { success: false, message: "O nome da conta deve ter entre 3 e 32 caracteres." },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { success: false, message: "A senha deve conter no mínimo 4 caracteres." },
        { status: 400 }
      );
    }

    // 1. Testa a conexão com o banco de dados MySQL
    const connTest = await testDbConnection();
    if (!connTest.connected) {
      // Retorna instrução clara para o desenvolvedor / usuário
      return NextResponse.json(
        {
          success: false,
          isDbOffline: true,
          message:
            "Aviso: Não foi possível conectar ao MySQL do PokéTibia. Verifique se o MySQL está rodando e se as variáveis DB_HOST, DB_USER e DB_PASSWORD estão preenchidas no .env ou no painel da Vercel.",
          debugError: connTest.error,
        },
        { status: 503 }
      );
    }

    // 2. Verifica se a conta já existe na tabela 'accounts'
    const existingAccounts = await executeQuery<AccountRow[]>(
      "SELECT id FROM accounts WHERE name = ? LIMIT 1",
      [account]
    );

    if (existingAccounts && existingAccounts.length > 0) {
      return NextResponse.json(
        { success: false, message: `O nome de conta "${account}" já está em uso. Escolha outro.` },
        { status: 409 }
      );
    }

    // 3. Verifica se o e-mail já existe (se informado)
    if (email) {
      const existingEmail = await executeQuery<AccountRow[]>(
        "SELECT id FROM accounts WHERE email = ? LIMIT 1",
        [email]
      );
      if (existingEmail && existingEmail.length > 0) {
        return NextResponse.json(
          { success: false, message: "Este e-mail já está associado a outra conta." },
          { status: 409 }
        );
      }
    }

    // 4. Cria a conta no banco de dados (padrão TFS/OTX)
    const hashedPassword = hashPassword(password);
    const creationTimestamp = Math.floor(Date.now() / 1000);

    const result = await executeQuery<ResultSetHeader>(
      "INSERT INTO accounts (name, password, email, premdays, creation) VALUES (?, ?, ?, ?, ?)",
      [account, hashedPassword, email || "", 3, creationTimestamp]
    );

    return NextResponse.json({
      success: true,
      accountId: result?.insertId,
      message: `Conta "${account}" criada com sucesso no servidor ${server ? String(server).toUpperCase() : "OFICIAL"}! Inicial: ${starterPokemon ? String(starterPokemon).toUpperCase() : "ESCOLHIDO"}.`,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao registrar conta:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro interno ao processar o cadastro no banco de dados.",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
