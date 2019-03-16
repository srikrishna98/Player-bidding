const mongoose = require('mongoose');
const teams = require('../models/Teams');

exports.getPlayers = function(req,res){
    teams.findOne({"name":req.query.name},function(err,teaam){
        res.send(teaam.players);
    })
}