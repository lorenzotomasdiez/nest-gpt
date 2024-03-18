import OpenAI from "openai";
import * as fs from 'fs';
import * as path from 'path';
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";

interface Options {
  openai: OpenAI;
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async ({ openai, prompt, originalImage, maskImage }: Options) => {
  if (!originalImage || !maskImage) {
    const result = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: '1024x1024',
      quality: "standard",
      response_format: "url",
    });

    const fileName = await downloadImageAsPng(result.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`

    return {
      url: url,
      openAiPath: result.data[0].url,
      revised_prompt: result.data[0].revised_prompt,
    }
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);

  const maskImagePath = await downloadBase64ImageAsPng(maskImage, true);

  const result = await openai.images.edit({
    prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskImagePath),
    model: "dall-e-2",
    n: 1,
    size: '1024x1024',
    response_format: "url",
  });

  const fileName = await downloadImageAsPng(result.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`

  return {
    url: url,
    openAiPath: result.data[0].url,
    revised_prompt: result.data[0].revised_prompt,
  }
}