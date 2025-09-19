const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRouter = require('./routes/contact.routes');

dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL; 

const corsValidOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173', `${CLIENT_URL}`]
}

console.log(corsValidOptions);

app.use(express.json());
app.use(cors(corsValidOptions));

//1. POST /contact
app.use(contactRouter);

module.exports = app;