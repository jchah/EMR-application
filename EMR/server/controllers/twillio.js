const twilio = require('twilio');
const dotenv = require('dotenv')

dotenv.config()

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

module.exports = client;
