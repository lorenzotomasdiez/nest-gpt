import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @Post("orthography-check")
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post("pros-cons-discusser")
  prosConsDiscusser(
    @Body() prosConsDiscusserDTO: ProsConsDiscusserDto
  ) {
    return this.gptService.prosConsDiscusser(prosConsDiscusserDTO);
  }

  @Post("pros-cons-discusser-stream")
  async prosConsDiscusserStream(
    @Body() prosConsDiscusserDTO: ProsConsDiscusserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDiscusserDTO);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || "";
      res.write(piece);
    }
    res.end()
  }

  @Post("translate")
  async translate(
    @Body() translateDto: TranslateDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.translateStream(translateDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || "";
      res.write(piece);
    }
    res.end()
  }

  @Post("text-to-audio")
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get("text-to-audio/:id")
  async getTextToAudio(
    @Param("id") id: string,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.getTextToAudio(id);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post("audio-to-text")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./generated/uploads",
        filename: (req, file, cb) => {
          const extension = file.originalname.split(".").pop();
          return cb(null, `${new Date().getTime()}.${extension}`);
        }
      })
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: "File too large" }),
          new FileTypeValidator({ fileType: "audio/*" })
        ]
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto
  ) {
    return this.gptService.audioToText(file, audioToTextDto.prompt);
  }

  @Post("image-generation")
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto
  ) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }

  @Get("image-generation/:id")
  async getImageGeneration(
    @Param("id") id: string,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.getImageGeneration(id);
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('image-variation')
  async imageVariation(
    @Body() imageVariationDto: ImageVariationDto
  ) {
    return await this.gptService.generateImageVariation(imageVariationDto);
  }
}
