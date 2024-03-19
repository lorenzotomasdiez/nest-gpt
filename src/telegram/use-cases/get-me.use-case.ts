export const getMeUseCase = async () => {
  const { TELEGRAM_KEY, TELEGRAM_CHAT_ID } = process.env;
  console.log(TELEGRAM_KEY, TELEGRAM_CHAT_ID);
  const getMe = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_KEY}/getMe`,
  );
  const response = await getMe.json();

  return response;
};
