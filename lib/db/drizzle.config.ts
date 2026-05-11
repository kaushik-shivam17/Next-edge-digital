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

const raw = process.env.DATABASE_URL;

if (!raw) {
  throw new Error("DATABASE_URL must be set");
}

const url = raw;

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: { url },
});
