import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "PokéWorld <onboarding@resend.dev>";

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
    console.log("📨 [POKÉWORLD EMAIL - MODO DESENVOLVIMENTO / SEM CHAVE]");
    console.log(`Para: ${to}`);
    console.log(`Treinador: ${accountName}`);
    console.log(`CÓDIGO DE VERIFICAÇÃO MASTER BALL: >>> ${code} <<<`);
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
      subject: `[PokéWorld] 🔮 Seu Código Master Ball: ${code}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmação de Conta PokéWorld</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #030509;
              color: #f8fafc;
              margin: 0;
              padding: 24px 12px;
            }
            .container {
              max-width: 540px;
              margin: 0 auto;
              background: #070a16;
              border: 1px solid #581c87;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
            }
            .top-bar {
              height: 6px;
              background: linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #06b6d4 100%);
            }
            .content {
              padding: 36px 28px 32px 28px;
              text-align: center;
            }
            .badge-master {
              display: inline-block;
              padding: 6px 14px;
              border-radius: 9999px;
              background: rgba(147, 51, 234, 0.15);
              border: 1px solid rgba(192, 132, 252, 0.4);
              color: #c084fc;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              margin-bottom: 16px;
            }
            .brand-title {
              font-size: 28px;
              font-weight: 900;
              letter-spacing: 1px;
              color: #ffffff;
              margin: 0 0 4px 0;
              text-transform: uppercase;
            }
            .brand-title span {
              color: #38bdf8;
            }
            .subtitle {
              font-size: 13px;
              color: #94a3b8;
              margin: 0 0 24px 0;
            }
            .divider {
              height: 1px;
              background: #1e1b4b;
              margin: 20px 0;
            }
            .greeting {
              font-size: 15px;
              color: #cbd5e1;
              line-height: 1.6;
              text-align: left;
              margin-bottom: 24px;
            }
            .greeting strong {
              color: #ffffff;
            }
            .code-card {
              background: #03050b;
              border: 2px solid #7e22ce;
              border-radius: 18px;
              padding: 24px 16px;
              margin: 26px 0;
              text-align: center;
              box-shadow: inset 0 0 20px rgba(126, 34, 206, 0.2);
            }
            .code-label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #a855f7;
              margin-bottom: 10px;
            }
            .code-number {
              font-family: 'Courier New', Courier, monospace;
              font-size: 38px;
              font-weight: 900;
              letter-spacing: 8px;
              color: #38bdf8;
              margin: 0;
              padding: 4px 0;
            }
            .timer-badge {
              display: inline-block;
              margin-top: 10px;
              font-size: 11px;
              color: #ec4899;
              font-weight: 600;
            }
            .instructions {
              font-size: 13px;
              color: #94a3b8;
              line-height: 1.6;
              text-align: left;
              margin-bottom: 20px;
            }
            .feature-list {
              background: #0a0e22;
              border-radius: 12px;
              padding: 14px 16px;
              margin: 20px 0;
              text-align: left;
              font-size: 12px;
              color: #cbd5e1;
              line-height: 1.8;
              border-left: 3px solid #06b6d4;
            }
            .footer {
              background: #04060d;
              padding: 20px 24px;
              border-top: 1px solid #1e1b4b;
              text-align: center;
              font-size: 11px;
              color: #64748b;
              line-height: 1.6;
            }
            .footer strong {
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="top-bar"></div>
            <div class="content">
              <!-- Ícone / Selo Master Ball -->
              <div style="margin-bottom: 12px;">
                <span style="font-size: 42px;">🔮</span>
              </div>

              <div class="badge-master">Edição Master Ball</div>
              <h1 class="brand-title">Poké<span>World</span> Online</h1>
              <p class="subtitle">O Maior e Mais Desafiador MMORPG Pokémon</p>

              <div class="divider"></div>

              <p class="greeting">
                Saudações, Mestre Treinador <strong>${accountName}</strong>!<br>
                Sua jornada pelos mundos de <strong>Valaria</strong>, <strong>Orten</strong> e <strong>Zertiros</strong> está prestes a começar. Para ativar sua conta e liberar a escolha do seu primeiro Pokémon inicial, confirme seu e-mail com o código Master Ball abaixo:
              </p>

              <!-- Caixa do Código de Ativação -->
              <div class="code-card">
                <div class="code-label">Seu Código de Confirmação</div>
                <div class="code-number">${code}</div>
                <div class="timer-badge">⏱️ Válido por 30 minutos</div>
              </div>

              <div class="feature-list">
                🎮 <strong>Próximo Passo:</strong> Ao ativar sua conta no site, você poderá criar seu personagem, escolher seu servidor e selecionar seu Pokémon inicial oficial entre a 1ª e a 7ª geração!
              </div>

              <p class="instructions">
                Se você não realizou o cadastro no <strong>PokéWorld</strong>, fique tranquilo: basta ignorar este e-mail. Por segurança, jamais compartilhe sua senha ou código com outras pessoas.
              </p>
            </div>

            <div class="footer">
              <p>
                © <strong>PokéWorld MMORPG</strong> • Mundos Valaria, Orten & Zertiros<br>
                Este é um servidor fan-made desenvolvido com paixão pela comunidade.
              </p>
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
