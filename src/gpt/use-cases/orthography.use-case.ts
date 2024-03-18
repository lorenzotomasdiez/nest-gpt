import OpenAI from "openai";

interface Options {
  prompt: string;
  openai: OpenAI;
}

export const orthographyCheckUseCase = async ({ prompt, openai }: Options) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          Te seran proveidos textos en espa;ol gramaticales con posibles errores ortograficos y gramaticales.
          Las palabras usadas deben de existir en el diccionario de la RAE.
          Debes de responder en formato JSON,
          tu tarea es corregirlos y retornar informacion soluciones,
          tambien debes de dar un porcentaje de acierto por el usuario.

          Si no hay errores, debes de retornar un mensaje de felicitaciones
          Ejemplos de salida:
          {
            userScore: number;
            errors: string[]; //['error -> solucion']
            message: string; //Usa este campo para felicitar al usuario si no hay errores
          }
        `
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo-1106",
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: "json_object"
    }
  });


  const jsonResponse = JSON.parse(completion.choices[0].message.content);

  return jsonResponse;
}