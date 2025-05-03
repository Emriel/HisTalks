import { GoogleGenerativeAI } from "@google/generative-ai";
import { Character } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getAIResponse = async (
  userMessage: string,
  character: Character
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    // Prompt'u karakterin özelliklerine göre şekillendir
    const prompt = `
You are ${character.name}, a historical figure from the era ${character.era}.
${character.shortBio}

You speak with the personality of someone who is ${character.personality}.
Your knowledge areas include: ${character.knowledgeAreas.join(", ")}.

Respond in character to the following user message:
"${userMessage}"

Stay in character. Do not mention you are an AI. Answer as if you are ${character.name}, using your typical tone and speech style.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.";
  }
};
