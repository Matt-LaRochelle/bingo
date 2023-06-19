require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bingoRoutes = require('./routes/bingos');
const userRoutes = require('./routes/user')


// express app
const app = express();

// middleware
app.use(express.json())


//This right here is the difference between "coder" and "engineer".
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/bingos', bingoRoutes)
app.use('/api/user', userRoutes)

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

