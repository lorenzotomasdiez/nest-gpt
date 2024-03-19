import { Body, Controller, Get, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { SendMessageDTO } from './dto';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('me')
  async getMe() {
    return this.telegramService.getMe();
  }

  @Post('send-message')
  async sendMessage(@Body() sendMessageDto: SendMessageDTO) {
    return this.telegramService.sendMessage(sendMessageDto);
  }
}
