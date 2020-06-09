//models folder - schema store
//user.js - schema - structure for our database
// - what should our user db look like
// - should it have email, name, password, ashoe size

//index.js - data that we want to add to our schema

//mongoDB - mongoose - $ npm i mongoose
//$npm i dotenv
require('dotenv').config(); // This is where you are going to store the information so it must be called upon first
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(`${process.env.databaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dean = new User({
    name: 'Dean',
    email: 'deansingleton@dean.com',
    password: 'ilovejacob'
}) // Creates Dean as a user

dean.save(); // Saves the user Dean to the database