import { NextRequest, NextResponse } from "next/server";
import { findAccountByName, findAccountByEmail, createAccount } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, email, password } = body;

    // Validações básicas de formulário
    if (!account || !password) {
      return NextResponse.json(
        { success: false, message: "Nome da conta e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const trimmedAccount = String(account).trim();
    if (trimmedAccount.length < 3 || trimmedAccount.length > 32) {
      return NextResponse.json(
        { success: false, message: "O nome da conta deve ter entre 3 e 32 caracteres." },
        { status: 400 }
      );
    }

    if (String(password).length < 4) {
      return NextResponse.json(
        { success: false, message: "A senha deve conter no mínimo 4 caracteres." },
        { status: 400 }
      );
    }

    // 1. Verifica se a conta já existe
    const existingAccount = await findAccountByName(trimmedAccount);
    if (existingAccount) {
      return NextResponse.json(
        { success: false, message: `O nome de conta "${trimmedAccount}" já está em uso. Escolha outro.` },
        { status: 409 }
      );
    }

    // 2. Verifica se o e-mail já está cadastrado
    if (email && String(email).trim()) {
      const existingEmail = await findAccountByEmail(String(email).trim());
      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: "Este e-mail já está associado a outra conta." },
          { status: 409 }
        );
      }
    }

    // 3. Cria a conta no banco de dados (sem personagens)
    const newAccount = await createAccount({
      account: trimmedAccount,
      email: email ? String(email).trim() : "",
      password: String(password),
    });

    return NextResponse.json({
      success: true,
      account: {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        premdays: newAccount.premdays,
      },
      message: `Conta "${trimmedAccount}" criada com sucesso! Faça login para criar seu primeiro personagem e escolher seu Pokémon inicial.`,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao registrar conta:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro interno ao processar o cadastro.",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
