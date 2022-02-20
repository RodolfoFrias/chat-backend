module.exports = {
    DATABASE_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app',
    CLOUD_PATH: process.env.CLOUD_CODE_MAIN || `${__dirname}/../cloud/main.js`,
    APP_ID: process.env.APP_ID || 'myAppId',
    MASTER_KEY: process.env.MASTER_KEY || 'myMasterKey',
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:3001/parse',
    APP_NAME: process.env.APP_NAME || 'chat-app',
    USERNAME: process.env.USERNAME || 'admin',
    PASSWORD: process.env.PASSWORD || 'password',
}