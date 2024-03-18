import OpenAI from "openai";
import * as path from "path";
import * as fs from "fs";

interface Options {
  prompt?: string;
  openai: OpenAI;
  file: Express.Multer.File;
}

export const audioToTextUseCase = async ({ prompt, openai, file }: Options) => {
  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: fs.createReadStream(file.path),
    prompt: prompt,
    language: "es",
    response_format: "verbose_json"
  })

  return response;
}