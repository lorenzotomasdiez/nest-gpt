import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import * as path from "path";
import * as fs from 'fs';
import { audioToTextUseCase, generateImageVariationUseCase, imageGenerationUseCase, orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase, textToAudioUseCase, translateStreamUseCase } from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import { ImageGenerationDto, ImageVariationDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase({
      openai: this.openai,
      prompt: orthographyDto.prompt
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase({
      openai: this.openai,
      prompt
    })
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase({
      openai: this.openai,
      prompt
    })
  }

  async translateStream({ prompt, lang }: TranslateDto) {
    return await translateStreamUseCase({
      openai: this.openai,
      prompt,
      lang
    })
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase({
      openai: this.openai,
      prompt,
      voice
    })
  }

  async getTextToAudio(id: string) {
    const filePath = path.resolve(__dirname, "../../generated/audios/", `${id}.mp3`);

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException("Audio not found");

    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, prompt?: string) {
    return await audioToTextUseCase({
      openai: this.openai,
      prompt,
      file: audioFile
    })
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase({
      openai: this.openai,
      prompt: imageGenerationDto.prompt,
      originalImage: imageGenerationDto.originalImage,
      maskImage: imageGenerationDto.maskImage
    })
  }

  async getImageGeneration(fileName: string) {
    const filePath = path.resolve("./", "./generated/images/", fileName);
    const exists = fs.existsSync(filePath);
    if (!exists) throw new NotFoundException("Image not found");
    return filePath;
  }

  async generateImageVariation(imageVariationDto: ImageVariationDto) {
    return await generateImageVariationUseCase({
      openai: this.openai,
      baseImage: imageVariationDto.baseImage,
    })
  }
}