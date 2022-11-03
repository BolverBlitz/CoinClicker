require('dotenv').config();

const port = process.env.PORT || 8000;
//This timeout is used to delay accepting connections until the server is fully loaded. 
//It could come to a crash if a request comes in before the settings cache was fully laoded.

setTimeout(() => {
  const app = require('./src/app');
  const { log } = require('./lib/logger');

  // Default to http for relaive URLs
  if (process.env.controlpanel_url.indexOf('http://') === 0 || process.env.controlpanel_url.indexOf('https://') === 0) {
    log.system('URL Check passed');
  }else{
    process.env.controlpanel_url = 'http://' + process.env.controlpanel_url;
    log.error('Absolute URL fix applied, this will use http as a fallback!');
  }

  // Append a / to the end of the controlpanel url if it dosnt have one
  if (!process.env.controlpanel_url.endsWith('/')) {
    process.env.controlpanel_url = process.env.controlpanel_url + '/';
    log.error('URL fix applied');
  }

  setTimeout(() => {
    if (process.env.ExtraErrorWebDelay > 0) {
      log.system(`Webserver was delayed by ${process.env.ExtraErrorWebDelay || 500}ms beause of a error.`);
    }
    app.listen(port, () => {
      log.system(`Server started on port ${port}`);
    });
  }, process.env.ExtraErrorWebDelay || 500);
}, process.env.GlobalWaitTime || 100);