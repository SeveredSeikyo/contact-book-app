const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRouter = require('./routes/contact.routes');

dotenv.config();
const app = express();

const clientUrl = process.env.CLIENT_URL; 
const customUrl = process.env.CLIENT_URL_CUSTOM

console.log(clientUrl);

const corsValidOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173', `${clientUrl}`,`${customUrl}`]
}

console.log(corsValidOptions);

app.use(express.json());
app.use(cors(corsValidOptions));

//1. POST /contact
app.use(contactRouter);

module.exports = app;