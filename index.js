require('dotenv').config();

const port = process.env.PORT || 8000;
//This timeout is used to delay accepting connections until the server is fully loaded. 
//It could come to a crash if a request comes in before the settings cache was fully laoded.

setTimeout(() => {
  const app = require('./src/app');
  const { log } = require('./lib/logger');
  setTimeout(() => {
    if (process.env.ExtraErrorWebDelay > 0) {
      log.system(`Webserver was delayed by ${process.env.ExtraErrorWebDelay || 500}ms beause of a error.`);
    }
    app.listen(port, () => {
      log.system(`Server started on port ${port}`);
    });
  }, process.env.ExtraErrorWebDelay || 500);
}, process.env.GlobalWaitTime || 100);