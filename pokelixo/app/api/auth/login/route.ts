import { NextRequest, NextResponse } from "next/server";
import { authenticateAccount, getPlayersByAccountId } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, password } = body;

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

    // Verifica se a conta precisa de confirmação de e-mail
    if (userAccount.email_verified === false) {
      let maskedEmail = "";
      if (userAccount.email) {
        const parts = userAccount.email.split("@");
        const user = parts[0] || "";
        const domain = parts[1] || "";
        maskedEmail = user.length > 2 
          ? `${user.slice(0, 2)}${"*".repeat(Math.max(1, user.length - 2))}@${domain}`
          : `${user}*@${domain}`;
      }

      return NextResponse.json(
        {
          success: false,
          requiresVerification: true,
          account: userAccount.name,
          maskedEmail,
          message: "Seu e-mail ainda não foi confirmado. Digite o código de 6 dígitos enviado para ativar sua conta.",
        },
        { status: 403 }
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
        premdays: userAccount.premdays ?? 3,
        created_at: userAccount.created_at,
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
