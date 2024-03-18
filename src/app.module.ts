import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { SamAssitantModule } from './sam-assitant/sam-assitant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    SamAssitantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
