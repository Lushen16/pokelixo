import { NextRequest, NextResponse } from "next/server";
import { verifyAccountCode } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, code } = body;

    if (!account || !code) {
      return NextResponse.json(
        { success: false, message: "Informe a conta e o código de confirmação." },
        { status: 400 }
      );
    }

    const result = await verifyAccountCode(String(account).trim(), String(code).trim());

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao verificar código de e-mail:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno ao validar o código.", error: errorMsg },
      { status: 500 }
    );
  }
}
