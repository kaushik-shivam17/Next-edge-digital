import OpenAI from "openai";

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

  if (!apiKey) {
    throw new Error(
      "No OpenAI API key found. Set OPENAI_API_KEY in your secrets.",
    );
  }

  if (!_client) {
    _client = new OpenAI({
      apiKey,
      ...(baseURL ? { baseURL } : {}),
    });
  }
  return _client;
}

export const openai = new Proxy({} as OpenAI, {
  get(_target, prop) {
    return (getClient() as any)[prop];
  },
});
