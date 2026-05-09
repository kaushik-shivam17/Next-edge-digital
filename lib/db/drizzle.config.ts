import { defineConfig } from "drizzle-kit";
import path from "path";

function sanitizeConnectionString(url: string): string {
  const withoutProto = url.replace(/^postgresql:\/\/|^postgres:\/\//, "");
  const lastAt = withoutProto.lastIndexOf("@");
  const credentials = withoutProto.slice(0, lastAt);
  const hostpart = withoutProto.slice(lastAt + 1);
  const colonIdx = credentials.indexOf(":");
  const user = credentials.slice(0, colonIdx);
  const password = credentials.slice(colonIdx + 1);
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${hostpart}`;
}

const raw = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!raw) {
  throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL must be set");
}

const isSupabase = raw.includes("supabase.co");
const sanitized = isSupabase ? sanitizeConnectionString(raw) : raw;
const url = isSupabase ? `${sanitized}${sanitized.includes("?") ? "&" : "?"}sslmode=no-verify` : sanitized;

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: { url },
});
