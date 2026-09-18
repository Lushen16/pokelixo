import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import crypto from "crypto";

// URL do Banco de Dados na Vercel (gerada automaticamente pelo Neon / Vercel Storage)
const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;

// Memória local de contingência (caso o banco ainda não tenha sido conectado na Vercel)
interface MemoryAccount {
  id: number;
  name: string;
  password: string;
  email: string;
  server: string;
  starter: string;
  premdays: number;
  created_at: string;
}

const memoryAccounts: MemoryAccount[] = [
  {
    id: 1,
    name: "admin",
    password: hashPassword("admin"),
    email: "admin@poketibia.com",
    server: "valaria",
    starter: "Charizard",
    premdays: 30,
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
    // Tabela de Contas (padrão PokéTibia / TFS)
    await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        server VARCHAR(32) DEFAULT 'valaria',
        starter VARCHAR(32),
        premdays INT DEFAULT 3,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Tabela de Personagens
    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
        name VARCHAR(32) UNIQUE NOT NULL,
        level INT DEFAULT 1,
        vocation INT DEFAULT 1,
        pokemon VARCHAR(64) DEFAULT 'Charmander',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
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
// MÉTODOS DE BANCO DE DADOS (COM SUPORTE A NUVEM VERCEL E MEMÓRIA LOCAL)
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

// Cria uma nova conta
export async function createAccount(data: {
  account: string;
  email: string;
  password: string;
  server: string;
  starter: string;
}) {
  const sql = getSqlClient();
  const hashedPassword = hashPassword(data.password);

  if (sql) {
    await ensureTablesExist();
    const result = await sql`
      INSERT INTO accounts (name, password, email, server, starter, premdays)
      VALUES (${data.account}, ${hashedPassword}, ${data.email || ""}, ${data.server}, ${data.starter}, 3)
      RETURNING id, name, email, server, starter, premdays;
    `;
    const createdAcc = result[0];

    // Cria o personagem inicial na tabela players
    try {
      await sql`
        INSERT INTO players (account_id, name, level, vocation, pokemon)
        VALUES (${createdAcc.id}, ${data.account}, 1, 1, ${data.starter})
        ON CONFLICT DO NOTHING;
      `;
    } catch (e) {
      console.warn("Aviso ao criar player inicial:", e);
    }

    return createdAcc;
  }

  // Salva na memória local enquanto o usuário ativa o banco na Vercel
  const newAccount: MemoryAccount = {
    id: memoryAccounts.length + 1,
    name: data.account,
    password: hashedPassword,
    email: data.email || "",
    server: data.server,
    starter: data.starter,
    premdays: 3,
    created_at: new Date().toISOString(),
  };
  memoryAccounts.push(newAccount);
  return newAccount;
}

// Busca personagens de uma conta
export async function getPlayersByAccountId(accountId: number) {
  const sql = getSqlClient();
  if (sql) {
    await ensureTablesExist();
    const rows = await sql`SELECT id, name, level, vocation, pokemon FROM players WHERE account_id = ${accountId}`;
    return rows;
  }
  return [];
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

