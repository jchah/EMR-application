const twilio = require('twilio');
const accountSid = 'ACd1a80cae6b123c47872ce2e5bacb3958';
const authToken = '9393852fbda67a293af0f9904836dae4';

const client = new twilio(accountSid, authToken);

module.exports = client;
