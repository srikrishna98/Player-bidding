const mongoose = require('mongoose');
const player = require('../models/Players')
const team = require('../models/Teams')
exports.getAll =function (req,res){
    player.find({},function(err,players){
        if(err){res.send(err);}
        res.send(players);
    })
}

exports.currentBids = function(req,res){
    player.findById(req.query.id,function(err,bid){
        if(err){res.send(err);}
        res.send({"name":bid.name,"cbcnt":bid.cbcnt});
    })
}

exports.bidPlayer = function(req,res){
    player.findOne({"_id":req.query.id},function(err,doc){
        console.log(doc);
        if(doc.cbcnt<=1 && doc.taken == false)
        {doc.cbcnt+=1;
            doc.save(function(err){
                if(err){res.send(err);}
                res.send({"Message":"Bid Entered","cbcnt":doc.cbcnr});
            })
            // res.send({"cbcnt":doc.cbcnr});
        }
        else{
            res.send({"Message":"Cant Bid player","cbcnt":2});
        }
    });
}
exports.exitBid = function(req,res){
    player.findOne({"_id":req.query.id},function(err,doc){
        doc.cbcnt--;
        doc.save(function(err){
            if(err){res.send(err)}
            
            res.send({"Message":"Exit Success","cbcnt":doc.cbcnt});
        })
    })
}
exports.bidAmount = function(req,res){
    player.findOne({"_id":req.query.id},function(err,doc){

        if(req.query.bid <= 51 && (req.query.bid%0.25 == 0) && doc.taken == false){
            doc.currentBid = Number(doc.currentBid)+Number(req.query.bid);
            doc.save(function(err){
                if(err){res.send(err);}
                res.send({"bid":"Success",doc})
            })
                       
        }
        else{
            res.send({"bid":"Bid Disqualified"});
        }
    })
}

exports.getCurrentBid = function(req,res){
    player.findOne({"_id":req.query.id},function(err,doc){
        res.send({"Player":doc.name,"currentBid":doc.currentBid});
    })
}

exports.endBid = function(req,res){
    player.findOne({"_id":req.query.id},function(err,doc){
        team.findOne({"name":req.query.name},function(err,teeam){
            if(teeam.players.length<=8){
            teeam.players.push(doc.name);
            doc.take=true;
            doc.save(function(err){
                teeam.save(function(err){
                    if(err){res.send(err);}
                    console.log(doc);
                    console.log(teeam);
                    res.send({"bid":"Success"})
                    })
                console.log(err);
            
            })
            
            }
            else{
                res.send({"msg":"Team Size Limit Reached"});
            }
        })
    })
}

