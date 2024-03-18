import OpenAI from "openai";
import * as fs from 'fs';
import { downloadImageAsPng } from "src/helpers";

interface Options {
  openai: OpenAI;
  baseImage: string;
}

export const generateImageVariationUseCase = async ({ openai, baseImage }: Options) => {
  const pngImagePath = await downloadImageAsPng(baseImage, true);

  const response = await openai.images.createVariation({
    model: "dall-e-2",
    image: fs.createReadStream(pngImagePath),
    n: 1,
    size: "1024x1024",
    response_format: "url"
  });

  const newImage = await downloadImageAsPng(response.data[0].url);

  const url = `${process.env.SERVER_URL}/gpt/image-generation/${newImage}`

  return {
    url: url,
    openaiUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  }
}