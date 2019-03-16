/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const path = require('path');
const mongoose = require('mongoose');

const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');


const playerController  = require('./controllers/playerController');
const teamController = require('./controllers/teamController');

/**
 * API keys and Passport configuration.
 */


/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
var MongoDB = "mongodb://127.0.0.1:27017/admin"
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(MongoDB);
mongoose.connection.on('error', (err) => {
  console.error(err);
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', 'localhost'|| '127.0.0.1');
app.set('port', process.env.PORT || 7000 );
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */

 app.get('/players_list',function(req,res){
   playerController.getAll(req,res);
  });
app.get('/currentBids',function(req,res){
  console.log(req.query);
  playerController.currentBids(req,res);
});
app.get('/bidPlayer',function(req,res){
  playerController.bidPlayer(req,res);
});

app.get('/bidAmount',function(req,res){
  playerController.bidAmount(req,res);
});

app.get('/getCurrentBid',function(req,res){
  playerController.getCurrentBid(req,res);
})

app.get('/endBid',function(req,res){
  playerController.endBid(req,res);
})

app.get('/team',function(req,res){
  teamController.getPlayers(req,res);
})


/**
 * API examples routes.
 */

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:7000/ ');
  console.log('  Press CTRL-C to stop\n');
});

// module.exports = app;
