import { Body, Controller, Post } from '@nestjs/common';
import { SamAssitantService } from './sam-assitant.service';
import { QuestionDto } from './dtos';

@Controller('sam-assitant')
export class SamAssitantController {
  constructor(private readonly samAssitantService: SamAssitantService) { }

  @Post("create-thread")
  async createThread() {
    return await this.samAssitantService.createThread();
  }

  @Post("user-question")
  async userQuestion(
    @Body() questionDto: QuestionDto
  ) {
    return await this.samAssitantService.userQuestion(questionDto);
  }
}
