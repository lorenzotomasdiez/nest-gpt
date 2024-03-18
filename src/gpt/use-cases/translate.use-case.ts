import OpenAI from "openai";

interface Options {
  prompt: string;
  lang: string;
  openai: OpenAI;
}

export const translateStreamUseCase = async ({ prompt, openai, lang }: Options) => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    max_tokens: 500,
    stream: true
  });
}
