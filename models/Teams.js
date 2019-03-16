const mongoose = require('mongoose')

const TeamSchema  = new mongoose.Schema({ 
        "name" : String, 
        "amount" : Number, 
        "players" : [],
        "password":String
});

const Teams = mongoose.model('teams', TeamSchema);

module.exports = Teams;
