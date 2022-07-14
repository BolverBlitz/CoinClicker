const express = require('express');
const fs = require('fs');
const { log } = require('../../lib/logger');
const router = express.Router();

var plugins = [];
var Preplugins = [];
var iimport;

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

fs.readdir("./src/api", function (err, filenames) {
    filenames.remove('index.js');
    for (i = 0; i < filenames.length; i++) {
        if (filenames[i].startsWith("disabled.")) {

        } else if (filenames[i].endsWith(".js")) {
            let name = filenames[i].slice(0, filenames[i].length - 3)
            iimport = require(`./${name}`);
            Preplugins.push(`${iimport.PluginName}|${iimport.PluginVersion}`)
        } else {

        }
    }
});

/* Load in all the plugins */
fs.readdir("./src/api", function (err, filenames) {
    filenames.remove('index.js');
    for (i = 0; i < filenames.length; i++) {
        if (filenames[i].startsWith("disabled.")) {
            log.warning(`Skipped API Plugin ${filenames[i].slice(9, filenames[i].length - 3)} because its disabled`);
        } else if (filenames[i].endsWith(".js")) {
            let PluginRequirementsFailed = false;
            let name = filenames[i].slice(0, filenames[i].length - 3)
            iimport = require(`./${name}`);
            if (typeof (iimport.PluginRequirements) === "undefined" || typeof (iimport.PluginName) === "undefined" || typeof (iimport.PluginVersion) === "undefined" || typeof (iimport.PluginAuthor) === "undefined" || typeof (iimport.PluginDocs) === "undefined" || typeof (iimport.router) === "undefined") {
                log.error(`Skipped API Plugin ${filenames[i].slice(0, filenames[i].length - 3)} because there are missing exports!`);
            } else {
                iimport.PluginRequirements.map(Req => {
                    if (!Preplugins.includes(Req)) { PluginRequirementsFailed = true }
                });

                if (!PluginRequirementsFailed) {
                    plugins.push({ route: `/${name}`, name: iimport.PluginName, version: iimport.PluginVersion, author: iimport.PluginAuthor, docs: iimport.PluginDocs })
                    router.use(`/${name}`, iimport.router);
                    log.system(`Loaded API Plugin ${filenames[i].slice(0, filenames[i].length - 3)}`);
                } else {
                    log.error(`API Plugin ${filenames[i].slice(0, filenames[i].length - 3)}} requires following plugins [${iimport.PluginRequirements}] and at least one is missing!`);
                }
            }
        } else {
            log.error(`Unknown file was skipped ${filenames[i]}`);
        }
    }
})

router.get('/', (req, res) => {
    res.json({
        message: 'API_MSHC - List of all loaded Routs',
        plugins: plugins
    });
});


module.exports = router;