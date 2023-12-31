const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String},
    username: {type: String},
    password: {type: String},
    latestLatitude: {type: String},
    latestLongitude: {type: String}
});

module.exports = User = mongoose.model('User', UserSchema);