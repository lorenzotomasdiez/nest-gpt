import { SendMessageDTO } from '../dto';

export const sendMessageUseCase = async ({
  message,
  chatId,
}: SendMessageDTO) => {
  const { TELEGRAM_KEY, TELEGRAM_CHAT_ID } = process.env;

  const destinatary = chatId || TELEGRAM_CHAT_ID;

  const sendMessage = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_KEY}/sendMessage?chat_id=${destinatary}&text=${message}`,
  );
  const response = await sendMessage.json();

  return response;
};
