import OpenAI from "openai";

interface Options {
  threadId: string;
  assistanceId?: string;
}

export const createRunUseCase = async (openAI: OpenAI, options: Options) => {
  const { threadId, assistanceId = process.env.SAM_ASSISTANT_KEY } = options;

  const run = await openAI.beta.threads.runs.create(threadId, {
    assistant_id: assistanceId,
    //instructions OVERWRITE THE ASSITANCE 
  });

  return run;
}