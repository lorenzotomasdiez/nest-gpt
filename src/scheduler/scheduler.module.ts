import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Module({
  controllers: [],
  providers: [SchedulerService],
})
export class SchedulerModule {}
