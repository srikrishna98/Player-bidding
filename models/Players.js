const mongoose = require('mongoose')

const PlayerSchema  = new mongoose.Schema({ 
        "name" : String, 
        "base" : Number, 
        "foreign" : Boolean, 
        "category" : Number, 
        "cbcnt" : Number, 
        "taken" : Boolean,
        "currentBid":Number
    });

const players = mongoose.model('players', PlayerSchema);

module.exports = players;
