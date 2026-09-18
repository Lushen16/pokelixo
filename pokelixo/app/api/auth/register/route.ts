import { NextRequest, NextResponse } from "next/server";
import { findAccountByName, findAccountByEmail, createAccount } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, email, password, phone, referralCode } = body;

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

    if (!phone || String(phone).trim().length < 6) {
      return NextResponse.json(
        { success: false, message: "Informe um número de telefone/WhatsApp válido para contato." },
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

    // 3. Gera código de verificação de 6 dígitos
    const cleanEmail = email ? String(email).trim() : "";
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Cria a conta no banco de dados com telefone, código de indicação e código de verificação
    const newAccount = await createAccount({
      account: trimmedAccount,
      email: cleanEmail,
      password: String(password),
      phone: phone ? String(phone).trim() : "",
      referralCode: referralCode ? String(referralCode).trim() : "",
      verificationCode,
    });

    // 5. Dispara o e-mail de confirmação via Resend
    let emailResult: { success: boolean; error?: string; devMode?: boolean } = { success: false, devMode: false };
    if (cleanEmail) {
      emailResult = await sendVerificationEmail({
        to: cleanEmail,
        accountName: trimmedAccount,
        code: verificationCode,
      });
    }

    let maskedEmail = "";
    if (cleanEmail) {
      const parts = cleanEmail.split("@");
      const user = parts[0] || "";
      const domain = parts[1] || "";
      maskedEmail = user.length > 2 
        ? `${user.slice(0, 2)}${"*".repeat(Math.max(1, user.length - 2))}@${domain}`
        : `${user}*@${domain}`;
    }

    return NextResponse.json({
      success: true,
      requiresVerification: true,
      account: {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        phone: newAccount.phone,
        premdays: newAccount.premdays,
      },
      maskedEmail,
      devMode: emailResult.devMode,
      message: cleanEmail
        ? `Conta criada! Enviamos um código de confirmação de 6 dígitos para ${maskedEmail}. Insira-o abaixo para ativar sua conta.`
        : `Conta "${trimmedAccount}" criada com sucesso!`,
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
