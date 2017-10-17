var express = require('express');
var userManager = require('../controllers/usermgr.js');
var clManager = require('../controllers/campinglistmgr.js');
var geoManager = require('../controllers/geomgr.js');
var messageManager = require('../controllers/messagingmgr.js');
var router = express.Router();

var restrictedChars = "\/'+=-_|[](){},.?!@#$%^&*:;\"";

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*TODO: addUser */
router.post('/api/addUser/:username/:email/', function(req, res){
  var params = req.params;
  console.log(params);
  res.send("Testing");
});

/*TODO: removeUser */
router.delete('/api', function(req, res){

});

/*TODO: requestToken */
router.get('/api', function(req, res){
  
});

/*TODO: getAllGeoForGroup */
router.get('/api', function(req, res){
  
});

/*TODO: getAllGeoForUser */
router.get('/api', function(req, res){
  
});

/*TODO: addGeo */
router.post('/api', function(req, res){
  
});

/*TODO: removeGeo */
router.delete('/api', function(req, res){
  
});

/*TODO: addCampingListItem*/
router.post('/api', function(req, res){
  
});

/*TODO: removeCampingListItem */
router.delete('/api', function(req, res){
  
});

/*TODO: updateCampingListItem */
router.post('/api', function(req, res){
  
});

/*TODO: getFullCampingList */
router.get('/api', function(req, res){
  
});

/*TODO: newMessage */
router.post('/api', function(req, res){
  
});

/*TODO: removeMessage */
router.delete('/api', function(req, res){
  
});

/*TODO: getAllMessages */
router.get('/api', function(req, res){
  
});

/*TODO: getNewMessages */
router.get('/api', function(req, res){
  
});

/* */

module.exports = router;
