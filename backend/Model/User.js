const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Explicitly set the collection name to 'userCredentials'
const UserModel = mongoose.model("user", UserSchema); // Updated collection name
module.exports = UserModel; // Correct export
