export type AskDcsOptions = {
  question: string;
  kbContext?: string;
};

/**
 * Security hold: this static GitHub Pages app cannot safely hold an LLM API key.
 * Restore AI only after deploying an authenticated, rate-limited server-side proxy.
 * Do not introduce VITE_* secrets or browser Authorization headers.
 */
export async function askDcsLLM(_opts: AskDcsOptions, _userId?: string): Promise<string> {
  return 'AI chat is temporarily unavailable while a secure server-side integration is being configured. Please use the DCS knowledge base in the meantime.';
}
