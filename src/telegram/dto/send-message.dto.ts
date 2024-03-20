import { IsOptional, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  chatId?: string;
}
