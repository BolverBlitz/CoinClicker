# CoinClicker
 A playground to learn websockets with a loadbalancer  

# Common Issues
 If you run the application without https, you will need to modify the websocket url in the frontend from wss to ws in file www-public/index.html.  

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
This repo comes with 2 ways to deploy it, you can choose one of them:  
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

Pictures:
![grafik](https://user-images.githubusercontent.com/35345288/179521905-70d4c59b-6c68-4045-861e-69f895a4f708.png)

