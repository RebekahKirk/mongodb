const mongoose = require('mongoose');
// const { Schema, model } = require ('mongoose'); //Same as the above but above is the standard way of pulling it in.

//User Schema:
const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('users', User);