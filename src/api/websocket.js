const express = require('express');
const { GetUsers } = require('../../lib/controlpanel_api');
const { log } = require('../../lib/logger');

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'CoinClicker_Websocket';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const router = express.Router();

router.ws('/', (ws, req) => {
    const { email } = req.query
    ws.send('something');
    ws.on('message', function (msg) {
        ws.send(msg);
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