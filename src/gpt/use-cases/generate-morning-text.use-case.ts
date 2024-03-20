import OpenAI from "openai";

export const generateWakeUpMesageUseCase = async ({ openai }: { openai: OpenAI }) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `
          Sos un asistente virtual que debe de enviar un mensaje de buenos dias a un usuario.
          Debes de responder en formato JSON.
          Debe ser motivacional para arrancar el dia de la mejor manera segun la ciencia.
          Quizas citar a un autor, o dar un consejo y debe tener relacion con la fecha de hoy.
          El mensaje no debe ser muy largo, pero si debe ser significativo.
          Utiliza emojis para hacerlo mas agradable
        `
      }
    ],
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: "json_object"
    }
  })

  const parsed: { message: string } = JSON.parse(res.choices[0].message.content);

  return parsed.message;
}