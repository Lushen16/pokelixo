import { NextRequest, NextResponse } from "next/server";
import { resendVerificationCode } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account } = body;

    if (!account) {
      return NextResponse.json(
        { success: false, message: "Informe a conta para reenviar o código." },
        { status: 400 }
      );
    }

    const result = await resendVerificationCode(String(account).trim());

    if (!result.success || !result.email || !result.newCode) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // Dispara o e-mail via Resend
    const emailResult = await sendVerificationEmail({
      to: result.email,
      accountName: result.accountName || account,
      code: result.newCode,
    });

    const maskedEmail = result.email.replace(/(.{2})(.*)(?=@)/, (_gp1, h, t) => h + "*".repeat(t.length));

    return NextResponse.json({
      success: true,
      message: `Novo código enviado com sucesso para ${maskedEmail}!`,
      devMode: emailResult.devMode,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao reenviar código de e-mail:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno ao reenviar código.", error: errorMsg },
      { status: 500 }
    );
  }
}
