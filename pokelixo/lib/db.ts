import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import crypto from "crypto";

// URL do Banco de Dados na Vercel (gerada automaticamente pelo Neon / Vercel Storage)
const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;

// Memória local de contingência (caso o banco ainda não tenha sido conectado na Vercel)
export interface MemoryAccount {
  id: number;
  name: string;
  password: string;
  email: string;
  phone?: string;
  referral_code?: string;
  email_verified: boolean;
  verification_code?: string;
  verification_code_expires?: string;
  premdays: number;
  created_at: string;
}

export interface MemoryPlayer {
  id: number;
  account_id: number;
  name: string;
  server: string;
  pokemon: string;
  level: number;
  vocation: number;
  created_at: string;
}

const memoryAccounts: MemoryAccount[] = [
  {
    id: 1,
    name: "admin",
    password: hashPassword("admin"),
    email: "admin@poketibia.com",
    phone: "(11) 99999-9999",
    referral_code: "MASTER",
    email_verified: true,
    premdays: 30,
    created_at: new Date().toISOString(),
  },
];

const memoryPlayers: MemoryPlayer[] = [
  {
    id: 1,
    account_id: 1,
    name: "Red Champion",
    server: "valaria",
    pokemon: "Charizard",
    level: 100,
    vocation: 1,
    created_at: new Date().toISOString(),
  },
];

let tablesInitialized = false;

// Obtém o cliente SQL da Vercel / Neon
export function getSqlClient(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) {
    return null;
  }
  return neon(DATABASE_URL);
}

// Cria automaticamente as tabelas 'accounts' e 'players' no banco da Vercel se não existirem
export async function ensureTablesExist() {
  if (tablesInitialized) return;
  const sql = getSqlClient();
  if (!sql) return;

  try {
    // Tabela de Contas (com telefone, código de indicação e verificação de e-mail)
    await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(32),
        referral_code VARCHAR(64),
        email_verified BOOLEAN DEFAULT FALSE,
        verification_code VARCHAR(10),
        verification_code_expires TIMESTAMP,
        premdays INT DEFAULT 3,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Garante que as colunas existam caso a tabela já tenha sido criada anteriormente
    await sql`
      ALTER TABLE accounts ADD COLUMN IF NOT EXISTS phone VARCHAR(32);
    `;
    await sql`
      ALTER TABLE accounts ADD COLUMN IF NOT EXISTS referral_code VARCHAR(64);
    `;
    await sql`
      ALTER TABLE accounts ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
    `;
    await sql`
      ALTER TABLE accounts ADD COLUMN IF NOT EXISTS verification_code VARCHAR(10);
    `;
    await sql`
      ALTER TABLE accounts ADD COLUMN IF NOT EXISTS verification_code_expires TIMESTAMP;
    `;

    // Tabela de Personagens (vinculados à conta, com servidor e inicial)
    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
        name VARCHAR(32) UNIQUE NOT NULL,
        server VARCHAR(32) DEFAULT 'valaria',
        level INT DEFAULT 1,
        vocation INT DEFAULT 1,
        pokemon VARCHAR(64) DEFAULT 'Charmander',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Garante que a coluna server e pokemon existam caso a tabela tenha sido criada em versão anterior
    await sql`
      ALTER TABLE players ADD COLUMN IF NOT EXISTS server VARCHAR(32) DEFAULT 'valaria';
    `;
    await sql`
      ALTER TABLE players ADD COLUMN IF NOT EXISTS pokemon VARCHAR(64) DEFAULT 'Charmander';
    `;

    tablesInitialized = true;
  } catch (err) {
    console.error("Erro ao inicializar tabelas na Vercel:", err);
  }
}

// Criptografia de senha (SHA1 padrão PokéTibia)
export function hashPassword(password: string): string {
  return crypto.createHash("sha1").update(password).digest("hex");
}

// Testa a conexão com o banco
export async function checkDbStatus(): Promise<{ connected: boolean; provider: string; error?: string }> {
  if (!DATABASE_URL) {
    return {
      connected: false,
      provider: "Memória Local (Banco de Dados da Vercel ainda não configurado)",
    };
  }

  try {
    const sql = getSqlClient();
    if (!sql) throw new Error("Cliente SQL não inicializado");
    await sql`SELECT 1`;
    await ensureTablesExist();
    return { connected: true, provider: "Vercel Postgres (Neon Cloud)" };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
    return { connected: false, provider: "Vercel Postgres (Neon)", error: errorMsg };
  }
}

// =========================================================================
// MÉTODOS DE CONTAS
// =========================================================================

// Busca conta por nome
export async function findAccountByName(accountName: string) {
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT * FROM accounts WHERE LOWER(name) = LOWER(${accountName}) LIMIT 1`;
    return rows[0] || null;
  }

  // Fallback se ainda não conectou o banco na Vercel
  const found = memoryAccounts.find((acc) => acc.name.toLowerCase() === accountName.toLowerCase());
  return found || null;
}

// Busca conta por e-mail
export async function findAccountByEmail(email: string) {
  if (!email) return null;
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT * FROM accounts WHERE LOWER(email) = LOWER(${email}) LIMIT 1`;
    return rows[0] || null;
  }

  const found = memoryAccounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase());
  return found || null;
}

// Cria uma nova conta (sem personagens ainda) com telefone, código de indicação e código de verificação
export async function createAccount(data: {
  account: string;
  email: string;
  password: string;
  phone?: string;
  referralCode?: string;
  verificationCode?: string;
}) {
  const sql = getSqlClient();
  const hashedPassword = hashPassword(data.password);
  const code = data.verificationCode || Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

  if (sql) {
    await ensureTablesExist();
    const result = await sql`
      INSERT INTO accounts (name, password, email, phone, referral_code, email_verified, verification_code, verification_code_expires, premdays)
      VALUES (${data.account}, ${hashedPassword}, ${data.email || ""}, ${data.phone || ""}, ${data.referralCode || ""}, FALSE, ${code}, ${expiresAt.toISOString()}, 3)
      RETURNING id, name, email, phone, referral_code, email_verified, verification_code, premdays, created_at;
    `;
    return result[0];
  }

  // Salva na memória local enquanto o usuário ativa o banco na Vercel
  const newAccount: MemoryAccount = {
    id: memoryAccounts.length + 1,
    name: data.account,
    password: hashedPassword,
    email: data.email || "",
    phone: data.phone || "",
    referral_code: data.referralCode || "",
    email_verified: false,
    verification_code: code,
    verification_code_expires: expiresAt.toISOString(),
    premdays: 3,
    created_at: new Date().toISOString(),
  };
  memoryAccounts.push(newAccount);
  return newAccount;
}

// Verifica o código de 6 dígitos enviado por e-mail
export async function verifyAccountCode(accountName: string, code: string): Promise<{ success: boolean; message: string }> {
  const cleanCode = code.trim();
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT * FROM accounts WHERE LOWER(name) = LOWER(${accountName}) LIMIT 1`;
    const acc = rows[0];
    if (!acc) return { success: false, message: "Conta não encontrada." };

    if (acc.email_verified) {
      return { success: true, message: "Este e-mail já está confirmado! Você já pode entrar." };
    }

    if (acc.verification_code !== cleanCode) {
      return { success: false, message: "Código de confirmação incorreto. Verifique sua caixa de entrada ou spam." };
    }

    if (acc.verification_code_expires && new Date() > new Date(acc.verification_code_expires)) {
      return { success: false, message: "Este código expirou. Clique em 'Reenviar Código' para receber um novo." };
    }

    // Marca como verificado e limpa o código
    await sql`
      UPDATE accounts 
      SET email_verified = TRUE, verification_code = NULL, verification_code_expires = NULL 
      WHERE id = ${acc.id}
    `;
    return { success: true, message: "E-mail confirmado com sucesso! Agora você já pode entrar na sua conta." };
  }

  // Fallback para memória local
  const acc = memoryAccounts.find((a) => a.name.toLowerCase() === accountName.toLowerCase());
  if (!acc) return { success: false, message: "Conta não encontrada." };

  if (acc.email_verified) {
    return { success: true, message: "Este e-mail já está confirmado! Você já pode entrar." };
  }

  if (acc.verification_code !== cleanCode) {
    return { success: false, message: "Código de confirmação incorreto. Verifique sua caixa de entrada ou spam." };
  }

  if (acc.verification_code_expires && new Date() > new Date(acc.verification_code_expires)) {
    return { success: false, message: "Este código expirou. Clique em 'Reenviar Código' para receber um novo." };
  }

  acc.email_verified = true;
  acc.verification_code = undefined;
  acc.verification_code_expires = undefined;
  return { success: true, message: "E-mail confirmado com sucesso! Agora você já pode entrar na sua conta." };
}

// Gera um novo código para reenvio
export async function resendVerificationCode(accountName: string): Promise<{ success: boolean; email?: string; accountName?: string; newCode?: string; message: string }> {
  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT * FROM accounts WHERE LOWER(name) = LOWER(${accountName}) LIMIT 1`;
    const acc = rows[0];
    if (!acc) return { success: false, message: "Conta não encontrada." };
    if (!acc.email) return { success: false, message: "Esta conta não possui e-mail cadastrado." };

    if (acc.email_verified) {
      return { success: false, message: "Sua conta já está confirmada! Não é necessário outro código." };
    }

    await sql`
      UPDATE accounts 
      SET verification_code = ${newCode}, verification_code_expires = ${expiresAt.toISOString()} 
      WHERE id = ${acc.id}
    `;

    return {
      success: true,
      email: acc.email,
      accountName: acc.name,
      newCode,
      message: "Novo código gerado com sucesso.",
    };
  }

  const acc = memoryAccounts.find((a) => a.name.toLowerCase() === accountName.toLowerCase());
  if (!acc) return { success: false, message: "Conta não encontrada." };
  if (!acc.email) return { success: false, message: "Esta conta não possui e-mail cadastrado." };

  if (acc.email_verified) {
    return { success: false, message: "Sua conta já está confirmada! Não é necessário outro código." };
  }

  acc.verification_code = newCode;
  acc.verification_code_expires = expiresAt.toISOString();

  return {
    success: true,
    email: acc.email,
    accountName: acc.name,
    newCode,
    message: "Novo código gerado com sucesso.",
  };
}

// Autentica login
export async function authenticateAccount(accountName: string, plainPassword: string) {
  const account = await findAccountByName(accountName);
  if (!account) return null;

  const hashedPassword = hashPassword(plainPassword);
  if (account.password !== hashedPassword) {
    return null;
  }

  return account;
}

// =========================================================================
// MÉTODOS DE PERSONAGENS (PLAYERS)
// =========================================================================

// Busca personagem por nome (em qualquer conta)
export async function findPlayerByName(playerName: string) {
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT * FROM players WHERE LOWER(name) = LOWER(${playerName}) LIMIT 1`;
    return rows[0] || null;
  }

  const found = memoryPlayers.find((p) => p.name.toLowerCase() === playerName.toLowerCase());
  return found || null;
}

// Busca personagens de uma conta específica
export async function getPlayersByAccountId(accountId: number) {
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const rows = await sql`
      SELECT id, account_id, name, server, pokemon, level, vocation, created_at 
      FROM players 
      WHERE account_id = ${accountId} 
      ORDER BY id DESC
    `;
    return rows;
  }

  return memoryPlayers.filter((p) => p.account_id === accountId);
}

// Cria um novo personagem para uma conta existente
export async function createPlayer(data: {
  accountId: number;
  name: string;
  server: string;
  pokemon: string;
}) {
  const sql = getSqlClient();

  if (sql) {
    await ensureTablesExist();
    const result = await sql`
      INSERT INTO players (account_id, name, server, pokemon, level, vocation)
      VALUES (${data.accountId}, ${data.name}, ${data.server}, ${data.pokemon}, 1, 1)
      RETURNING id, account_id, name, server, pokemon, level, vocation, created_at;
    `;
    return result[0];
  }

  const newPlayer: MemoryPlayer = {
    id: memoryPlayers.length + 1,
    account_id: data.accountId,
    name: data.name,
    server: data.server,
    pokemon: data.pokemon,
    level: 1,
    vocation: 1,
    created_at: new Date().toISOString(),
  };
  memoryPlayers.push(newPlayer);
  return newPlayer;
}
