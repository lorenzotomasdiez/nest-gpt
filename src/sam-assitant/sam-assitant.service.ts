import { Injectable } from '@nestjs/common';
import { checkStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessagesUseCase } from './use-cases';
import OpenAI from 'openai';
import { QuestionDto } from './dtos';

@Injectable()
export class SamAssitantService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    await createMessageUseCase(this.openai, {
      threadId: questionDto.threadId,
      question: questionDto.question
    });

    const run = await createRunUseCase(this.openai, { threadId: questionDto.threadId });

    await checkStatusUseCase(this.openai, { threadId: questionDto.threadId, runId: run.id });

    const messages = await getMessagesUseCase(this.openai, { threadId: questionDto.threadId });

    return messages;
  }
}
