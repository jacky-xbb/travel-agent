import OpenAI from "openai";


const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openAIUrl = import.meta.env.VITE_OPENAI_BASE_URL;

export const client = new OpenAI({
  apiKey: openAIApiKey,
  baseURL: openAIUrl,
  dangerouslyAllowBrowser: true,
});
