require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const collectionRoutes = require('./routes/collections')
const bingoRoutes = require('./routes/bingos');
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors());

//This right here is the difference between "coder" and "engineer".
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/bingos', bingoRoutes)

// lets go
// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

