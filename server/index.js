const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const sheetRoutes = require('./routes/sheets')

const app = express();
app.use(cors())

//Middleware
app.use(express.json());

//middleware to console.log the path and method of requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//Routes
app.use('/api/sheets', sheetRoutes);

//DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connnected to DB, Listening on Port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err)
    })