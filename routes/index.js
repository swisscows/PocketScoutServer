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
  res.send("Testing DB......");
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*TODO: addUser */
router.post('/addUser', function(req, res){
  userManager.addUser(req.body);
  res.sendStatus(200);
});

/*TODO: removeUser */
router.delete('/deleteUser', function(req, res){

  res.sendStatus(200);
});

/*TODO: requestToken */
router.get('/requestToken', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getAllGeoForGroup */
router.get('/getGeoForGroup', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getAllGeoForUser */
router.get('/getGeoForUser', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: addGeo */
router.post('/addGeo', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: removeGeo */
router.delete('/removeGeo', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: addCampingListItem*/
router.post('/addCampingListItem', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: removeCampingListItem */
router.delete('/removeCampingListItem', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: updateCampingListItem */
router.post('/updateCampingListItem', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getFullCampingList */
router.get('/getFullCampingList', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: newMessage */
router.post('/addNewMessage', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: removeMessage */
router.delete('/removeMessage', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getAllMessages */
router.get('/getAllMessages', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getNewMessages */
router.get('/getNewMessages', function(req, res){
  
  res.sendStatus(200);
});

module.exports = router;
