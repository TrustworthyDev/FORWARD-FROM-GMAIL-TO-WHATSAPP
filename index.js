const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

require('dotenv').config();

app.use(dotenv);

const app = express();
const port = process.env.PORT || 3000;

// Replace these with your Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

// WhatsApp sandbox number and your WhatsApp number
const fromNumber = 'whatsapp:+14155238886'; // Twilio sandbox number
const toNumber = 'whatsapp:+48459569732'; // Your WhatsApp number

app.use(bodyParser.json());

app.post('/forward-email', (req, res) => {
  const { subject, body } = req.body;

  client.messages.create({
    from: fromNumber,
    to: toNumber,
    body: `Subject: ${subject}\n\n${body}`
  }).then(message => {
    console.log('Message SID:', message.sid);
    res.status(200).send('Message sent to WhatsApp');
  }).catch(err => {
    console.error('Error sending message:', err);
    res.status(500).send('Failed to send message');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
