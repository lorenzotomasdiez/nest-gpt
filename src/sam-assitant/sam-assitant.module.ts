import { Module } from '@nestjs/common';
import { SamAssitantService } from './sam-assitant.service';
import { SamAssitantController } from './sam-assitant.controller';

@Module({
  controllers: [SamAssitantController],
  providers: [SamAssitantService],
})
export class SamAssitantModule {}
