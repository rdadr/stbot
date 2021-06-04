const TelegramBot = require('node-telegram-bot-api')
// const TelegramApi = require('node-telegram-bot-api')

//keyboard
const{ratingOptions, againgOptions, exitOptions} = require('./options')

const token = '1724675577:AAErbQ3MM97t-b6439YXyrIPjmkbruA0LGI'
const bot = new TelegramBot(token, {polling: true})

//DataBase
const chats = {}



const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Вітання'},
        {command: '/rating', description: 'Оцінка'},
        {command: '/exit', description: 'Вихід'},

    ])
    
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text=== '/start'){
            await bot.sendSticker(chatId, `./stickers/4.webp`);
            return bot.sendMessage(chatId, `Я Star-IT бот. Радий Вас вітати! ${msg.from.first_name} ${msg.from.last_name}`)
    };

    //exit
    if(text=== '/exit'){
        await bot.sendSticker(chatId, `./stickers/38.webp`);
        return bot.sendMessage(chatId, `До побачення! ${msg.from.first_name} ${msg.from.last_name}`)
};

    //rating
        if(text=== '/rating'){
        return startRating(chatId);
        }

    //Не понимаю, что это значит, не кошерно
    // return bot.sendMessage(chatId, `Не понимаю, что это значит`);
    return bot.sendSticker(chatId, `./stickers/7.webp`);
    })

    const startRating = async (chatId) =>{
        await bot.sendMessage(chatId, `Готель \"ДНІПРО\"`);
        await bot.sendMessage(chatId, `Оцініть якість обслуговування від 0 до 5`, ratingOptions);
    }
    const startExit = async (chatId) =>{
        await bot.sendMessage(chatId, `Заходьте ще!`);
        await bot.sendSticker(chatId, `./stickers/36.webp`);

    }
    
     //rating 2
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data==='/again'){
            return startRating(chatId);
        }else{
                if (data==='/exit'){
        return startExit(chatId);
            }
        }
        // console.log(msg)

    bot.sendMessage(chatId, `Ваша оцінка ${data}`);

    return await bot.sendMessage (chatId, `Дякую`, exitOptions);
    })
}

start()