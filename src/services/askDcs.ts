/** Security hold: never send an LLM provider API key from this public static client. */
export async function askDcs(_question: string, _kbSnippets: string[]): Promise<string> {
  return 'AI chat is temporarily unavailable while a secure server-side integration is being configured. Please use the DCS knowledge base in the meantime.';
}
