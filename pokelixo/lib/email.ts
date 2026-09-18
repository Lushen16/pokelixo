import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "PokéTibia <onboarding@resend.dev>";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface SendVerificationEmailParams {
  to: string;
  accountName: string;
  code: string;
}

export async function sendVerificationEmail({
  to,
  accountName,
  code,
}: SendVerificationEmailParams): Promise<{ success: boolean; error?: string; devMode?: boolean }> {
  // Se a chave ainda não estiver configurada no .env.local ou Vercel, opera em modo de desenvolvimento amigável
  if (!resend) {
    console.log("=========================================================");
    console.log("📨 [POKÉTIBIA EMAIL - MODO DESENVOLVIMENTO / SEM CHAVE]");
    console.log(`Para: ${to}`);
    console.log(`Treinador: ${accountName}`);
    console.log(`CÓDIGO DE VERIFICAÇÃO: >>> ${code} <<<`);
    console.log("Dica: Adicione RESEND_API_KEY na Vercel e .env.local para envio real.");
    console.log("=========================================================");
    return {
      success: true,
      devMode: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [to],
      subject: `[PokéTibia] Seu Código de Confirmação: ${code}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #04060d;
              color: #f1f5f9;
              margin: 0;
              padding: 24px;
            }
            .card {
              max-width: 520px;
              margin: 0 auto;
              background: linear-gradient(145deg, #0a0d1d, #050711);
              border: 1px solid #3b0764;
              border-radius: 20px;
              padding: 32px 28px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            }
            .header {
              text-align: center;
              margin-bottom: 24px;
            }
            .title {
              font-size: 24px;
              font-weight: 900;
              background: linear-gradient(to right, #a855f7, #38bdf8);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin: 8px 0;
            }
            .greeting {
              font-size: 15px;
              color: #cbd5e1;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .code-box {
              background: #0d1124;
              border: 2px dashed #9333ea;
              border-radius: 14px;
              text-align: center;
              padding: 20px;
              margin: 24px 0;
            }
            .code {
              font-family: 'Courier New', Courier, monospace;
              font-size: 34px;
              font-weight: 900;
              letter-spacing: 8px;
              color: #38bdf8;
              text-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
              margin: 0;
            }
            .expires {
              font-size: 12px;
              color: #94a3b8;
              margin-top: 8px;
            }
            .info {
              font-size: 13px;
              color: #94a3b8;
              line-height: 1.5;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #1e1b4b;
              font-size: 11px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div style="font-size: 36px; margin-bottom: 4px;">🔮</div>
              <h1 class="title">PokéTibia Online</h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">Confirmação de Cadastro de Treinador</p>
            </div>

            <p class="greeting">
              Olá, mestre <strong>${accountName}</strong>! Bem-vindo ao universo de PokéTibia.<br>
              Para ativar sua conta e desbloquear a criação do seu primeiro personagem, insira o código abaixo no site:
            </p>

            <div class="code-box">
              <p class="code">${code}</p>
              <p class="expires">⏱️ Válido por 30 minutos</p>
            </div>

            <p class="info">
              Se você não solicitou este cadastro, desconsidere esta mensagem com segurança. Ninguém da equipe PokéTibia solicitará sua senha.
            </p>

            <div class="footer">
              <p>© PokéTibia MMORPG • Servidores Valaria, Orten & Zertiros</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Erro ao enviar e-mail via Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Erro desconhecido ao enviar e-mail";
    console.error("Exceção ao disparar e-mail:", err);
    return { success: false, error: errorMsg };
  }
}
