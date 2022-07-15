const express = require('express');
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent');
const Joi = require('joi');
const { GetUsers } = require('../../lib/controlpanel_api');
const { log } = require('../../lib/logger');

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'CoinClicker_User';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10
});

const EmailCheck = Joi.object({
    email: Joi.string().email().max(48).required()
});

const router = express.Router();

router.get("/", limiter, async (reg, res, next) => {
    try {
        const values = await EmailCheck.validateAsync(reg.query);
        const users = await GetUsers('email', values.email);

        console.log(users);

        if (users.length === 0) {
            res.status(404).send({
                error: 'User not found'
            });
        } else {
            if (users[0].email === values.email) {
                res.status(200).send({
                    user: true
                });
            } else {
                res.status(200).send({
                    user: false
                });
            }
        }
    } catch (error) {
        log.error(error);
        next(error);
    }
});

module.exports = {
    router: router,
    PluginName: PluginName,
    PluginRequirements: PluginRequirements,
    PluginVersion: PluginVersion,
    PluginAuthor: PluginAuthor,
    PluginDocs: PluginDocs
};