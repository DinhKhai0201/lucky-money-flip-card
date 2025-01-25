import { makePostRequest } from "./api";

const telegramBotKey = "6944534289:AAEqaWi8yusKoTCjcJx4aTmcx6Irg3LsNHQ";
const chat_id = '-4100329715';

export const sendNotification = async (text) => {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${text}`;
    await makePostRequest(endpoint,
        {
        });
};