import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TelegramModule } from 'src/telegram/telegram.module';
import { GptModule } from 'src/gpt/gpt.module';

@Module({
  controllers: [],
  providers: [SchedulerService],
  imports: [TelegramModule, GptModule],
})
export class SchedulerModule { }
