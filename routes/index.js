var express = require('express');
var db = require('../dbhelper.js');
var sec = require('../security.js');
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
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/requestToken', function(req, res, next){
  let token = sec.requestToken(req.params.username, req.params.password);
  if(token != null){
    res.status(200);
    res.send({ "token": token});
  }

});

/*TODO: addUser */
router.post('/addGroup', function(req, res){
  groupManager.addGroup(req.body)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? "OK" : "FAIL");
    });
});

router.get('/getGroup/:groupID', function(req, res){
  groupManager.getGroup(req.params.groupID)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
});

/*TODO: removeUser */
router.delete('/deleteGroup', function(req, res){
  groupManager.removeGroup(req.params.groupID)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
});

router.get('/updateGroup', function(req, res){
  groupManager.updateGroup(req.body)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
  
});

/*TODO: addUser */
router.post('/addUser', function(req, res){
  userManager.addUser(req.body)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? "OK" : "FAIL");
    });
});

router.get('/getUser/:userID', function(req, res){
  userManager.getUser(req.params.userID)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
});

router.get('/getUsersByGroup/:groupID', function(req, res){
  userManager.getUsersInGroup(req.params.groupID)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
  
});



/*TODO: removeUser */
router.delete('/deleteUser', function(req, res){
  userManager.removeUser(req.params.userID)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
});

/*TODO: requestToken */
router.get('/requestToken', function(req, res){
  
  res.sendStatus(200);
});

/*TODO: getAllGeoForGroup */
router.get('/getGeoForGroup/:groupID', function(req, res){
  geoManager.getGeoEntriesByGroup(req.params.groupID)
  .then(function(results){
    res.status(results ? 200 : 404);
    res.send(results ? results : null);
  });
});

/*TODO: getAllGeoForUser */
router.get('/getGeoForUser/:userID', function(req, res){
  geoManager.getGeoEntriesByUser(req.params.userID)
  .then(function(results){
    res.status(results ? 200 : 404);
    res.send(results ? results : null);
  });
});

/*TODO: addGeo */
router.post('/addGeo', function(req, res){
  geoManager.addGeoEntry(req.body)
    .then(function(results){
      res.status(results ? 200 : 404);
      res.send(results ? results : null);
    });
});

/*TODO: removeGeo */
router.delete('/removeGeo/:id', function(req, res){
  geoManager.removeGeoEntry(req.body)
  .then(function(results){
    res.status(results ? 200 : 404);
    res.send(results ? results : null);
  });
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
