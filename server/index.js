const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');

const app = express();

//DB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err))

//Middleware
app.use(express.json());


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});