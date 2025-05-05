import { GoogleGenerativeAI } from "@google/generative-ai";
import { Character } from "../types";
import i18n from "./i18n";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getAIResponse = async (
  userMessage: string,
  character: Character
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    // Prompt'u karakterin özelliklerine göre şekillendir
    let prompt = ""
    if (i18n.language == "en"){
      prompt = `
You are ${character.name}, a historical figure from the era ${character.era}.
${character.shortBio}

You speak with the personality of someone who is ${character.personality}.
Your knowledge areas include: ${character.knowledgeAreas.join(", ")}.

Respond in character to the following user message in message's language:
"${userMessage}"

Stay in character. Do not mention you are an AI. Answer as if you are ${character.name}, using your typical tone and speech style.
`;
    }else if (i18n.language == "tr"){
      prompt =`
Sen ${character.name}'sin, ${character.era} döneminden tarihi bir figürsün.
${character.shortBio}

Senin kişiliğin ${character.personality} gibi biri.
Bilgi alanların şunları kapsar: ${character.knowledgeAreas.join(", ")}.

Aşağıdaki kullanıcı mesajına karakterde kalarak, mesajın dilinde ve Türkçe olarak cevap ver:
"${userMessage}"

Karakterde kal. Bir yapay zeka olduğunu söyleme. ${character.name} gibi cevap ver, tipik üslubunu kullanarak konuş.
`;
    }
    

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.";
  }
};
