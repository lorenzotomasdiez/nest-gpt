import OpenAI from "openai";

interface Options {
  threadId: string;
  runId: string;
}

export const checkStatusUseCase = async (openAI: OpenAI, options: Options) => {
  const { threadId, runId } = options;

  const status = await openAI.beta.threads.runs.retrieve(threadId, runId);

  if (status.status === "completed") {
    return status;
  }

  // Esperar un segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkStatusUseCase(openAI, options);
}