const express = require('express');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
//const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const expressWs = require('express-ws');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.set('trust proxy', Number(process.env.BehindProxy || 0)); // If Behind PROXY

expressWs(app);

//app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE],
        'style-src': [SELF, INLINE],
        'img-src': [SELF, INLINE],
        'worker-src': [NONE],
        'connect-src': [SELF, INLINE],
        'block-all-mixed-content': true
    }
}));

app.use(bodyParser.urlencoded({ extended: false }))

//Load index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www-public', 'index.html'));
});

app.use('/style', express.static(path.join(__dirname, '..', 'www-public', 'style')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'www-public', 'scripts')));

//Load APIs
app.use('/api/application', api)

//Load error handling middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;