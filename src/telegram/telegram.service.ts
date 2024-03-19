import { Injectable } from '@nestjs/common';
import { getMeUseCase, sendMessageUseCase } from './use-cases';
import { SendMessageDTO } from './dto';

@Injectable()
export class TelegramService {
  async getMe() {
    return await getMeUseCase();
  }

  async sendMessage(sendMessageDto: SendMessageDTO) {
    return await sendMessageUseCase(sendMessageDto);
  }
}
