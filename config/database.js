require('dotenv').config();
const mongoose = require('mongoose');


const connection = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

const User = connection.model('User', UserSchema);

module.exports = connection;