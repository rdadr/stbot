    //keyboard rating
module.exports={
 ratingOptions : {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '0', callback_data: '0'}, {text: '1', callback_data: '1'}, {text: '2', callback_data: '2'},  {text: '3', callback_data: '3'}, {text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}],
        ]
    })
},


//again
 againgOptions : {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Повторити?', callback_data: `/again`}],
        ]
    })
},

exitOptions : {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Вихід', callback_data: `/exit`}],
        ]
    })
}

}