import mysql from "mysql2/promise";
import crypto from "crypto";

// Configurações do Banco de Dados MySQL (TFS / PokéTibia)
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "poketibia";
const DB_HASH_TYPE = process.env.DB_HASH_TYPE || "sha1"; // "sha1" (padrão TFS) ou "plain"

// Pool de conexões otimizado para ambientes Serverless (como Vercel)
let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 8000,
    });
  }
  return pool;
}

// Executa uma consulta SQL com parâmetros seguros
export async function executeQuery<T = mysql.RowDataPacket[]>(
  sql: string,
  params: (string | number | boolean | null)[] = []
): Promise<T> {
  const p = getDbPool();
  const [rows] = await p.execute(sql, params);
  return rows as T;
}

// Criptografa a senha no formato esperado pelo TFS / OTX
export function hashPassword(password: string): string {
  if (DB_HASH_TYPE.toLowerCase() === "sha1") {
    return crypto.createHash("sha1").update(password).digest("hex");
  }
  return password; // caso o servidor use plain text
}

// Testa se a conexão com o MySQL está ativa
export async function testDbConnection(): Promise<{ connected: boolean; error?: string }> {
  try {
    const p = getDbPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    return { connected: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Não foi possível conectar ao MySQL do servidor.";
    return {
      connected: false,
      error: errorMessage,
    };
  }
}
