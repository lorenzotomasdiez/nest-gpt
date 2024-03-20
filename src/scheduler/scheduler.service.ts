import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { GptService } from 'src/gpt/gpt.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    private readonly telegramService: TelegramService,
    private readonly gptService: GptService
  ) { }

  @Cron('00 12 * * *') // Run every day at 12:00
  runLunchTimeCron() {
    this.logger.debug('Called RUN LUNCH TIME CRON');
    this.telegramService.sendMessage({ message: "It's lunch time! 🍔🍟🍕🥪🥗🍱🍣🍜🍲🍛🍝🍠🍞🍩🍮" });
  }

  @Cron('30 15 * * *') // Run every day at 18:00
  runTeaTimeCron() {
    this.logger.debug('Called RUN TEA TIME CRON');
    this.telegramService.sendMessage({ message: "It's tea time! 🍵🍶🍼🥤🧃🧉🍷🍸🍹🍺🍻🥂🥃🍾" });
  }

  @Cron('00 18 * * *') // Run every day at 18:00
  runDinnerTimeCron() {
    this.logger.debug('Called RUN HALF-DINNER TIME CRON');
    this.telegramService.sendMessage({ message: "It's dinner time! 🍔🍟🍕🥪🥗🍱🍣🍜🍲🍛🍝🍠🍞🍩🍮" });
  }

  @Cron('30 19 * * *') // Run every day at 19:30
  runGoodNightCron() {
    this.logger.debug('Called DINNER NIGHT CRON');
    this.telegramService.sendMessage({ message: "It's dinner time! 🍔🍟🍕🥪🥗🍱🍣🍜🍲🍛🍝🍠🍞🍩🍮" });
  }

  @Cron('00 05 * * *') // Run every day at 05:00
  async runGoodMorningCron() {
    this.logger.debug('Called RUN GOOD MORNING CRON');
    const message = await this.gptService.generateWakeUpMesage();
    this.telegramService.sendMessage({ message });
  }
}
