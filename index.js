const TelegramApi = require('node-telegram-bot-api')

//keyboard
const{ratingOptions, againgOptions} = require('./options')

const token = '1724675577:AAErbQ3MM97t-b6439YXyrIPjmkbruA0LGI'

const bot = new TelegramApi(token, {polling: true})

//DataBase
const chats = {}


const startRating = async (chatId) =>{
    await bot.sendMessage(chatId, `Готель \"ДНІПРО\"`);
const randomNumber = Math.floor(Math.random()*5)
chats[chatId]=randomNumber;
await bot.sendMessage(chatId, `Оцініть якість обслуговування від 0 до 5`, ratingOptions);

}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Вітання'},
        {command: '/rating', description: 'Оцінка'},
    ])
    
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text=== '/start'){
            await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/09d/4f5/09d4f569-894b-3f75-a860-698ed407a581/4.webp`);
            return bot.sendMessage(chatId, `Я Star-IT бот. Радий Вас вітати! ${msg.from.first_name} ${msg.from.last_name}`)
    };

    //rating
        if(text=== '/rating'){
        return startRating(chatId);
        }
    //Не понимаю, что это значит, не кошерно
    // return bot.sendMessage(chatId, `Не понимаю, что это значит`);
    return bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/09d/4f5/09d4f569-894b-3f75-a860-698ed407a581/7.webp`);
    })

     //game2
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data==='/again'){
            return startRating(chatId);
        }
        if (data===chats[chatId]){
            return await bot.sendMessage (chatId, `Щиро дякую ${chats[chatId]}`, againgOptions);
        } else {
            return await bot.sendMessage (chatId, `Дякую ${chats[chatId]}`, againgOptions);
        }
    // bot.sendMessage(chatId, `Ваш выбор ${data}`);
        // console.log(msg)
    })
}

start()