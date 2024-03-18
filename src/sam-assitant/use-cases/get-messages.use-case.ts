import OpenAI from "openai";

interface Options {
  threadId: string;
}

export const getMessagesUseCase = async (openAI: OpenAI, options: Options) => {
  const { threadId } = options;

  const messages = await openAI.beta.threads.messages.list(threadId);

  return messages.data.map((message) => ({
    role: message.role,
    content: message.content.map((content) => (content as any).text.value),
    id: message.id,
  }));
}