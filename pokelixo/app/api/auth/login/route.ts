import { NextRequest, NextResponse } from "next/server";
import { authenticateAccount, getPlayersByAccountId } from "@/lib/db";

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

    const trimmedAccount = String(account).trim();
    const userAccount = await authenticateAccount(trimmedAccount, String(password));

    if (!userAccount) {
      return NextResponse.json(
        { success: false, message: "Nome de conta ou senha incorretos." },
        { status: 401 }
      );
    }

    // Busca personagens vinculados à conta
    const players = await getPlayersByAccountId(userAccount.id);

    return NextResponse.json({
      success: true,
      message: `Bem-vindo de volta, Treinador ${userAccount.name}!`,
      account: {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        server: userAccount.server || server || "Valaria",
        starter: userAccount.starter,
        premdays: userAccount.premdays ?? 3,
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
