var express = require('express');
var db = require('../dbHelper.js');
var userManager = require('../controllers/usermgr.js');
var clManager = require('../controllers/campinglistmgr.js');
var geoManager = require('../controllers/geomgr.js');
var messageManager = require('../controllers/messagingmgr.js');
var router = express.Router();

var restrictedChars = "\/'+=-_|[](){},.?!@#$%^&*:;\"";


/* DEBUGGING */
router.get('/testdb', function(req, res){
  db.test();
  db.query("INSERT INTO ps_users (username, password, email, dateJoined, fk_user_type) VALUES ('nodetest', 'pass', 'node@node.com', '1991-09-01 10:11:12', 0);");
  res.send("Testing DB......");
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*TODO: addUser */
router.post('/addUser/:username/:password/:email/:datejoined/:usertype', function(req, res){
  var params = req.params;
  console.log(params);
  res.sendStatus(200);
});

/*TODO: removeUser */
router.delete('/', function(req, res){

});

/*TODO: requestToken */
router.get('/', function(req, res){
  
});

/*TODO: getAllGeoForGroup */
router.get('/', function(req, res){
  
});

/*TODO: getAllGeoForUser */
router.get('/', function(req, res){
  
});

/*TODO: addGeo */
router.post('/', function(req, res){
  
});

/*TODO: removeGeo */
router.delete('/', function(req, res){
  
});

/*TODO: addCampingListItem*/
router.post('/', function(req, res){
  
});

/*TODO: removeCampingListItem */
router.delete('/', function(req, res){
  
});

/*TODO: updateCampingListItem */
router.post('/', function(req, res){
  
});

/*TODO: getFullCampingList */
router.get('/', function(req, res){
  
});

/*TODO: newMessage */
router.post('/', function(req, res){
  
});

/*TODO: removeMessage */
router.delete('/', function(req, res){
  
});

/*TODO: getAllMessages */
router.get('/', function(req, res){
  
});

/*TODO: getNewMessages */
router.get('/', function(req, res){
  
});

/* */

module.exports = router;
