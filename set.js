const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQURqdlduVmdzM1c3bExCakxKMFkzUVcvdFZnTzd1eVdvSStrNWhpb3huND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmo4TGczL1RVK3EwQzRYaFNiZ21ieklRSExrb3JENkR3UkJGWmFBN3JCST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTzBIb1FaQ04wa2lkMG5NZnhCM1RyTXNCcmoraTd1M1RUUWlHQS8zcUVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUEFEMHM3d0FxNkJCVXVQdCtkTWMwNjI0RlZUYkFmdHoyYzIyN25XSW40PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVBWkRYYVh5Ukh5dGJRNllwdVl5UkllZFU5SEhmMDNWVEhpMEtnVytrWGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5oaGtyajVOZUhPa2E4T2VBbVBQZzBVUkVhaGQvTU5KYk0wU3VWRmRQWHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVBPVGhKRncydnFUOWJVNVpkZHZxVjc4VnJMQ0hPWnBtQytJMDk3UU9Ydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjhIY3pCWnRYYVFreGdTbzNydEJtOStZaEE0cklXWUs4TFo0VEpiK3FRbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9yMVptMVJHUDNNU2svUmV2MW5seVRITWN2eURENDd0M3hnMTVwV0VPWVljMHJuTzF4WUNJeUI1WjVNZFBoVlpySTU4RWhEUDQ5Y3llZmVLbVNtcml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6Ii9lNDlxUlQ4U01hY0JNbm1nQitNdWRaa2thMWljN2lPekJCakhUOU1vQXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE2OTA5MDA0NTQwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc1RTg1NjIyMkU2MEZDNkZCRUY1MDI0ODZENzExQjFDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ5MjQ3MDB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkZmZFJkcnE2UncyS1NpNEd5UkFxa0EiLCJwaG9uZUlkIjoiZDU2YjYyYmUtMjkzYS00MjIwLWJkOTEtMWRmNDlmMWM0MjVkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9vTnE5TXd3cUVucGxiWWV3bWlnRlhSUmxyRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQM3JSeTF4a0NSTE1YOUJza3V4dVJ2eUFjU1E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWEpSWU5LSFMiLCJtZSI6eyJpZCI6IjkxNjkwOTAwNDU0MDo1MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjJEN2VrR0VJaUd3YllHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibzNTRGkvOW9DcHBKbE85RlNMaDdwampWR2pXZ3NyVUpNUmtDWmlUK2VrUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOTRteWEwd3FaUmFrOXYyMksvUHVqOE0rRk0waklydEFxV0RCeXdjeWxOSGRSTUVVcE1Yd05zTVZFRXZnRnV1WmZNMnc5QW1YdHhPcXNwcElRQlpSRFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImNyVjV0SDd3VmpKZlgrMmdGKzBDY1dwMXRxYytjZ21TNlBiTU5NWkhlRTFhbGNyY2IwOHVSUUh5T0NxRlNMa3Y5WlJVaTk2SWhDNUI4Y2NDVU5NNGpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE2OTA5MDA0NTQwOjUyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFOMGc0di9hQXFhU1pUdlJVaTRlNlk0MVJvMW9MSzFDVEVaQW1Zay9ucEUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ5MjQ2OTQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR1ZOIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ember",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'ember',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
