import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  @Interval(10000)
  async schedule() {
    this.logger.debug('Called when the current second is 45');
    console.log('alohaaa');
  }
}
