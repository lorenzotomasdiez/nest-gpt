import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { SamAssitantModule } from './sam-assitant/sam-assitant.module';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    GptModule,
    SamAssitantModule,
    TelegramModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
