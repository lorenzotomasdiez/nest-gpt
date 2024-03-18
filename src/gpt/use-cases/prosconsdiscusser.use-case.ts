import OpenAI from "openai";

interface Options {
  prompt: string;
  openai: OpenAI;
}

export const prosConsDiscusserUseCase = async ({ prompt, openai }: Options) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          Se te dara una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de estar en formato Markdown.
          Los pros y contras deben estar en una lista
        `
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    max_tokens: 500,
  });

  return completion.choices[0].message;
}


export const prosConsDiscusserStreamUseCase = async ({ prompt, openai }: Options) => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          Se te dara una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de estar en formato Markdown.
          Los pros y contras deben estar en una lista
        `
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
