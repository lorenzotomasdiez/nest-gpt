import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GptModule } from './gpt/gpt.module';
import { SamAssitantModule } from './sam-assitant/sam-assitant.module';
import { TelegramModule } from './telegram/telegram.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    GptModule,
    SamAssitantModule,
    TelegramModule,
    SchedulerModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
