import { makePostRequest } from "./api";

const telegramBotKey = "7574243925:AAGqDzn_Gq8pV6NDqkZCiCbRLNfB0BbrbOo";
const chat_id = '-4637934528';

export const sendNotification = async (text) => {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${text}`;
    await makePostRequest(endpoint,
        {
        });
};