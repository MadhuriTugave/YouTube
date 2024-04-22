const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const connection = require("./createDatabase.js")
// const connection1 = require("./createDatabase.js")
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connect to DATABASE
const DATABASE_URL = process.env.URL;
const connectiondb= async()=>{
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true} };
    // mongoose.set('bufferTimeoutMS',false);
    await mongoose.connect(DATABASE_URL, clientOptions);
    const db =  mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => console.log('connected to database'));
}
 connectiondb();


// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
