const express = require('express');
const { GetUsers, IncrementUser } = require('../../lib/controlpanel_api');
const { log } = require('../../lib/logger');
const ButtonCache = require('js-object-cache')

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'CoinClicker_Websocket';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

//This will add pending credits to the user automaticly.
setInterval(() => {
    const Cached_Emails = ButtonCache.keys(); //Get all the emails in the cache
    for (let i = 0; i < Cached_Emails.length; i++) { //Go through all the users
        const Email_User = ButtonCache.get(Cached_Emails[i]); //Get cache data from user
        if (Email_User.new_coins > 0) { //check if a user has pending credits
            GetUsers('email', Cached_Emails[i]).then(users => { //Get the user from the controlpanel
                IncrementUser(users[0].id, Email_User.new_coins, 0).then(updated => {
                    Email_User.coins_today = Email_User.coins_today + Email_User.new_coins; //Set credits today
                    log.info(`Added ${Email_User.new_coins} creadits to ${Cached_Emails[i]}`);
                    Email_User.new_coins = 0; //remove pending credits
                    ButtonCache.set(Cached_Emails[i], Email_User);
                }).catch(error => {
                    log.error("Pending credits addition: " + error);
                });
            }).catch(error => {
                log.error("Getting user from dashboard: " + error);
            });
        }
    }
}, 60000);

const router = express.Router();

router.ws('/', (ws, req) => {
    const { email } = req.query;

    //Send a message to the client to unlock the button and set text
    ws.send(JSON.stringify({
        code: 200, message: 'Connected to CoinClicker Websocket', data: {
            email: email, config: {
                Max_Coins_Per_Day_Per_User: process.env.Max_Coins_Per_Day_Per_User,
                Clicks_Per_Coin: process.env.Clicks_Per_Coin,
                click_timeout: process.env.click_timeout
            }
        }
    }));

    ws.on('message', function (msg) {
        const request = JSON.parse(msg);
        if (request.data.request === 'button_pressed') {
            //Set Cache if user dosnt exist in cache
            if (!ButtonCache.has(email)) {
                ButtonCache.set(email, {
                    coins_today: 0,
                    new_coins: 0,
                    clicks: 0,
                    last_click: new Date().getTime() - process.env.click_timeout,
                    started: new Date().getTime(),
                });
            }

            const Cached_data = ButtonCache.get(email);

            if (new Date().getTime() - Cached_data.started > 24 * 60 * 60 * 1000) {
                //This is true when the first press was more than 24h ago
                //So we reset the time because a new day has started
                Cached_data.started = new Date().getTime();
                Cached_data.coins_today = 0;
                Cached_data.new_coins = 0;
                Cached_data.clicks = 0;
            }

            //Check if the user has passed daily limit
            if (Cached_data.coins_today + Cached_data.new_coins < Number(process.env.Max_Coins_Per_Day_Per_User)) {
                if (new Date().getTime() - Cached_data.last_click >= process.env.click_timeout) { //Check if the button has been clicked recently
                    Cached_data.last_click = new Date().getTime();

                    if (Cached_data.clicks >= process.env.Clicks_Per_Coin - 1) {
                        Cached_data.new_coins++;
                        Cached_data.clicks = 0;
                    } else {
                        Cached_data.clicks++;
                    }

                    ButtonCache.set(email, Cached_data)
                    ws.send(JSON.stringify({ code: 200, message: 'Pressed_Configm', data: { Cached_data } }));
                } else {
                    ws.send(JSON.stringify({ code: 400, message: 'Too_Early', data: { Cached_data } }));
                }
            } else {
                ws.send(JSON.stringify({ code: 400, message: 'Reached_Day_limit', data: { Cached_data } }));
            }
        } else {
            ws.send(JSON.stringify({ code: 500, message: 'Unknown', data: {} }));
        }
    });
});

module.exports = {
    router: router,
    PluginName: PluginName,
    PluginRequirements: PluginRequirements,
    PluginVersion: PluginVersion,
    PluginAuthor: PluginAuthor,
    PluginDocs: PluginDocs
};