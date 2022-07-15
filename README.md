# CoinClicker
 A playground to learn websockets with a loadbalancer  

# What does it do?
Users can enter their email adress they use for controlpanel and then click a button to get free coins (Credits).  

# Settings
BehindProxy - If you are behind a proxy, you can set it to 1.  
Clicks_Per_Coin - How often the user needs to click to get a coin.  
Max_Coins_Per_Day_Per_User - How many coins the user can get per day.  
click_timeout -  How fast the user can click the button (in ms).  

# Log Level
LogLevel - The log level of the application. 
3 = Everything
2 = Warnings and Errors
1 = Errors only

# Setup
## PM2
First, rename ecosystem.config.js.example to ecosystem.config.js.  
Then edit the env variables in the file.  
You can setup the application by running the following commands:  
```bash
npm install
npm install -g pm2
pm2 start ecosystem.config.js
```

## NodeJS
First, rename .env.example to .env.  
Then edit the env variables in the file.
You can setup the application by running the following commands:  
```bash
npm install
node index.js
```